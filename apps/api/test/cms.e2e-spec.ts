import './setup-env.js';

import { ThrottlerGuard } from '@nestjs/throttler';
import { Test, type TestingModule } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import {
  branches,
  courses,
  eq,
  ilike,
  teachers,
  testimonials,
  users,
  type Database,
} from '@repo/db';
import request from 'supertest';
import type { App } from 'supertest/types';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { AppModule } from '../src/app.module.js';
import { WorkosAuthGuard } from '../src/auth/workos-auth.guard.js';
import { configureApp } from '../src/configure-app.js';
import { DRIZZLE } from '../src/database/database.module.js';
import { TEST_USER_HEADER, TestAuthGuard, testUsers } from './test-auth.guard.js';

/**
 * The CMS end to end: authorisation, validation, the admin write path and
 * the public read path, against a real Postgres.
 *
 * Runs on a shared database (locally the same one `pnpm dev` uses), so it
 * never truncates. Everything it creates carries an `e2e-` slug or an
 * `E2E ` name, is removed again in `afterAll`, and is swept in `beforeAll`
 * in case an earlier run died half-way. Assertions about public lists are
 * therefore relative ("this course is absent / present"), not absolute.
 */

interface ErrorBody {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
}

interface Row {
  id: string;
  slug: string;
  [key: string]: unknown;
}

describe('CMS (e2e)', () => {
  let app: INestApplication;
  let db: Database;

  const api = (): request.Agent => request(app.getHttpServer() as App);
  const asAdmin = (req: request.Test) => req.set(TEST_USER_HEADER, 'admin');
  const asStudent = (req: request.Test) => req.set(TEST_USER_HEADER, 'student');

  async function sweep(): Promise<void> {
    /* Courses cascade to batches, modules and links; teachers and branches
       are only deletable once nothing references them, hence the order. */
    await db.delete(courses).where(ilike(courses.slug, 'e2e-%'));
    await db.delete(testimonials).where(ilike(testimonials.name, 'E2E %'));
    await db.delete(teachers).where(ilike(teachers.slug, 'e2e-%'));
    await db.delete(branches).where(ilike(branches.slug, 'e2e-%'));
    await db.delete(users).where(ilike(users.workosId, 'e2e_%'));
  }

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ThrottlerGuard)
      .useValue({ canActivate: () => true })
      .overrideProvider(WorkosAuthGuard)
      .useClass(TestAuthGuard)
      .compile();

    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();

    db = app.get<Database>(DRIZZLE);
    await sweep();

    const rows = await db
      .insert(users)
      .values([
        { workosId: 'e2e_admin', email: 'e2e-admin@example.test', role: 'admin' },
        { workosId: 'e2e_student', email: 'e2e-student@example.test' },
      ])
      .returning();
    for (const row of rows) {
      testUsers.set(row.role === 'admin' ? 'admin' : 'student', row);
    }
  }, 30_000);

  afterAll(async () => {
    await sweep();
    testUsers.clear();
    await app.close();
  });

  /* Ids flow between the cases below, which therefore run in order. */
  let branch: Row;
  let teacher: Row;
  let course: Row;
  let batchId: string;
  let testimonialId: string;

  describe('authorisation', () => {
    it('rejects anonymous callers on admin routes with 401', async () => {
      const res = await api().get('/api/v1/admin/courses');
      expect(res.status).toBe(401);
      /* Proves the test guard is the one answering, not the real one. */
      expect((res.body as ErrorBody).message).toBe('No test user header');
      await api().get('/api/v1/admin/overview').expect(401);
    });

    it('rejects signed-in students on admin routes with 403', async () => {
      const res = await asStudent(api().get('/api/v1/admin/courses'));
      expect(res.status).toBe(403);
      expect((res.body as ErrorBody).message).toMatch(/admin role/);
    });

    it('admits admins', async () => {
      await asAdmin(api().get('/api/v1/admin/courses')).expect(200);
      const res = await asAdmin(api().get('/api/v1/admin/overview')).expect(200);
      expect(res.body).toMatchObject({ courses: expect.any(Object) as unknown });
    });

    it('keeps the public read routes open', async () => {
      await api().get('/api/v1/courses').expect(200);
      await api().get('/api/v1/branches').expect(200);
      await api().get('/api/v1/teachers').expect(200);
    });
  });

  describe('validation contract', () => {
    it('maps decorator failures onto field paths', async () => {
      const res = await asAdmin(api().post('/api/v1/admin/branches').send({}));
      const body = res.body as ErrorBody;

      expect(res.status).toBe(400);
      expect(body.message).toBe('Validation failed');
      expect(body.errors?.name?.[0]).toMatch(/name/);
    });

    it('rejects unknown properties rather than silently dropping them', async () => {
      const res = await asAdmin(
        api().post('/api/v1/admin/branches').send({ name: 'E2E X', bogus: 1 }),
      );
      expect(res.status).toBe(400);
      expect((res.body as ErrorBody).errors?.bogus).toBeDefined();
    });
  });

  describe('branches and teachers', () => {
    it('creates a branch and derives its slug', async () => {
      const res = await asAdmin(
        api()
          .post('/api/v1/admin/branches')
          .send({ name: 'E2E — Dhaka Test Campus', address: 'Road 1', phone: '+880 1700-000000' }),
      );
      expect(res.status).toBe(201);
      branch = res.body as Row;
      expect(branch.slug).toBe('e2e-dhaka-test-campus');
    });

    it('creates a teacher at that branch', async () => {
      const res = await asAdmin(
        api().post('/api/v1/admin/teachers').send({
          name: 'E2E Teacher',
          designation: 'Lead Instructor',
          bio: 'Teaches things.',
          branchId: branch.id,
        }),
      );
      expect(res.status).toBe(201);
      teacher = res.body as Row;
      expect(teacher.slug).toBe('e2e-teacher');
      expect(teacher.branch).toMatchObject({ id: branch.id });
    });

    it('refuses a teacher at an unknown branch with a field error', async () => {
      const res = await asAdmin(
        api().post('/api/v1/admin/teachers').send({
          name: 'E2E Nobody',
          designation: 'x',
          branchId: '00000000-0000-4000-8000-000000000000',
        }),
      );
      expect(res.status).toBe(400);
      expect((res.body as ErrorBody).errors?.branchId).toEqual(['Unknown branch']);
    });
  });

  describe('courses', () => {
    it('creates a draft course with a derived slug', async () => {
      const res = await asAdmin(
        api()
          .post('/api/v1/admin/courses')
          .send({
            name: 'E2E SAT Bootcamp',
            description: 'A test course.',
            priceAmount: 45000,
            priceUnit: 'per course',
            modes: ['classroom', 'live_online'],
            feeIncludes: ['Mocks'],
          }),
      );
      expect(res.status).toBe(201);
      course = res.body as Row;
      expect(course.slug).toBe('e2e-sat-bootcamp');
      expect(course).toMatchObject({ status: 'draft', currency: 'BDT', nextBatch: null });
    });

    it('rejects a duplicate slug with 409', async () => {
      const res = await asAdmin(
        api()
          .post('/api/v1/admin/courses')
          .send({
            name: 'E2E SAT Bootcamp',
            priceAmount: 1,
            modes: ['classroom'],
          }),
      );
      expect(res.status).toBe(409);
    });

    it('replaces the curriculum wholesale and renumbers positions', async () => {
      const first = await asAdmin(
        api()
          .put(`/api/v1/admin/courses/${course.id}/curriculum`)
          .send({ modules: [{ title: 'One' }, { title: 'Two', topics: ['a', 'b'], hours: 4 }] }),
      );
      expect(first.status).toBe(200);
      expect((first.body as Row[]).map((m) => m.position)).toEqual([1, 2]);

      const second = await asAdmin(
        api()
          .put(`/api/v1/admin/courses/${course.id}/curriculum`)
          .send({ modules: [{ title: 'Uno' }, { title: 'Dos' }, { title: 'Tres' }] }),
      );
      expect((second.body as Row[]).map((m) => [m.position, m.title])).toEqual([
        [1, 'Uno'],
        [2, 'Dos'],
        [3, 'Tres'],
      ]);
    });

    it('addresses nested validation errors by path', async () => {
      const res = await asAdmin(
        api()
          .put(`/api/v1/admin/courses/${course.id}/curriculum`)
          .send({ modules: [{ title: 'ok' }, { title: '' }] }),
      );
      expect(res.status).toBe(400);
      expect((res.body as ErrorBody).errors?.['modules.1.title']).toBeDefined();
    });

    it('assigns teachers', async () => {
      const res = await asAdmin(
        api()
          .put(`/api/v1/admin/courses/${course.id}/teachers`)
          .send({ teacherIds: [teacher.id] }),
      );
      expect(res.status).toBe(200);
      expect((res.body as Row[]).map((t) => t.id)).toEqual([teacher.id]);
    });
  });

  describe('batches', () => {
    const base = {
      startsOn: '2030-01-10',
      endsOn: '2030-03-20',
      days: ['sat', 'mon'],
      startTime: '18:30',
      endTime: '20:30',
    };

    it('collects every cross-field problem at once', async () => {
      const res = await asAdmin(
        api()
          .post(`/api/v1/admin/courses/${course.id}/batches`)
          .send({
            ...base,
            mode: 'classroom',
            endsOn: '2029-12-01',
            endTime: '18:00',
            teacherId: '00000000-0000-4000-8000-000000000000',
          }),
      );
      const body = res.body as ErrorBody;
      expect(res.status).toBe(400);
      expect(Object.keys(body.errors ?? {}).sort()).toEqual(
        ['branchId', 'endTime', 'endsOn', 'teacherId'].sort(),
      );
    });

    it('refuses a branch on a live-online batch', async () => {
      const res = await asAdmin(
        api()
          .post(`/api/v1/admin/courses/${course.id}/batches`)
          .send({ ...base, mode: 'live_online', branchId: branch.id }),
      );
      expect(res.status).toBe(400);
      expect((res.body as ErrorBody).errors?.branchId?.[0]).toMatch(/no branch/);
    });

    it('schedules a classroom batch', async () => {
      const res = await asAdmin(
        api()
          .post(`/api/v1/admin/courses/${course.id}/batches`)
          .send({ ...base, mode: 'classroom', branchId: branch.id, teacherId: teacher.id }),
      );
      expect(res.status).toBe(201);
      const batch = res.body as Row;
      batchId = batch.id;
      expect(batch).toMatchObject({
        courseSlug: 'e2e-sat-bootcamp',
        mode: 'classroom',
        days: ['sat', 'mon'],
        startTime: '18:30',
        endTime: '20:30',
        status: 'open',
        feeAmount: null,
      });
      expect(batch.branch).toMatchObject({ id: branch.id });
      expect(batch.teacher).toMatchObject({ id: teacher.id });
    });

    it('re-checks the rules against the merged row on PATCH', async () => {
      const res = await asAdmin(
        api().patch(`/api/v1/admin/batches/${batchId}`).send({ mode: 'live_online' }),
      );
      expect(res.status).toBe(400);
      expect((res.body as ErrorBody).errors?.branchId).toBeDefined();

      const ok = await asAdmin(
        api().patch(`/api/v1/admin/batches/${batchId}`).send({ seatsLeft: 4, status: 'filling' }),
      );
      expect(ok.status).toBe(200);
      expect(ok.body).toMatchObject({ seatsLeft: 4, status: 'filling', startTime: '18:30' });
    });
  });

  describe('public reads follow publication', () => {
    it('hides a draft course everywhere', async () => {
      const list = await api().get('/api/v1/courses').expect(200);
      expect((list.body as Row[]).some((c) => c.slug === 'e2e-sat-bootcamp')).toBe(false);
      await api().get('/api/v1/courses/e2e-sat-bootcamp').expect(404);
      await api().get(`/api/v1/batches/${batchId}`).expect(404);
    });

    it('shows the course once published, with everything attached', async () => {
      await asAdmin(
        api().patch(`/api/v1/admin/courses/${course.id}`).send({ status: 'published' }),
      ).expect(200);

      const list = await api().get('/api/v1/courses').expect(200);
      const listed = (list.body as Row[]).find((c) => c.slug === 'e2e-sat-bootcamp');
      expect(listed?.nextBatch).toMatchObject({ id: batchId });

      const detail = await api().get('/api/v1/courses/e2e-sat-bootcamp').expect(200);
      const body = detail.body as Row & { modules: Row[]; batches: Row[]; teachers: Row[] };
      expect(body.modules.map((m) => m.title)).toEqual(['Uno', 'Dos', 'Tres']);
      expect(body.batches.map((b) => b.id)).toEqual([batchId]);
      expect(body.teachers.map((t) => t.id)).toEqual([teacher.id]);

      await api().get(`/api/v1/batches/${batchId}`).expect(200);
    });

    it('attaches testimonials to the course page', async () => {
      const created = await asAdmin(
        api()
          .post('/api/v1/admin/testimonials')
          .send({
            name: 'E2E Student',
            result: 'SAT 1500',
            quote: 'It worked.',
            courseIds: [course.id],
          }),
      );
      expect(created.status).toBe(201);
      testimonialId = (created.body as Row).id;
      expect((created.body as Row & { courses: Row[] }).courses.map((c) => c.id)).toEqual([
        course.id,
      ]);

      const detail = await api().get('/api/v1/courses/e2e-sat-bootcamp').expect(200);
      const quotes = (detail.body as Row & { testimonials: Row[] }).testimonials;
      expect(quotes.map((t) => t.id)).toEqual([testimonialId]);
    });

    it('lists the teacher publicly with only published courses', async () => {
      const res = await api().get('/api/v1/teachers').expect(200);
      const listed = (res.body as (Row & { courses: Row[] })[]).find((t) => t.id === teacher.id);
      expect(listed?.courses.map((c) => c.slug)).toEqual(['e2e-sat-bootcamp']);
    });
  });

  describe('uploads', () => {
    it('presigns a PUT for an image without touching the bucket', async () => {
      const res = await asAdmin(
        api()
          .post('/api/v1/admin/uploads/presign')
          .send({ kind: 'teacher-image', contentType: 'image/png', size: 1024 }),
      );
      expect(res.status).toBe(200);
      const body = res.body as {
        uploadUrl: string;
        publicUrl: string;
        key: string;
        method: string;
      };
      expect(body.method).toBe('PUT');
      expect(body.key).toMatch(/^teacher-image\/\d{4}\/\d{2}\/[0-9a-f-]{36}\.png$/);
      expect(body.uploadUrl).toContain('e2e-media');
      expect(body.publicUrl).toBe(`http://localhost:9000/e2e-media/${body.key}`);
    });

    it('refuses anything but an image', async () => {
      const res = await asAdmin(
        api()
          .post('/api/v1/admin/uploads/presign')
          .send({ kind: 'teacher-image', contentType: 'application/pdf', size: 1024 }),
      );
      expect(res.status).toBe(400);
      expect((res.body as ErrorBody).errors?.contentType).toBeDefined();
    });
  });

  describe('deletion guards', () => {
    it('refuses to delete a branch or teacher still in use', async () => {
      const b = await asAdmin(api().delete(`/api/v1/admin/branches/${branch.id}`));
      expect(b.status).toBe(409);
      const t = await asAdmin(api().delete(`/api/v1/admin/teachers/${teacher.id}`));
      expect(t.status).toBe(409);
    });

    it('cascades a course delete and then frees its dependants', async () => {
      await asAdmin(api().delete(`/api/v1/admin/courses/${course.id}`)).expect(204);
      await asAdmin(api().get(`/api/v1/admin/courses/${course.id}`)).expect(404);
      await asAdmin(api().get(`/api/v1/admin/batches/${batchId}`)).expect(404);

      await asAdmin(api().delete(`/api/v1/admin/testimonials/${testimonialId}`)).expect(204);
      await asAdmin(api().delete(`/api/v1/admin/teachers/${teacher.id}`)).expect(204);
      await asAdmin(api().delete(`/api/v1/admin/branches/${branch.id}`)).expect(204);

      const [gone] = await db.select().from(branches).where(eq(branches.id, branch.id));
      expect(gone).toBeUndefined();
    });
  });
});

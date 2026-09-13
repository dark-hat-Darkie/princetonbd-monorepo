import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { InjectEnv, type ApiEnv } from '../config/env.module.js';

/** How long a presigned PUT stays valid. Long enough to pick a file, short enough to be useless if leaked. */
export const PRESIGN_TTL_SECONDS = 300;

const extensionByContentType: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export interface PresignedPut {
  url: string;
  expiresIn: number;
}

/**
 * The one place that knows how to talk to the bucket.
 *
 * The API never proxies file bytes. It signs a PUT for one object key and
 * content type, the browser uploads directly, and the public URL of that key
 * is what ends up in a `thumbnail_url` / `image_url` column. That keeps
 * uploads off the API's request path (the container is read-only and
 * replicas share nothing) and works identically against AWS S3, Cloudflare
 * R2 and MinIO — they differ only in endpoint, region and path style, all of
 * which come from env.
 */
@Injectable()
export class S3StorageService {
  private readonly client: S3Client;

  constructor(@InjectEnv() private readonly env: ApiEnv) {
    this.client = new S3Client({
      region: env.S3_REGION,
      ...(env.S3_ENDPOINT ? { endpoint: env.S3_ENDPOINT } : {}),
      forcePathStyle: env.S3_FORCE_PATH_STYLE,
      credentials: {
        accessKeyId: env.S3_ACCESS_KEY_ID,
        secretAccessKey: env.S3_SECRET_ACCESS_KEY,
      },
    });
  }

  /**
   * A fresh, unguessable key under a per-kind, per-month prefix:
   * `teacher-image/2026/09/6f1c….jpg`. Random rather than derived from the
   * original filename so two admins uploading "photo.jpg" never collide and
   * a filename never leaks into a public URL.
   */
  objectKey(kind: string, contentType: string, now: Date = new Date()): string {
    const extension = extensionByContentType[contentType] ?? 'bin';
    const year = String(now.getUTCFullYear());
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    return `${kind}/${year}/${month}/${randomUUID()}.${extension}`;
  }

  publicUrl(key: string): string {
    return `${this.env.S3_PUBLIC_URL}/${key}`;
  }

  /**
   * Sign a PUT for exactly this key and content type.
   *
   * The presigner signs only `host` unless told otherwise, which would let a
   * signed "image/png" URL upload anything at all. Listing `content-type` as
   * a signable header binds it into the signature, so the browser must send
   * it verbatim and the bucket rejects a mismatch. Object size cannot be
   * bound into a presigned PUT; the request DTO enforces the limit as policy
   * and the bucket's own limits are the backstop.
   */
  async presignPut({
    key,
    contentType,
  }: {
    key: string;
    contentType: string;
  }): Promise<PresignedPut> {
    const command = new PutObjectCommand({
      Bucket: this.env.S3_BUCKET,
      Key: key,
      ContentType: contentType,
    });
    const url = await getSignedUrl(this.client, command, {
      expiresIn: PRESIGN_TTL_SECONDS,
      signableHeaders: new Set(['content-type']),
    });
    return { url, expiresIn: PRESIGN_TTL_SECONDS };
  }
}

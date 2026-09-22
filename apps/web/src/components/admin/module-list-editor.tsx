'use client';

import { useId, useState } from 'react';

import { Button } from '@/components/ui/form/button';
import { FieldError } from '@/components/ui/form/field';
import { Input } from '@/components/ui/form/input';
import { errorIdFor, inputClass, labelClass } from '@/components/ui/form/input-class';
import { Textarea } from '@/components/ui/form/textarea';

export interface ModuleRow {
  title: string;
  summary: string;
  /** One topic per line, as typed. */
  topicsText: string;
  hours: string;
  outcome: string;
}

export const emptyModuleRow: ModuleRow = {
  title: '',
  summary: '',
  topicsText: '',
  hours: '',
  outcome: '',
};

/** What the hidden field carries: the shape `curriculumSchema` validates. */
function serialise(rows: readonly ModuleRow[]): string {
  return JSON.stringify(
    rows.map((row) => ({
      title: row.title,
      summary: row.summary,
      topics: row.topicsText
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean),
      hours: row.hours.trim() === '' ? null : Number(row.hours),
      outcome: row.outcome,
    })),
  );
}

/**
 * The curriculum as an ordered list of editable rows.
 *
 * Client state because rows are added, removed and reordered in place; the
 * whole list is serialised into one hidden `modules` field on every change,
 * so the surrounding form submits it like any other value and the Server
 * Action validates it as one array. Row errors arrive keyed
 * `modules.<index>.<field>` and are shown against that row.
 */
export function ModuleListEditor({
  initial,
  errors = {},
}: {
  initial: readonly ModuleRow[];
  errors?: Record<string, string>;
}) {
  const [rows, setRows] = useState<ModuleRow[]>(() =>
    initial.length > 0 ? [...initial] : [emptyModuleRow],
  );
  const baseId = useId();

  const update = (index: number, patch: Partial<ModuleRow>) => {
    setRows((current) => current.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  };
  const move = (index: number, delta: -1 | 1) => {
    setRows((current) => {
      const target = index + delta;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      const [row] = next.splice(index, 1);
      if (row) next.splice(target, 0, row);
      return next;
    });
  };
  const remove = (index: number) => {
    setRows((current) => current.filter((_, i) => i !== index));
  };

  const rowError = (index: number, field: string) => errors[`modules.${String(index)}.${field}`];

  return (
    <div className="flex flex-col gap-5">
      <input type="hidden" name="modules" value={serialise(rows)} />
      <FieldError id={errorIdFor('modules')} message={errors.modules} />

      <ol className="flex flex-col gap-5">
        {rows.map((row, index) => {
          const id = (field: string) => `${baseId}-${String(index)}-${field}`;
          return (
            <li
              key={`${baseId}-${String(index)}`}
              className="rounded-md border border-line bg-surface p-6 shadow-card"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex size-8 items-center justify-center rounded-sm bg-accent font-display text-[14px] font-extrabold text-on-accent tabular-nums"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={labelClass}>Module {index + 1}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-label={`Move module ${String(index + 1)} up`}
                    disabled={index === 0}
                    onClick={() => {
                      move(index, -1);
                    }}
                  >
                    ↑
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-label={`Move module ${String(index + 1)} down`}
                    disabled={index === rows.length - 1}
                    onClick={() => {
                      move(index, 1);
                    }}
                  >
                    ↓
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-label={`Remove module ${String(index + 1)}`}
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    Remove
                  </Button>
                </span>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor={id('title')} className={labelClass}>
                    Title
                  </label>
                  <Input
                    id={id('title')}
                    value={row.title}
                    invalid={Boolean(rowError(index, 'title'))}
                    onChange={(event) => {
                      update(index, { title: event.target.value });
                    }}
                  />
                  <FieldError id={errorIdFor(id('title'))} message={rowError(index, 'title')} />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor={id('summary')} className={labelClass}>
                    Summary
                  </label>
                  <Textarea
                    id={id('summary')}
                    rows={2}
                    value={row.summary}
                    invalid={Boolean(rowError(index, 'summary'))}
                    onChange={(event) => {
                      update(index, { summary: event.target.value });
                    }}
                  />
                  <FieldError id={errorIdFor(id('summary'))} message={rowError(index, 'summary')} />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor={id('topics')} className={labelClass}>
                    Topics <span className="font-normal text-muted-2">(one per line)</span>
                  </label>
                  <textarea
                    id={id('topics')}
                    rows={4}
                    value={row.topicsText}
                    onChange={(event) => {
                      update(index, { topicsText: event.target.value });
                    }}
                    className={inputClass(Boolean(rowError(index, 'topics')), 'resize-y')}
                  />
                  <FieldError id={errorIdFor(id('topics'))} message={rowError(index, 'topics')} />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-[160px_1fr]">
                  <div className="flex flex-col gap-2">
                    <label htmlFor={id('hours')} className={labelClass}>
                      Hours <span className="font-normal text-muted-2">(optional)</span>
                    </label>
                    <Input
                      id={id('hours')}
                      type="number"
                      min={0}
                      value={row.hours}
                      invalid={Boolean(rowError(index, 'hours'))}
                      onChange={(event) => {
                        update(index, { hours: event.target.value });
                      }}
                    />
                    <FieldError id={errorIdFor(id('hours'))} message={rowError(index, 'hours')} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor={id('outcome')} className={labelClass}>
                      Outcome <span className="font-normal text-muted-2">(optional)</span>
                    </label>
                    <Input
                      id={id('outcome')}
                      value={row.outcome}
                      invalid={Boolean(rowError(index, 'outcome'))}
                      onChange={(event) => {
                        update(index, { outcome: event.target.value });
                      }}
                      placeholder="By the end you can…"
                    />
                    <FieldError
                      id={errorIdFor(id('outcome'))}
                      message={rowError(index, 'outcome')}
                    />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setRows((current) => [...current, emptyModuleRow]);
          }}
        >
          Add a module
        </Button>
      </div>
    </div>
  );
}

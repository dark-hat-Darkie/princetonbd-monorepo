'use client';

import Image from 'next/image';
import { useId, useRef, useState } from 'react';

import { Button } from '@/components/ui/form/button';
import { FieldError } from '@/components/ui/form/field';
import { errorIdFor, labelClass } from '@/components/ui/form/input-class';
import { cn } from '@/lib/cn';

export type UploadKind = 'course-thumbnail' | 'teacher-image' | 'testimonial-image';

const ACCEPT = ['image/jpeg', 'image/png', 'image/webp'] as const;
export type UploadContentType = (typeof ACCEPT)[number];

function isAccepted(type: string): type is UploadContentType {
  return (ACCEPT as readonly string[]).includes(type);
}

export interface PresignInput {
  kind: UploadKind;
  contentType: UploadContentType;
  size: number;
}

export type PresignResult =
  | { ok: true; uploadUrl: string; headers: Record<string, string>; publicUrl: string }
  | { ok: false; message: string };

const MAX_BYTES = 5 * 1024 * 1024;

/**
 * Picks an image, uploads it straight to the bucket, and leaves the public
 * URL in a hidden input for the surrounding form to submit.
 *
 * The API never sees the file. `presign` is a Server Action that asks the
 * API for a signed PUT (so the admin's token stays on the server); the
 * browser then PUTs the bytes to the bucket itself. Only on a 2xx from the
 * bucket does the hidden field change, so a failed upload cannot leave a
 * record pointing at nothing.
 */
export function ImageUpload({
  name,
  label,
  kind,
  defaultValue,
  error,
  presign,
  hint = 'JPEG, PNG or WebP, up to 5 MB.',
  className,
}: {
  name: string;
  label: string;
  kind: UploadKind;
  defaultValue?: string | null;
  error?: string;
  presign: (input: PresignInput) => Promise<PresignResult>;
  hint?: string;
  className?: string;
}) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(defaultValue ?? '');
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string | undefined>();

  const shownError = problem ?? error;

  async function upload(file: File): Promise<void> {
    if (!isAccepted(file.type)) {
      setProblem('Choose a JPEG, PNG or WebP image.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setProblem('That image is over 5 MB. Resize it and try again.');
      return;
    }

    setBusy(true);
    setProblem(undefined);
    try {
      const signed = await presign({ kind, contentType: file.type, size: file.size });
      if (!signed.ok) {
        setProblem(signed.message);
        return;
      }

      const response = await fetch(signed.uploadUrl, {
        method: 'PUT',
        headers: signed.headers,
        body: file,
      });
      if (!response.ok) {
        setProblem(`The upload was refused (${String(response.status)}). Nothing was changed.`);
        return;
      }

      setUrl(signed.publicUrl);
    } catch {
      setProblem('The upload did not complete. Check your connection and try again.');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <span className={labelClass}>{label}</span>
      <input type="hidden" name={name} value={url} />

      <div className="flex items-start gap-5 rounded-md border border-line bg-surface p-4">
        <div className="relative size-24 flex-none overflow-hidden rounded-sm bg-panel">
          {url ? (
            /* `unoptimized`: an admin preview of a URL that may be on any
               configured host; the public pages go through the optimiser. */
            <Image src={url} alt="" fill sizes="96px" unoptimized className="object-cover" />
          ) : (
            <span className="flex h-full items-center justify-center text-[11px] font-bold tracking-[.12em] text-muted-2 uppercase">
              None
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept={ACCEPT.join(',')}
            disabled={busy}
            aria-describedby={shownError ? errorIdFor(id) : undefined}
            aria-invalid={shownError ? true : undefined}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void upload(file);
            }}
            className="block w-full text-[13.5px] text-ink-soft file:mr-4 file:cursor-pointer file:rounded-full file:border file:border-line-strong file:bg-canvas file:px-4 file:py-2 file:text-[11px] file:font-bold file:tracking-[.11em] file:text-ink file:uppercase hover:file:border-brand hover:file:text-brand-ink disabled:opacity-60"
          />
          <span className="text-[12.5px] leading-[1.5] text-muted-2">
            {busy ? 'Uploading…' : hint}
          </span>
          {url ? (
            <div className="flex items-center gap-3">
              <span className="min-w-0 truncate font-mono text-[12px] text-muted" title={url}>
                {url}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={busy}
                onClick={() => {
                  setUrl('');
                  setProblem(undefined);
                }}
              >
                Remove
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      <FieldError id={errorIdFor(id)} message={shownError} />
    </div>
  );
}

'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/form/button';

/**
 * A destructive action behind a confirmation.
 *
 * A plain `<form action>` bound to a Server Action, so it works without
 * hydration; once hydrated, `window.confirm` gates the submit. The native
 * dialog is deliberate — for "delete this course and all its batches" a
 * blocking prompt the browser owns is more honest than a styled modal.
 */
export function ConfirmForm({
  action,
  confirm,
  label,
  pendingLabel = 'Working…',
  variant = 'danger',
  size = 'sm',
  className,
}: {
  action: (formData: FormData) => void | Promise<void>;
  confirm: string;
  label: string;
  pendingLabel?: string;
  variant?: 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md';
  className?: string;
}) {
  const [pending, setPending] = useState(false);

  return (
    <form
      action={action}
      className={className}
      onSubmit={(event) => {
        if (!window.confirm(confirm)) {
          event.preventDefault();
          return;
        }
        setPending(true);
      }}
    >
      <Button
        type="submit"
        variant={variant}
        size={size}
        pending={pending}
        pendingLabel={pendingLabel}
      >
        {label}
      </Button>
    </form>
  );
}

'use server';

import { adminPresignUpload } from '@repo/api-client';

import type { PresignInput, PresignResult } from '@/components/admin/image-upload';
import { getAdminClient } from '../api';

/**
 * Ask the API for a signed upload URL on the browser's behalf.
 *
 * A Server Action rather than a route handler so the admin's access token
 * never leaves the server; the browser gets back only the signed URL, which
 * is good for five minutes and for one object key.
 */
export async function presignUploadAction(input: PresignInput): Promise<PresignResult> {
  const client = await getAdminClient();
  const { data, error, response } = await adminPresignUpload({ client, body: input });

  if (!data) {
    const status = response?.status;
    if (status === 400 && typeof error === 'object' && error && 'errors' in error) {
      return { ok: false, message: 'That file type or size is not accepted.' };
    }
    return { ok: false, message: 'Could not prepare the upload. Try again in a moment.' };
  }

  return { ok: true, uploadUrl: data.uploadUrl, headers: data.headers, publicUrl: data.publicUrl };
}

import { getSignInUrl } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

/** Entry point for sign-in. Set this path as the Sign-in URL in WorkOS. */
export const GET = async (): Promise<never> => {
  redirect(await getSignInUrl());
};

'use server';

import { campuses } from '@/content/site/contact';
import { EMAIL, PHONE, leadInterests, type LeadField, type LeadState } from './lead-shape';

/**
 * Handles every enquiry form on the site: the contact page, the free
 * diagnostic booking and the practice-test sign-up.
 *
 * Validation is hand-written rather than schema-driven. The API has no lead
 * endpoint yet, so this file is the only consumer of these rules; pulling `zod`
 * into the web bundle for five fields would add a dependency to save nothing.
 * When a real `/api/v1/leads` endpoint exists, the shape moves there and this
 * becomes a thin call.
 *
 * Until then the submission goes to `LEAD_WEBHOOK_URL` if one is configured,
 * and is otherwise recorded in the server log. It is never silently dropped:
 * a submission that cannot be delivered tells the visitor so, rather than
 * showing a thank-you for a message nobody received.
 *
 * Only async functions are exported from here — see the note in
 * `lead-shape.ts` for why the constants and types live next door.
 */

function readField(formData: FormData, field: LeadField): string {
  const value = formData.get(field);
  return typeof value === 'string' ? value.trim() : '';
}

export async function submitLead(_previous: LeadState, formData: FormData): Promise<LeadState> {
  const values: Record<LeadField, string> = {
    name: readField(formData, 'name'),
    email: readField(formData, 'email'),
    phone: readField(formData, 'phone'),
    interest: readField(formData, 'interest'),
    campus: readField(formData, 'campus'),
    message: readField(formData, 'message'),
  };

  const errors: Partial<Record<LeadField, string>> = {};

  if (values.name.length < 2) errors.name = 'Please tell us your name.';
  if (!EMAIL.test(values.email)) errors.email = 'Please enter an email address we can reply to.';
  if (!PHONE.test(values.phone))
    errors.phone = 'Please enter a Bangladeshi mobile number, e.g. 01700-000000.';
  if (!leadInterests.includes(values.interest as (typeof leadInterests)[number]))
    errors.interest = 'Please choose what you are interested in.';
  if (values.campus && !campuses.some((campus) => campus.name === values.campus))
    errors.campus = 'Please choose one of our campuses, or leave it as online.';
  if (values.message.length > 2000) errors.message = 'Please keep this under 2,000 characters.';

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, values };
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...values, receivedAt: new Date().toISOString() }),
      });

      if (!response.ok) throw new Error(`webhook responded ${String(response.status)}`);
    } catch (error) {
      /* Log the failure, not the payload — it carries a name, an email and a
         phone number, none of which belong in an application log. */
      console.error('[lead] delivery failed', error);
      return {
        status: 'error',
        values,
        message:
          'Something went wrong sending your message. Please call us on +880 1700-000000 and we will pick it up straight away.',
      };
    }
  } else {
    console.warn('[lead] received but not delivered — LEAD_WEBHOOK_URL is not set', {
      interest: values.interest,
      campus: values.campus,
    });
  }

  return {
    status: 'success',
    message: 'Thank you — an enrolment advisor will call you within one working day.',
  };
}

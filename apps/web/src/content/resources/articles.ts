/**
 * The advice library.
 *
 * Ordered newest first by `published`; the index derives its category filters
 * from whatever categories are present, so adding an article with a new
 * category needs no other edit.
 */

import type { Article } from '../types';

export const articles: readonly Article[] = [
  {
    slug: 'when-to-start-preparing-for-the-sat',
    title: 'When to start preparing for the SAT',
    description:
      'Working backwards from a Fall intake, the honest answer is earlier than most students think — and here is the arithmetic that shows why.',
    category: 'Test prep',
    published: '2026-08-12',
    readingMinutes: 6,
    body: [
      {
        type: 'paragraph',
        text: 'The question we are asked most often is some version of “am I too late?”. Usually the answer is no, but the reasoning matters more than the answer, because it is the same reasoning that tells you how many hours a week you need from here.',
      },
      { type: 'heading', text: 'Count backwards, not forwards' },
      {
        type: 'paragraph',
        text: 'A US Fall intake closes applications between November and January. Scores need to be with the university by then, and score release takes about two weeks. That puts your last useful sitting in October — and you want a spare sitting behind it in case the first one goes badly.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Application deadline: November to January.',
          'Last useful test date: October, with August as the safety net.',
          'Preparation window: ten to twelve weeks before that, so June to August.',
          'Diagnostic: April or May, to know what you are working with.',
        ],
      },
      { type: 'heading', text: 'How much gain is realistic' },
      {
        type: 'paragraph',
        text: 'Point improvement is not linear. Moving from 1050 to 1250 is largely a matter of closing content gaps and is very achievable in ten weeks. Moving from 1400 to 1550 is a different exercise entirely — it is about eliminating the last two or three careless errors per section, and it takes longer per point.',
      },
      {
        type: 'table',
        head: ['Starting point', 'Realistic gain in 10 weeks', 'Hours a week'],
        rows: [
          ['Below 1100', '150–250 points', '10–12'],
          ['1100–1300', '100–180 points', '8–10'],
          ['1300–1450', '60–120 points', '8–10'],
          ['Above 1450', '30–70 points', '6–8, but more precise'],
        ],
      },
      {
        type: 'callout',
        title: 'The one thing that changes the answer',
        text: 'If your diagnostic comes back below 1000, the constraint is usually reading speed rather than test technique — and that takes a term to shift, not ten weeks. Start a year out, and start with reading.',
      },
      { type: 'heading', text: 'If you are already late' },
      {
        type: 'paragraph',
        text: 'A six-week sprint is possible and we run them, but it changes the strategy: you stop trying to fix everything and spend the whole time on the two question types costing you the most marks. That is a private-tutoring shape, not a cohort shape.',
      },
    ],
  },
  {
    slug: 'test-optional-does-not-mean-test-irrelevant',
    title: 'Test-optional does not mean test-irrelevant',
    description:
      'Why a strong SAT or ACT score still moves the needle for a Bangladeshi applicant, even at universities that no longer require one.',
    category: 'Admissions',
    published: '2026-07-28',
    readingMinutes: 5,
    body: [
      {
        type: 'paragraph',
        text: 'Hundreds of US universities have made admissions tests optional, and a lot of advice has followed that says international students can now skip them. For most Bangladeshi applicants, that advice is wrong — not because the policy is a trick, but because of what the policy leaves unsaid.',
      },
      { type: 'heading', text: 'What an admissions officer can and cannot read' },
      {
        type: 'paragraph',
        text: 'An officer reading a file from Massachusetts knows what an A in that school means. Reading a file from a school in Dhaka they have seen twice before, they do not. A test score is one of the very few numbers on your application that means exactly the same thing regardless of where it was earned.',
      },
      { type: 'heading', text: 'The money argument' },
      {
        type: 'paragraph',
        text: 'Merit scholarships at many public flagships and mid-tier private universities are awarded on a matrix of GPA and test score. No score often means no automatic merit consideration — the aid is simply not calculated for you.',
      },
      {
        type: 'list',
        items: [
          'Need-based aid for international students is rare and concentrated in a handful of very selective universities.',
          'Merit aid is far more widely available and is frequently score-keyed.',
          'A 100-point improvement can be worth several thousand dollars a year at the same university.',
        ],
      },
      {
        type: 'callout',
        title: 'When skipping the test is right',
        text: 'If you have sat the test twice, prepared properly, and the score still sits well below the university’s middle 50%, submitting it does not help. Test-optional exists precisely for that case — use it deliberately, not by default.',
      },
    ],
  },
  {
    slug: 'how-to-read-a-university-ranking',
    title: 'How to read a university ranking',
    description:
      'Rankings measure something real. It is usually not the thing you care about. A short guide to using them without being used by them.',
    category: 'Study abroad',
    published: '2026-07-10',
    readingMinutes: 7,
    body: [
      {
        type: 'paragraph',
        text: 'Every family that walks into our Gulshan office has a ranking open on a phone. That is fine — rankings are a reasonable place to start. They are a terrible place to finish.',
      },
      { type: 'heading', text: 'What the big three actually measure' },
      {
        type: 'table',
        head: ['Ranking', 'Weighted heavily toward', 'Blind spot'],
        rows: [
          ['QS', 'Academic and employer reputation surveys', 'Reputation lags reality by years'],
          ['Times Higher Education', 'Research output and citations', 'Says little about teaching'],
          [
            'US News (global)',
            'Research and publication metrics',
            'Barely reflects undergraduate experience',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'Notice what none of them weigh much: how well you will be taught, whether you will get funding, and whether graduates from your programme get hired.',
      },
      { type: 'heading', text: 'Use subject rankings instead' },
      {
        type: 'paragraph',
        text: 'A university ranked 180th overall can be in the world top 30 for your specific field, with better funding and a shorter queue for supervision than the famous name ranked 40th. For a masters or PhD, the subject table and the individual research group matter far more than the overall position.',
      },
      {
        type: 'callout',
        title: 'The question that beats every ranking',
        text: 'Ask where graduates of this exact programme were working two years after finishing. Many departments publish it. It tells you more than any composite score.',
      },
    ],
  },
  {
    slug: 'building-a-shortlist-that-fits-your-budget',
    title: 'Building a shortlist that fits your budget',
    description:
      'Reach, match and safety is the standard advice. For a Bangladeshi family paying in taka, the axis that actually matters is cost.',
    category: 'Study abroad',
    published: '2026-06-22',
    readingMinutes: 6,
    body: [
      {
        type: 'paragraph',
        text: 'The usual shortlist advice sorts universities by how likely you are to get in. That is necessary but not sufficient. An admission you cannot fund is not an outcome — and the funding question is answered by the composition of the list, not by hope.',
      },
      { type: 'heading', text: 'Sort on two axes, not one' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Likelihood of admission: reach, match, safety.',
          'Likelihood of funding: does this university fund international students at all, and on what basis?',
        ],
      },
      {
        type: 'paragraph',
        text: 'A list of eight should have at least two entries where the funding answer is a confident yes — typically a public university with published automatic merit thresholds you already clear.',
      },
      { type: 'heading', text: 'Budget in total cost, not tuition' },
      {
        type: 'table',
        head: ['Line', 'Often forgotten'],
        rows: [
          ['Tuition', 'Rises 3–5% a year for the length of the degree'],
          ['Living', 'Varies more between cities than tuition does between universities'],
          ['Health cover', 'Mandatory and typically $1,500–$3,000 a year in the US'],
          ['One-off costs', 'Flights, visa fees, SEVIS, deposits, winter clothing'],
        ],
      },
      {
        type: 'callout',
        title: 'A useful test',
        text: 'If your family could not fund year two without the scholarship renewing, check the renewal conditions in writing before you accept. Some are conditional on a GPA that is harder to hold than it looks.',
      },
    ],
  },
  {
    slug: 'what-actually-happens-in-an-ielts-speaking-test',
    title: 'What actually happens in an IELTS speaking test',
    description:
      'Eleven to fourteen minutes with a human examiner, in three parts. Knowing the shape is worth half a band on its own.',
    category: 'Test prep',
    published: '2026-06-04',
    readingMinutes: 4,
    body: [
      {
        type: 'paragraph',
        text: 'The speaking test is the part students dread and the part that is easiest to prepare for, because its structure never changes.',
      },
      { type: 'heading', text: 'The three parts' },
      {
        type: 'table',
        head: ['Part', 'Length', 'What it is'],
        rows: [
          ['1', '4–5 minutes', 'Familiar questions: home, work, study, hobbies'],
          ['2', '3–4 minutes', 'A cue card, one minute to prepare, then speak for two'],
          ['3', '4–5 minutes', 'Abstract discussion connected to the Part 2 topic'],
        ],
      },
      { type: 'heading', text: 'What is actually scored' },
      {
        type: 'list',
        items: [
          'Fluency and coherence — not speed, but the absence of long hesitations and the presence of a thread.',
          'Lexical resource — range and precision, including whether you can paraphrase when a word escapes you.',
          'Grammatical range and accuracy — complex structures used correctly, not merely attempted.',
          'Pronunciation — intelligibility, not accent. A Bangladeshi accent is not a deduction.',
        ],
      },
      {
        type: 'callout',
        title: 'The single most common avoidable error',
        text: 'Answering Part 1 in one word. “Do you like reading?” answered with “Yes” wastes an easy chance to show range. Two or three sentences, every time.',
      },
    ],
  },
  {
    slug: 'funding-a-masters-with-an-assistantship',
    title: 'Funding a masters with an assistantship',
    description:
      'How most Bangladeshi MS students actually pay for a US degree — and what you need in place before you apply, not after.',
    category: 'Funding',
    published: '2026-05-19',
    readingMinutes: 7,
    body: [
      {
        type: 'paragraph',
        text: 'Scholarships get the attention. Assistantships pay the bills. A teaching or research assistantship typically covers a full tuition waiver plus a monthly stipend, and it is the single most common way a Bangladeshi student funds a US masters or PhD.',
      },
      { type: 'heading', text: 'What an assistantship is worth' },
      {
        type: 'table',
        head: ['Component', 'Typical value'],
        rows: [
          ['Tuition waiver', 'Full, sometimes partial in the first term'],
          ['Monthly stipend', '$1,500–$2,500 depending on field and location'],
          ['Health insurance', 'Often included'],
          ['Hours required', '20 a week, teaching or research'],
        ],
      },
      { type: 'heading', text: 'How they are actually awarded' },
      {
        type: 'paragraph',
        text: 'Not by the admissions office. Assistantships are awarded by departments and, in the case of research assistantships, very often by an individual faculty member with a grant. This is why contacting faculty before you apply is not optional in funded PhD admissions — it is the mechanism.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Identify three to five faculty whose recent published work you have actually read.',
          'Write to each individually, referencing specific papers and what you would want to work on.',
          'Attach a CV. Do not attach a generic statement of purpose.',
          'Apply to the programme regardless of whether they reply — many reply only after admission.',
        ],
      },
      {
        type: 'callout',
        title: 'What kills an application here',
        text: 'A mass email that is obviously a mass email. Faculty receive dozens a week and can spot a template instantly. Five specific letters beat fifty generic ones, every time.',
      },
    ],
  },
];

/** Newest first — the order the index renders. */
export const articlesByDate: readonly Article[] = [...articles].sort((a, b) =>
  b.published.localeCompare(a.published),
);

export const articleCategories: readonly string[] = [
  ...new Set(articles.map((article) => article.category)),
].sort();

export function articleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

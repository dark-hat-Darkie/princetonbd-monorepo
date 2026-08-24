/**
 * The shortlist behind `/study-abroad/university-finder`.
 *
 * This is a curated starting point, not a database. It holds the destinations
 * Bangladeshi students most often ask us about, with the facts that actually
 * change a shortlist — country, level, intake, indicative cost band and which
 * tests the university accepts.
 *
 * Everything here is indicative and must be confirmed against the university's
 * own admissions pages before an application is built on it. The finder says so
 * on the page; do not remove that notice.
 */

export const countries = ['USA', 'UK', 'Canada', 'Australia', 'Europe'] as const;
export const levels = ['Undergraduate', 'Masters', 'PhD'] as const;
export const tuitionBands = ['Under $20k', '$20k–$40k', 'Over $40k'] as const;
export const acceptedTests = ['SAT', 'ACT', 'GRE', 'GMAT', 'IELTS', 'TOEFL', 'Duolingo'] as const;

export type Country = (typeof countries)[number];
export type Level = (typeof levels)[number];
export type TuitionBand = (typeof tuitionBands)[number];

export interface University {
  name: string;
  country: Country;
  city: string;
  levels: readonly Level[];
  intakes: readonly string[];
  /** Indicative annual tuition for an international student, in USD. */
  tuition: TuitionBand;
  tests: readonly string[];
  note: string;
}

export const universities: readonly University[] = [
  {
    name: 'Arizona State University',
    country: 'USA',
    city: 'Tempe',
    levels: ['Undergraduate', 'Masters'],
    intakes: ['Fall', 'Spring'],
    tuition: '$20k–$40k',
    tests: ['SAT', 'ACT', 'IELTS', 'TOEFL', 'Duolingo'],
    note: 'Large public university with test-optional undergraduate admission and a wide scholarship ladder for international students.',
  },
  {
    name: 'University of Texas at Dallas',
    country: 'USA',
    city: 'Richardson',
    levels: ['Masters', 'PhD'],
    intakes: ['Fall', 'Spring'],
    tuition: '$20k–$40k',
    tests: ['GRE', 'IELTS', 'TOEFL'],
    note: 'A common target for Bangladeshi MS applicants in engineering and computer science, with strong assistantship availability.',
  },
  {
    name: 'Purdue University',
    country: 'USA',
    city: 'West Lafayette',
    levels: ['Undergraduate', 'Masters', 'PhD'],
    intakes: ['Fall', 'Spring'],
    tuition: 'Over $40k',
    tests: ['SAT', 'ACT', 'GRE', 'IELTS', 'TOEFL'],
    note: 'Engineering-heavy and highly ranked; competitive for funding but a well-trodden path from Bangladesh.',
  },
  {
    name: 'University of Illinois Urbana-Champaign',
    country: 'USA',
    city: 'Champaign',
    levels: ['Undergraduate', 'Masters', 'PhD'],
    intakes: ['Fall'],
    tuition: 'Over $40k',
    tests: ['SAT', 'ACT', 'GRE', 'IELTS', 'TOEFL'],
    note: 'Very strong in computing and engineering. Expect a demanding profile and early deadlines.',
  },
  {
    name: 'Texas A&M University',
    country: 'USA',
    city: 'College Station',
    levels: ['Masters', 'PhD'],
    intakes: ['Fall', 'Spring'],
    tuition: '$20k–$40k',
    tests: ['GRE', 'IELTS', 'TOEFL'],
    note: 'Large research output and a substantial South Asian student community.',
  },
  {
    name: 'University of Manchester',
    country: 'UK',
    city: 'Manchester',
    levels: ['Undergraduate', 'Masters', 'PhD'],
    intakes: ['September'],
    tuition: '$20k–$40k',
    tests: ['IELTS', 'TOEFL'],
    note: 'Russell Group, broad subject coverage, and a one-year taught masters that keeps total cost down.',
  },
  {
    name: 'University of Edinburgh',
    country: 'UK',
    city: 'Edinburgh',
    levels: ['Undergraduate', 'Masters', 'PhD'],
    intakes: ['September'],
    tuition: 'Over $40k',
    tests: ['IELTS', 'TOEFL'],
    note: 'Highly selective; strong for informatics, medicine and the humanities alike.',
  },
  {
    name: 'University of Glasgow',
    country: 'UK',
    city: 'Glasgow',
    levels: ['Undergraduate', 'Masters'],
    intakes: ['September', 'January'],
    tuition: '$20k–$40k',
    tests: ['IELTS', 'TOEFL', 'Duolingo'],
    note: 'January intakes on several masters programmes, which suits students who miss a September cycle.',
  },
  {
    name: 'Queen Mary University of London',
    country: 'UK',
    city: 'London',
    levels: ['Undergraduate', 'Masters'],
    intakes: ['September'],
    tuition: '$20k–$40k',
    tests: ['IELTS', 'TOEFL'],
    note: 'London-based Russell Group with comparatively accessible entry requirements.',
  },
  {
    name: 'University of Toronto',
    country: 'Canada',
    city: 'Toronto',
    levels: ['Undergraduate', 'Masters', 'PhD'],
    intakes: ['September'],
    tuition: 'Over $40k',
    tests: ['SAT', 'IELTS', 'TOEFL', 'Duolingo'],
    note: 'Canada’s most selective, and the most common Canadian target among our students.',
  },
  {
    name: 'University of Waterloo',
    country: 'Canada',
    city: 'Waterloo',
    levels: ['Undergraduate', 'Masters'],
    intakes: ['September', 'January'],
    tuition: '$20k–$40k',
    tests: ['SAT', 'IELTS', 'TOEFL'],
    note: 'Co-op programmes put paid work terms inside the degree, which materially offsets cost.',
  },
  {
    name: 'University of British Columbia',
    country: 'Canada',
    city: 'Vancouver',
    levels: ['Undergraduate', 'Masters', 'PhD'],
    intakes: ['September', 'January'],
    tuition: '$20k–$40k',
    tests: ['SAT', 'ACT', 'IELTS', 'TOEFL', 'Duolingo'],
    note: 'Strong research funding and a straightforward post-graduation work permit route.',
  },
  {
    name: 'Dalhousie University',
    country: 'Canada',
    city: 'Halifax',
    levels: ['Undergraduate', 'Masters'],
    intakes: ['September', 'January'],
    tuition: 'Under $20k',
    tests: ['IELTS', 'TOEFL', 'Duolingo'],
    note: 'Lower cost of living than the big three Canadian cities, with solid engineering and health programmes.',
  },
  {
    name: 'University of Melbourne',
    country: 'Australia',
    city: 'Melbourne',
    levels: ['Undergraduate', 'Masters', 'PhD'],
    intakes: ['February', 'July'],
    tuition: 'Over $40k',
    tests: ['IELTS', 'TOEFL', 'Duolingo'],
    note: 'Australia’s highest-ranked; two intakes a year and a generous post-study work window.',
  },
  {
    name: 'Monash University',
    country: 'Australia',
    city: 'Melbourne',
    levels: ['Undergraduate', 'Masters'],
    intakes: ['February', 'July'],
    tuition: '$20k–$40k',
    tests: ['IELTS', 'TOEFL', 'Duolingo'],
    note: 'Large international intake and structured pathway programmes for students just short of direct entry.',
  },
  {
    name: 'University of Queensland',
    country: 'Australia',
    city: 'Brisbane',
    levels: ['Undergraduate', 'Masters', 'PhD'],
    intakes: ['February', 'July'],
    tuition: '$20k–$40k',
    tests: ['IELTS', 'TOEFL'],
    note: 'Lower living costs than Sydney or Melbourne with comparable research standing.',
  },
  {
    name: 'RWTH Aachen University',
    country: 'Europe',
    city: 'Aachen',
    levels: ['Masters', 'PhD'],
    intakes: ['October', 'April'],
    tuition: 'Under $20k',
    tests: ['GRE', 'IELTS', 'TOEFL'],
    note: 'Germany’s engineering heavyweight, with no tuition fee at most public programmes — you budget for living costs, not fees.',
  },
  {
    name: 'TU Munich',
    country: 'Europe',
    city: 'Munich',
    levels: ['Masters', 'PhD'],
    intakes: ['October'],
    tuition: 'Under $20k',
    tests: ['GRE', 'IELTS', 'TOEFL'],
    note: 'Highly competitive and largely fee-free; expect a strong quantitative profile to be required.',
  },
  {
    name: 'KU Leuven',
    country: 'Europe',
    city: 'Leuven',
    levels: ['Masters', 'PhD'],
    intakes: ['September'],
    tuition: 'Under $20k',
    tests: ['IELTS', 'TOEFL'],
    note: 'English-taught masters across most faculties at modest fees, in a low-cost university town.',
  },
  {
    name: 'Delft University of Technology',
    country: 'Europe',
    city: 'Delft',
    levels: ['Masters', 'PhD'],
    intakes: ['September'],
    tuition: '$20k–$40k',
    tests: ['GRE', 'IELTS', 'TOEFL'],
    note: 'A leading technical university with a well-defined scholarship route for non-EU students.',
  },
  {
    name: 'Politecnico di Milano',
    country: 'Europe',
    city: 'Milan',
    levels: ['Undergraduate', 'Masters'],
    intakes: ['September'],
    tuition: 'Under $20k',
    tests: ['IELTS', 'TOEFL'],
    note: 'Income-assessed fees make this one of the cheapest routes into a top-100 engineering or design school.',
  },
  {
    name: 'Northeastern University',
    country: 'USA',
    city: 'Boston',
    levels: ['Masters'],
    intakes: ['Fall', 'Spring'],
    tuition: 'Over $40k',
    tests: ['GRE', 'GMAT', 'IELTS', 'TOEFL', 'Duolingo'],
    note: 'Co-op model with paid placements; expensive up front but with a clear employment pathway.',
  },
  {
    name: 'Warwick Business School',
    country: 'UK',
    city: 'Coventry',
    levels: ['Masters'],
    intakes: ['September'],
    tuition: 'Over $40k',
    tests: ['GMAT', 'GRE', 'IELTS'],
    note: 'A strong UK MBA and MSc route; the GMAT still moves the needle on scholarship decisions here.',
  },
  {
    name: 'University of Alberta',
    country: 'Canada',
    city: 'Edmonton',
    levels: ['Masters', 'PhD'],
    intakes: ['September', 'January'],
    tuition: 'Under $20k',
    tests: ['GRE', 'IELTS', 'TOEFL'],
    note: 'Funded research places are relatively attainable, and the cost base is among the lowest in Canada.',
  },
];

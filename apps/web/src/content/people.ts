/**
 * Teaching faculty and counselors.
 *
 * Names and credentials here are placeholders standing in for the real roster.
 * They are deliberately plausible rather than aspirational — replace them with
 * the actual team before launch, including a photograph for each if one is
 * available. The `initials` field is what the page renders when there is no
 * photograph, and the design's monogram treatment is good enough that shipping
 * without photographs is a legitimate choice, not a fallback.
 */

export interface Instructor {
  name: string;
  /** Rendered in the monogram when there is no photograph. */
  initials: string;
  role: string;
  /** Subjects and exams this person teaches. */
  teaches: readonly string[];
  /** One line: the credential that matters, stated plainly. */
  credential: string;
  campus: string;
}

export const instructors: readonly Instructor[] = [
  {
    name: 'Dr. Imran Chowdhury',
    initials: 'IC',
    role: 'Director of Test Preparation',
    teaches: ['SAT', 'ACT', 'GRE'],
    credential: 'PhD, University of Michigan. Fourteen years teaching admissions tests.',
    campus: 'Dhaka — Gulshan',
  },
  {
    name: 'Farzana Haque',
    initials: 'FH',
    role: 'Lead Instructor, Quantitative',
    teaches: ['SAT Math', 'GRE Quant', 'GMAT Quant'],
    credential: 'MSc Mathematics, BUET. Perfect quant score on both the GRE and the GMAT.',
    campus: 'Dhaka — Gulshan',
  },
  {
    name: 'Nabeel Ahsan',
    initials: 'NA',
    role: 'Lead Instructor, Verbal & Reading',
    teaches: ['SAT R&W', 'GRE Verbal', 'LSAT'],
    credential: 'MA English, University of Dhaka. Former newspaper sub-editor.',
    campus: 'Dhaka — Dhanmondi',
  },
  {
    name: 'Rehnuma Siddiqui',
    initials: 'RS',
    role: 'Head of English Proficiency',
    teaches: ['IELTS', 'TOEFL', 'PTE'],
    credential: 'CELTA and DELTA qualified. Nine years as an IELTS examiner.',
    campus: 'Dhaka — Gulshan',
  },
  {
    name: 'Shafqat Rahman',
    initials: 'SR',
    role: 'Senior Admissions Counselor',
    teaches: ['Undergraduate counseling', 'Essays'],
    credential: 'Former admissions reader at a US liberal arts college.',
    campus: 'Dhaka — Gulshan',
  },
  {
    name: 'Dr. Tahmina Akter',
    initials: 'TA',
    role: 'Graduate Admissions Counselor',
    teaches: ['MS & PhD counseling', 'Assistantship strategy'],
    credential: 'PhD, TU Delft. Supervised graduate admissions for six intake cycles.',
    campus: 'Dhaka — Dhanmondi',
  },
  {
    name: 'Arif Mahmud',
    initials: 'AM',
    role: 'Lead Instructor, Sciences',
    teaches: ['AP Physics', 'AP Chemistry', 'MCAT'],
    credential: 'MSc Physics, University of Dhaka. Ten years of A-Level and AP teaching.',
    campus: 'Chattogram',
  },
  {
    name: 'Lubna Karim',
    initials: 'LK',
    role: 'Instructor, Business Tests',
    teaches: ['GMAT', 'Data Insights'],
    credential: 'MBA, IBA. 750 on the GMAT Focus Edition.',
    campus: 'Dhaka — Gulshan',
  },
  {
    name: 'Zahid Hasan',
    initials: 'ZH',
    role: 'Head of Chattogram Campus',
    teaches: ['SAT', 'IELTS'],
    credential: 'MA Education. Built the Chattogram teaching team from scratch.',
    campus: 'Chattogram',
  },
];

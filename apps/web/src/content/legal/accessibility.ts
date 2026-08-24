import type { LegalContent } from '../types';

export const accessibilityStatement: LegalContent = {
  path: '/legal/accessibility',
  seo: {
    title: 'Accessibility statement — Princeton Review Bangladesh',
    description:
      'Our commitment to web accessibility, features implemented, known limitations, and how to request alternative formats.',
  },
  title: 'Accessibility statement',
  updated: '2026-08-01',
  body: [
    {
      type: 'paragraph',
      text: 'Princeton Review Bangladesh is committed to making our website accessible to all users, including those with disabilities. This statement outlines our accessibility efforts, what we have done, and how to contact us if you encounter barriers.',
    },
    {
      type: 'heading',
      text: 'Accessibility standards',
      id: 'standards',
    },
    {
      type: 'paragraph',
      text: 'We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA standard. We regularly test our website for compliance and strive to fix any issues that arise.',
    },
    {
      type: 'heading',
      text: 'What we have implemented',
      id: 'what-implemented',
    },
    {
      type: 'paragraph',
      text: 'Our website includes the following accessibility features:',
    },
    {
      type: 'list',
      items: [
        'Keyboard navigation: all interactive elements (links, buttons, forms) are fully navigable using the Tab key, and keyboard shortcuts are documented.',
        'Screen reader support: headings, lists, labels and alternative text are marked up semantically so screen readers can interpret content correctly.',
        'Colour contrast: text meets a minimum contrast ratio of 4.5:1 (or 3:1 for large text) against its background.',
        'Responsive design: the website adapts to small screens and can be zoomed up to 200% without breaking layout.',
        'Reduced motion: animations and auto-playing content respect the prefers-reduced-motion setting.',
        'Form accessibility: form fields have associated labels, error messages are clear, and validation feedback is provided.',
        'Logical heading hierarchy: headings (H1 to H6) are used correctly to structure content.',
        'Alternative text: images have descriptive alt text, or are marked as decorative if they convey no content.',
      ],
    },
    {
      type: 'heading',
      text: 'Known limitations',
      id: 'known-limitations',
    },
    {
      type: 'paragraph',
      text: 'While we strive for full accessibility, some limitations remain:',
    },
    {
      type: 'list',
      items: [
        'PDF course materials: older PDFs may not be fully tagged for screen readers. We are converting these and will provide accessible versions on request.',
        'Video content: while videos have captions, some background audio descriptions are not yet complete. We are working to add these.',
        'Third-party tools: some course delivery and payment systems are provided by external vendors and may have limited accessibility features beyond our control.',
        'Interactive maps or course finder tools: these may have reduced keyboard accessibility and are currently under review.',
      ],
    },
    {
      type: 'heading',
      text: 'How to report an accessibility issue',
      id: 'report-issue',
    },
    {
      type: 'paragraph',
      text: 'If you encounter a barrier while using our website or services, please let us know so we can address it promptly. You can:',
    },
    {
      type: 'list',
      items: [
        'Send an email to our support address (see contact details below) with details of the issue (page URL, what you tried to do, what went wrong).',
        'Call our office during business hours to speak with staff.',
        'Use the contact form on the website and include "accessibility issue" in the subject line.',
      ],
    },
    {
      type: 'heading',
      text: 'Alternative formats and materials',
      id: 'alternative-formats',
    },
    {
      type: 'paragraph',
      text: 'If you need course materials, study guides or content in an alternative format (large print, audio, Braille, simplified text or other), we will provide them at no extra cost. Please request alternative formats when you enrol or contact us directly.',
    },
    {
      type: 'heading',
      text: 'Commitment to ongoing improvement',
      id: 'commitment',
    },
    {
      type: 'paragraph',
      text: 'Accessibility is an ongoing process. We test our website regularly, incorporate user feedback, train our team, and update our practices to stay current with accessibility standards. We welcome suggestions and will prioritise fixing issues that affect your access to our services.',
    },
  ],
};

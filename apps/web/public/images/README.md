# Site images

Photography is from [Unsplash](https://unsplash.com), used under the
[Unsplash License](https://unsplash.com/license), and self-hosted rather than
hot-linked so the site has no runtime dependency on a third-party CDN.

Each file is already cropped to the aspect ratio it renders at, so `next/image`
resizes but never re-crops — a portrait frame handed a landscape original loses
the subject.

| File                        | Rendered at                            | Aspect | Source photo                       |
| --------------------------- | -------------------------------------- | ------ | ---------------------------------- |
| `hero-students.jpg`         | Landing hero, right column             | 3:4    | `photo-1741699428220-65f37f3fbbcb` |
| `counselling.jpg`           | Landing, admissions & study abroad     | 4:5    | `photo-1758525861781-bea6e7d79334` |
| `destination-usa.jpg`       | `/study-abroad/destinations/usa`       | 4:5    | `photo-1641160616553-a9d21a846e49` |
| `destination-uk.jpg`        | `/study-abroad/destinations/uk`        | 4:5    | `photo-1565963479542-3cf82a9ee7e9` |
| `destination-canada.jpg`    | `/study-abroad/destinations/canada`    | 4:5    | `photo-1784809909852-adc8d3daf814` |
| `destination-australia.jpg` | `/study-abroad/destinations/australia` | 4:5    | `photo-1599352318473-abbc53b44a9a` |
| `destination-europe.jpg`    | `/study-abroad/destinations/europe`    | 4:5    | `photo-1670528148572-9270351b95bd` |

To replace one, download from Unsplash at the same aspect ratio and keep the
filename — nothing in the code needs to change. Re-crop with
`?w=<w>&h=<h>&fit=crop&q=78&fm=jpg`.

## What is deliberately not photographed

Instructors and students are rendered as monograms, not portraits. The names in
`content/people.ts` and the testimonials in `content/shared.ts` are placeholders,
and putting a stock photograph of a real person under an invented staff name
misrepresents that person as an employee. When the real team is photographed,
add the files here and give `Instructor` a `photo` field.

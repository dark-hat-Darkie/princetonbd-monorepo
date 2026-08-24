/**
 * Emits a structured-data block for search engines.
 *
 * `JSON.stringify` output is escaped before it goes into the script body: a
 * `<` inside any string value would otherwise be read as the start of a tag and
 * could close the script element early. The payload is authored in this repo,
 * not user input, but the escape costs nothing and removes the failure mode.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

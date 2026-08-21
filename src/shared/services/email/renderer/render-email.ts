import { convert } from "html-to-text";

export interface RenderedEmail {
  html: string;
  text: string;
}

/**
 * Renders an HTML string into both HTML and plain-text formats.
 * Uses html-to-text for robust plain-text fallback generation.
 */
export function renderEmail(html: string): RenderedEmail {
  const text = convert(html, {
    wordwrap: 130,
    selectors: [
      { selector: 'a', options: { hideLinkHrefIfSameAsText: true } },
    ]
  });

  return { html, text };
}

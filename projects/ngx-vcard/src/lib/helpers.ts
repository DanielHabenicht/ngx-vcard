/**
 * Encodes string
 */
export function e(value: string | undefined): string {
  if (value) {
    if (typeof value !== 'string') {
      value = '' + value;
    }

    return encodeURIComponent(
      value
        // From https://datatracker.ietf.org/doc/html/rfc6350
        //  Some properties may contain one or more values delimited by a COMMA
        //  character (U+002C).  Therefore, a COMMA character in a value MUST be
        //  escaped with a BACKSLASH character (U+005C), even for properties that
        //  don't allow multiple instances (for consistency).
        .replace(/,/g, ',')

        //  Some properties (e.g., N and ADR) comprise multiple fields delimited
        //  by a SEMICOLON character (U+003B).  Therefore, a SEMICOLON in a field
        //  of such a "compound" property MUST be escaped with a BACKSLASH
        //  character.  SEMICOLON characters in non-compound properties MAY be
        //  escaped.  On input, an escaped SEMICOLON character is never a field
        //  separator.  An unescaped SEMICOLON character may be a field
        //  separator, depending on the property in which it appears.
        .replace(/;/g, ';')

        //  Finally, BACKSLASH characters in values MUST be escaped with a
        //  BACKSLASH character.

        .replace(/\\/g, '\\\\')

        // NEWLINE (U+000A) characters in values MUST be
        //  encoded by two characters: a BACKSLASH followed by either an 'n'
        //  (U+006E) or an 'N' (U+004E).
        .replace(/\n/g, '\\n')

      //  In all other cases, escaping MUST NOT be used.
    );
  }
  return '';
}

/**
 * Return new line characters
 */
export function nl(): string {
  return '\n';
}

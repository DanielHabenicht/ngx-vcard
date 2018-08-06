/**
 * Encodes string
 */
export function e(value: string | undefined): string {
  if (value) {
    if (typeof value !== 'string') {
      value = '' + value;
    }
    return value
      .replace(/\n/g, '\n')
      .replace(/,/g, ',')
      .replace(/;/g, ';');
  }
  return '';
}

/**
 * Return new line characters
 */
export function nl(): string {
  return '\n';
}

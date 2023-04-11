export function toCrateName(s: string): string {
  return s.replace(/([^a-zA-Z0-9])/g, '_').toLowerCase();
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim();
}

export function sanitizeMultiLine(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim();
}

export function isValidToken(token: unknown): token is string {
  if (typeof token !== 'string') return false;

  const trimmed = token.trim();
  return trimmed.length >= 10 && trimmed.length <= 100;
}

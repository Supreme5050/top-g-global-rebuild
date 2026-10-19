/** Strict payload limits: never log or return credentials. */
export type Credentials = Readonly<{ email: string; password: string }>;

export function parseCredentials(value: unknown): Credentials | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  if (typeof record.email !== "string" || typeof record.password !== "string") return null;

  const email = record.email.trim();
  const password = record.password;
  if (
    email.length < 3 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    password.length < 8 || password.length > 1024
  ) return null;

  return { email, password };
}

export async function readSmallJson(request: Request): Promise<unknown | null> {
  try {
    const input = await request.text();
    if (input.length === 0 || input.length > 8192) return null;
    return JSON.parse(input) as unknown;
  } catch {
    return null;
  }
}

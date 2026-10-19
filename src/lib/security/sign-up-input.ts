import { parseCredentials, type Credentials } from "./auth-input";

/** The full name is untrusted Auth user metadata, NOT an official approved member name. */
export type SignUpInput = Credentials & Readonly<{ fullName: string }>;

export function parseSignUpInput(value: unknown): SignUpInput | null {
  const credentials = parseCredentials(value);
  if (!credentials || typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const candidate = (value as Record<string, unknown>).fullName;
  if (typeof candidate !== "string") return null;
  const fullName = candidate.trim().replace(/\s+/g, " ");
  if (fullName.length < 2 || fullName.length > 150 || /[\u0000-\u001f\u007f<>]/.test(candidate)) return null;
  return { ...credentials, fullName };
}

export function parseEmailOnly(value: unknown): string | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const raw = (value as Record<string, unknown>).email;
  if (typeof raw !== "string") return null;
  const email = raw.trim();
  if (email.length < 3 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

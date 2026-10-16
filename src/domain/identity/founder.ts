/** Public identity G-1 is reserved exclusively for the Founder. */
export const RESERVED_FOUNDER_PUBLIC_ID = "G-1" as const;

export function isFounderPublicId(value: string): boolean {
  return value === RESERVED_FOUNDER_PUBLIC_ID;
}

/**
 * Fail safely if an ordinary-member issuance flow attempts to use the Founder ID.
 * This is a defense-in-depth utility. The database must enforce the reservation,
 * and the ordinary member public-ID format remains undecided.
 */
export function assertNotFounderPublicId(value: string): void {
  if (isFounderPublicId(value)) {
    throw new Error("G-1 is reserved for the Founder");
  }
}

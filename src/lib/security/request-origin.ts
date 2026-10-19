/** Fail closed for cookie-authenticated state-changing API calls. */
export function isSameOriginMutation(origin: string | null, targetOrigin: string): boolean {
  if (!origin) return false;
  try {
    const claimed = new URL(origin);
    const target = new URL(targetOrigin);
    return (
      claimed.origin === target.origin &&
      claimed.pathname === "/" &&
      claimed.search === "" &&
      claimed.hash === ""
    );
  } catch {
    return false;
  }
}

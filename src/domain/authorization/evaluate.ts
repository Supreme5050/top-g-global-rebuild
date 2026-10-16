import type { AccountHolderId } from "../identity/ids";
import type {
  AccessRoleId,
  AccessScopeId,
  AuthorizationRequirement,
  PermissionId,
} from "./ids";

/**
 * One directly granted role + permission + scope combination.
 *
 * The caller MUST load grants and assignments from a trusted server-side
 * store. Never construct them from browser-provided claims or query strings.
 */
export interface ScopedPermissionGrant {
  readonly roleId: AccessRoleId;
  readonly permissionId: PermissionId;
  readonly scopeId: AccessScopeId;
}

/**
 * Inputs for a single conservative policy evaluation.
 * `null` principal is anonymous; an empty assignment/grant list denies access.
 */
export interface AuthorizationEvaluationInput {
  readonly principalId: AccountHolderId | null;
  readonly assignedRoleIds: readonly AccessRoleId[];
  readonly grants: readonly ScopedPermissionGrant[];
  readonly requirement: AuthorizationRequirement;
}

export type AuthorizationDecision =
  | { readonly allowed: true; readonly code: "GRANTED" }
  | {
      readonly allowed: false;
      readonly code: "UNAUTHENTICATED" | "DENIED";
    };

/**
 * Exact-match, fail-closed role + permission + scope evaluation.
 *
 * This deliberately does NOT infer geographic ancestry, inherited roles,
 * membership status, governance authority, or access to child scopes.
 * Those policies require explicit approved institutional rules and a trusted
 * server/database implementation.
 */
export function evaluateAuthorization(
  input: AuthorizationEvaluationInput,
): AuthorizationDecision {
  if (!input.principalId) {
    return { allowed: false, code: "UNAUTHENTICATED" };
  }

  const { roleId, permissionId, scopeId } = input.requirement;

  if (!input.assignedRoleIds.includes(roleId)) {
    return { allowed: false, code: "DENIED" };
  }

  const hasExactGrant = input.grants.some(
    (grant) =>
      grant.roleId === roleId &&
      grant.permissionId === permissionId &&
      grant.scopeId === scopeId,
  );

  return hasExactGrant
    ? { allowed: true, code: "GRANTED" }
    : { allowed: false, code: "DENIED" };
}

/**
 * Convenient, non-disclosing error type for future server-side handlers.
 * Do NOT use this as a replacement for Supabase RLS.
 */
export class AuthorizationDeniedError extends Error {
  readonly code = "ACCESS_DENIED" as const;

  constructor() {
    super("Access denied");
    this.name = "AuthorizationDeniedError";
  }
}

export function assertAuthorized(input: AuthorizationEvaluationInput): void {
  if (!evaluateAuthorization(input).allowed) {
    throw new AuthorizationDeniedError();
  }
}

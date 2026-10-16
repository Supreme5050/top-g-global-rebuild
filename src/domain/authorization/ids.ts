import type { EntityId } from "@/domain/identity/ids";

/** Access-control concepts are distinct from operational/governance appointments. */
export type AccessRoleId = EntityId<"access-role">;
export type PermissionId = EntityId<"permission">;
export type AccessScopeId = EntityId<"access-scope">;

/** A permission check must account for all three dimensions. */
export interface AuthorizationRequirement {
  readonly roleId: AccessRoleId;
  readonly permissionId: PermissionId;
  readonly scopeId: AccessScopeId;
}

// This module intentionally does NOT claim to grant access or implement RLS.
// Server-side authorization policies and database RLS will be designed using
// the governing Blueprint, not invented as provisional UI-side checks.

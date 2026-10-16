import { describe, expect, it } from "vitest";
import { assertAuthorized, AuthorizationDeniedError, evaluateAuthorization } from "../../src/domain/authorization/evaluate";
import type { AccountHolderId } from "../../src/domain/identity/ids";
import type { AccessRoleId, AccessScopeId, PermissionId } from "../../src/domain/authorization/ids";

const principal = "00000000-0000-4000-8000-000000000001" as AccountHolderId;
const role = "00000000-0000-4000-8000-000000000002" as AccessRoleId;
const otherRole = "00000000-0000-4000-8000-000000000003" as AccessRoleId;
const permission = "00000000-0000-4000-8000-000000000004" as PermissionId;
const otherPermission = "00000000-0000-4000-8000-000000000005" as PermissionId;
const scope = "00000000-0000-4000-8000-000000000006" as AccessScopeId;
const otherScope = "00000000-0000-4000-8000-000000000007" as AccessScopeId;

const requirement = { roleId: role, permissionId: permission, scopeId: scope };
const grant = { ...requirement };

function input(overrides: Record<string, unknown> = {}) {
  return {
    principalId: principal,
    assignedRoleIds: [role],
    grants: [grant],
    requirement,
    ...overrides,
  };
}

describe("deny-by-default institutional authorization", () => {
  it("grants only an exact role, permission and scope match", () => {
    expect(evaluateAuthorization(input())).toEqual({ allowed: true, code: "GRANTED" });
  });

  it("denies anonymous callers even if grants are present", () => {
    expect(evaluateAuthorization(input({ principalId: null }))).toEqual({ allowed: false, code: "UNAUTHENTICATED" });
  });

  it("denies authenticated callers without role assignments", () => {
    expect(evaluateAuthorization(input({ assignedRoleIds: [] })).allowed).toBe(false);
  });

  it("denies when the required role is not assigned", () => {
    expect(evaluateAuthorization(input({ assignedRoleIds: [otherRole] })).allowed).toBe(false);
  });

  it("denies when no grants exist", () => {
    expect(evaluateAuthorization(input({ grants: [] })).allowed).toBe(false);
  });

  it("denies grants belonging to another role", () => {
    expect(evaluateAuthorization(input({ grants: [{ ...grant, roleId: otherRole }] })).allowed).toBe(false);
  });

  it("denies a different permission", () => {
    expect(evaluateAuthorization(input({ grants: [{ ...grant, permissionId: otherPermission }] })).allowed).toBe(false);
  });

  it("does not infer access to a different geographical or institutional scope", () => {
    expect(evaluateAuthorization(input({ grants: [{ ...grant, scopeId: otherScope }] })).allowed).toBe(false);
  });

  it("denies even if a role, permission and scope appear in different grants", () => {
    expect(evaluateAuthorization(input({ grants: [
      { roleId: role, permissionId: permission, scopeId: otherScope },
      { roleId: otherRole, permissionId: permission, scopeId: scope },
    ] })).allowed).toBe(false);
  });

  it("throws a non-disclosing error when a requirement is not met", () => {
    expect(() => assertAuthorized(input({ grants: [] }))).toThrow(AuthorizationDeniedError);
    expect(() => assertAuthorized(input({ grants: [] }))).toThrow("Access denied");
  });

  it("does not throw for an exact match", () => {
    expect(() => assertAuthorized(input())).not.toThrow();
  });
});

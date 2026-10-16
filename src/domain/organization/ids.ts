import type { EntityId } from "@/domain/identity/ids";

/** Independent institutional dimensions: do not collapse into one 'department' or 'role'. */
export type RealmId = EntityId<"realm">;
export type SectorId = EntityId<"sector">;
export type DepartmentId = EntityId<"department">;
export type OperationalRoleId = EntityId<"operational-role">;
export type GovernanceAppointmentId = EntityId<"governance-appointment">;
export type GeographyId = EntityId<"geography">;
export type MembershipStatusId = EntityId<"membership-status">;

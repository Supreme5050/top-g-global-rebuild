/** Compile-time checks: these must remain errors under `npx tsc --noEmit`. */
import type {
  AccountHolderId,
  ApplicantId,
  MemberId,
  PublicMemberId,
} from "@/domain/identity/ids";
import type {
  RealmId,
  SectorId,
  OperationalRoleId,
  GovernanceAppointmentId,
} from "@/domain/organization/ids";
import type { AccessRoleId } from "@/domain/authorization/ids";

const account = "" as AccountHolderId;
const realm = "" as RealmId;
const operationalRole = "" as OperationalRoleId;
const member = "" as MemberId;

// @ts-expect-error Account holders are not applicants by default.
const wrongApplicant: ApplicantId = account;
// @ts-expect-error Account holders are not approved members by default.
const wrongMember: MemberId = account;
// @ts-expect-error Realms and sectors are different domains.
const wrongSector: SectorId = realm;
// @ts-expect-error Operational roles are not governance appointments.
const wrongAppointment: GovernanceAppointmentId = operationalRole;
// @ts-expect-error Operational roles are not access-control roles.
const wrongAccessRole: AccessRoleId = operationalRole;
// @ts-expect-error Internal and public member IDs differ.
const wrongPublicId: PublicMemberId = member;

void [wrongApplicant, wrongMember, wrongSector, wrongAppointment, wrongAccessRole, wrongPublicId];

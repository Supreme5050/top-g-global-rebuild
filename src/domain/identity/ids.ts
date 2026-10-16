/**
 * Institutionally distinct database identifiers.
 *
 * These are type-level boundaries, not an authorization mechanism. UUIDs must
 * still be validated by the database and server-side access rules.
 */
declare const entityIdBrand: unique symbol;

export type EntityId<Kind extends string> = string & {
  readonly [entityIdBrand]: Kind;
};

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Validate a database UUID before treating it as a typed entity ID. */
export function parseEntityId<Kind extends string>(value: string): EntityId<Kind> {
  if (!UUID_PATTERN.test(value)) {
    throw new TypeError("Expected a valid UUID entity identifier");
  }

  return value as EntityId<Kind>;
}

// An account holder, an applicant and a member are distinct institutional entities.
export type AccountHolderId = EntityId<"account-holder">;
export type ApplicantId = EntityId<"applicant">;
export type ApplicationId = EntityId<"membership-application">;
export type MemberId = EntityId<"approved-member">;

/** Immutable internal UUIDs must not be mistaken for external/public identifiers. */
declare const publicMemberIdBrand: unique symbol;
export type PublicMemberId = string & {
  readonly [publicMemberIdBrand]: "public-member-id";
};

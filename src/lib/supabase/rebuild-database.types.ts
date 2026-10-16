/**
 * Minimal SQL-aligned read models for the new Top G Global identity foundation.
 * Not an authorization decision; database RLS and trusted server logic remain mandatory.
 * Institutional boundaries are intentionally separate; no lifecycle statuses or
 * ordinary public member-ID format are defined before Founder approval.
 */
export interface TggAccountHolderRow {
  readonly id: string;
  readonly created_at: string;
}

export interface TggApplicantRow {
  readonly id: string;
  readonly account_holder_id: string;
  readonly created_at: string;
}

export interface TggMembershipApplicationRow {
  readonly id: string;
  readonly applicant_id: string;
  readonly created_at: string;
}

export interface TggMemberRow {
  readonly id: string;
  readonly account_holder_id: string;
  readonly created_at: string;
}

export interface TggAuditEventRow {
  readonly id: number;
  readonly entity_table: string;
  readonly entity_id: string;
  readonly operation: "INSERT" | "UPDATE" | "DELETE";
  readonly actor_account_id: string | null;
  readonly occurred_at: string;
}

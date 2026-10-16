-- Top G Global REBUILD — Phase 2B/part 3
-- Stores ONLY metadata (table, UUID, operation, actor, timestamp); no PII snapshots.
-- Real member approval and role/scope authorization are not implemented yet.
BEGIN;

CREATE TABLE public.tgg_audit_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  entity_table text NOT NULL,
  entity_id uuid NOT NULL,
  operation text NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
  actor_account_id uuid NULL,
  occurred_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX tgg_audit_events_entity_idx ON public.tgg_audit_events(entity_table, entity_id, occurred_at DESC);
CREATE INDEX tgg_audit_events_actor_idx ON public.tgg_audit_events(actor_account_id, occurred_at DESC);

ALTER TABLE public.tgg_audit_events ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.tgg_audit_events FROM PUBLIC, anon, authenticated;
REVOKE ALL ON SEQUENCE public.tgg_audit_events_id_seq FROM PUBLIC, anon, authenticated;

CREATE FUNCTION public.tgg_record_identity_audit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  affected_id uuid;
BEGIN
  IF TG_OP = 'DELETE' THEN
    affected_id := OLD.id;
  ELSE
    affected_id := NEW.id;
  END IF;

  INSERT INTO public.tgg_audit_events (entity_table, entity_id, operation, actor_account_id)
  VALUES (TG_TABLE_NAME, affected_id, TG_OP, auth.uid());

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.tgg_record_identity_audit() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER tgg_account_holders_audit
AFTER INSERT OR UPDATE OR DELETE ON public.tgg_account_holders
FOR EACH ROW EXECUTE FUNCTION public.tgg_record_identity_audit();

CREATE TRIGGER tgg_applicants_audit
AFTER INSERT OR UPDATE OR DELETE ON public.tgg_applicants
FOR EACH ROW EXECUTE FUNCTION public.tgg_record_identity_audit();

CREATE TRIGGER tgg_membership_applications_audit
AFTER INSERT OR UPDATE OR DELETE ON public.tgg_membership_applications
FOR EACH ROW EXECUTE FUNCTION public.tgg_record_identity_audit();

CREATE TRIGGER tgg_members_audit
AFTER INSERT OR UPDATE OR DELETE ON public.tgg_members
FOR EACH ROW EXECUTE FUNCTION public.tgg_record_identity_audit();

COMMIT;

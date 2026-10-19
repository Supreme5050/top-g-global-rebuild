-- READ-ONLY: Execute against the NEW Supabase project AFTER Phase 3A migration.
-- Phase 2B verification should have been run BEFORE Phase 3A because Phase 3A
-- intentionally adds limited self-service RLS policies.
DO $$
DECLARE
  num_policies integer;
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'tgg_account_holder_after_signup' AND NOT tgisinternal AND tgenabled <> 'D'
  ) THEN
    RAISE EXCEPTION 'FAIL: missing enabled auth account-holder trigger';
  END IF;

  SELECT count(*) INTO num_policies
  FROM pg_policies
  WHERE schemaname = 'public'
    AND policyname IN (
      'tgg_account_holder_self_read', 'tgg_account_holder_self_insert',
      'tgg_applicant_self_read', 'tgg_applicant_self_insert',
      'tgg_application_self_read', 'tgg_application_self_insert'
    );
  IF num_policies <> 6 THEN
    RAISE EXCEPTION 'FAIL: expected 6 self-service RLS policies, found %', num_policies;
  END IF;

  IF NOT has_function_privilege('authenticated', 'public.tgg_begin_membership_application()', 'EXECUTE')
      OR has_function_privilege('anon', 'public.tgg_begin_membership_application()', 'EXECUTE') THEN
    RAISE EXCEPTION 'FAIL: application RPC privileges incorrect';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename IN ('tgg_members', 'tgg_audit_events')) THEN
    RAISE EXCEPTION 'FAIL: member/audit tables unexpectedly accessible by policies';
  END IF;
  IF has_table_privilege('authenticated', 'public.tgg_members', 'SELECT')
       OR has_table_privilege('authenticated', 'public.tgg_audit_events', 'SELECT')
       OR has_table_privilege('authenticated', 'public.tgg_applicants', 'UPDATE')
       OR has_table_privilege('authenticated', 'public.tgg_membership_applications', 'DELETE') THEN
    RAISE EXCEPTION 'FAIL: forbidden table privilege present';
  END IF;
  RAISE NOTICE 'PHASE 3A PASS: auth trigger, six self-scoped policies, authenticated RPC, member/audit tables protected';
END;
$$;

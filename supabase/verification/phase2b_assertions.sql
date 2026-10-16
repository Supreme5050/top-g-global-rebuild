-- Run this in the NEW Supabase project's SQL Editor after applying all migrations.
-- READ-ONLY verification. NOTICE output is safe to share; do not share credentials.
DO $$
DECLARE
  table_name text;
  expected text[] := ARRAY[
    'tgg_account_holders', 'tgg_applicants',
    'tgg_membership_applications', 'tgg_members', 'tgg_audit_events'
  ];
  expected_triggers text[] := ARRAY[
    'tgg_account_holders_audit', 'tgg_applicants_audit',
    'tgg_membership_applications_audit', 'tgg_members_audit'
  ];
  num_triggers integer;
BEGIN
  FOREACH table_name IN ARRAY expected LOOP
    IF NOT EXISTS (
      SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'public' AND c.relname = table_name
        AND c.relkind = 'r' AND c.relrowsecurity
    ) THEN
      RAISE EXCEPTION 'FAIL: missing or RLS-disabled table: %', table_name;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = table_name) THEN
      RAISE EXCEPTION 'FAIL: unexpected policies for % (review before granting access)', table_name;
    END IF;
  END LOOP;

  SELECT count(*) INTO num_triggers
  FROM pg_trigger t JOIN pg_class c ON c.oid = t.tgrelid
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public' AND NOT t.tgisinternal
    AND t.tgname = ANY(expected_triggers) AND t.tgenabled <> 'D';

  IF num_triggers <> 4 THEN
    RAISE EXCEPTION 'FAIL: expected 4 enabled audit triggers, found %', num_triggers;
  END IF;

  IF EXISTS (
    SELECT 1 FROM unnest(expected) AS t(name)
    WHERE has_table_privilege('authenticated', 'public.' || name, 'SELECT')
       OR has_table_privilege('authenticated', 'public.' || name, 'INSERT')
       OR has_table_privilege('authenticated', 'public.' || name, 'UPDATE')
       OR has_table_privilege('authenticated', 'public.' || name, 'DELETE')
       OR has_table_privilege('anon', 'public.' || name, 'SELECT')
       OR has_table_privilege('anon', 'public.' || name, 'INSERT')
  ) THEN
    RAISE EXCEPTION 'FAIL: client table privileges unexpectedly present';
  END IF;

  RAISE NOTICE 'PHASE 2B PASS: five tables protected by RLS, no client policies/grants, four audit triggers enabled';
END;
$$;

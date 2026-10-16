-- Top G Global Phase 2A: minimal database execution check.
-- No membership, permissions, audit or public-ID schema is created by this migration.
-- Safe for a NEW Supabase project; review before applying to an existing project.
BEGIN;

CREATE OR REPLACE FUNCTION public.tgg_healthcheck()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT true;
$$;

REVOKE ALL ON FUNCTION public.tgg_healthcheck() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.tgg_healthcheck() TO anon, authenticated;

COMMIT;

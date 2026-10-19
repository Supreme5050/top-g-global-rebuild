-- TOP G GLOBAL REBUILD — Phase 3A
-- Requires successful Phase 2A and Phase 2B migrations on the NEW Supabase project.
-- No member creation, member ID issuance, approval logic or admin role grants.
-- Safe to run ONCE in SQL Editor after checking the target project.
BEGIN;

-- Register an ACCOUNT HOLDER (not an applicant or member) on Supabase Auth signup.
CREATE FUNCTION public.tgg_create_account_holder_from_auth()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.tgg_account_holders (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.tgg_create_account_holder_from_auth() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER tgg_account_holder_after_signup
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.tgg_create_account_holder_from_auth();

-- Authenticated people can access ONLY their own account/applicant/application records.
-- No grant is added for tgg_members or tgg_audit_events.
GRANT SELECT, INSERT ON TABLE public.tgg_account_holders TO authenticated;
CREATE POLICY tgg_account_holder_self_read ON public.tgg_account_holders
FOR SELECT TO authenticated USING (id = (SELECT auth.uid()));
CREATE POLICY tgg_account_holder_self_insert ON public.tgg_account_holders
FOR INSERT TO authenticated WITH CHECK (id = (SELECT auth.uid()));

GRANT SELECT, INSERT ON TABLE public.tgg_applicants TO authenticated;
CREATE POLICY tgg_applicant_self_read ON public.tgg_applicants
FOR SELECT TO authenticated USING (account_holder_id = (SELECT auth.uid()));
CREATE POLICY tgg_applicant_self_insert ON public.tgg_applicants
FOR INSERT TO authenticated WITH CHECK (account_holder_id = (SELECT auth.uid()));

GRANT SELECT, INSERT ON TABLE public.tgg_membership_applications TO authenticated;
CREATE POLICY tgg_application_self_read ON public.tgg_membership_applications
FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.tgg_applicants AS own
    WHERE own.id = applicant_id AND own.account_holder_id = (SELECT auth.uid())
  )
);
CREATE POLICY tgg_application_self_insert ON public.tgg_membership_applications
FOR INSERT TO authenticated WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.tgg_applicants AS own
    WHERE own.id = applicant_id AND own.account_holder_id = (SELECT auth.uid())
  )
);

-- This single invoker-rights SQL transaction creates only raw applicant/application
-- records on explicit user request. No workflow status, submission, or approval.
CREATE FUNCTION public.tgg_begin_membership_application()
RETURNS TABLE (applicant_id uuid, application_id uuid)
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  actor_id uuid := auth.uid();
  created_applicant_id uuid;
  created_application_id uuid;
BEGIN
  IF actor_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '28000';
  END IF;

  -- Accommodates Auth accounts that predate installation of the signup trigger.
  INSERT INTO public.tgg_account_holders (id)
  VALUES (actor_id)
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.tgg_applicants (account_holder_id)
  VALUES (actor_id)
  RETURNING id INTO created_applicant_id;

  INSERT INTO public.tgg_membership_applications (applicant_id)
  VALUES (created_applicant_id)
  RETURNING id INTO created_application_id;

  RETURN QUERY SELECT created_applicant_id, created_application_id;
END;
$$;
REVOKE ALL ON FUNCTION public.tgg_begin_membership_application() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.tgg_begin_membership_application() TO authenticated;

COMMIT;

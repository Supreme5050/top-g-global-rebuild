-- Top G Global REBUILD — Phase 2B/part 2
-- Run on a NEW, EMPTY Supabase project only, after reviewing the target project.
-- This foundation deliberately does not introduce application states, member ID
-- generation, membership status rules or automatic approval/conversion.
-- Access is denied for anon/authenticated until approved scoped policies exist.
BEGIN;

CREATE TABLE public.tgg_account_holders (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.tgg_applicants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_holder_id uuid NOT NULL REFERENCES public.tgg_account_holders(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.tgg_membership_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id uuid NOT NULL REFERENCES public.tgg_applicants(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.tgg_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_holder_id uuid NOT NULL REFERENCES public.tgg_account_holders(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Relationship indexes for future authenticated and scoped queries.
CREATE INDEX tgg_applicants_account_holder_idx ON public.tgg_applicants(account_holder_id);
CREATE INDEX tgg_membership_applications_applicant_idx ON public.tgg_membership_applications(applicant_id);
CREATE INDEX tgg_members_account_holder_idx ON public.tgg_members(account_holder_id);

-- Defense in depth: RLS ON with no client-facing policies => deny by default.
ALTER TABLE public.tgg_account_holders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tgg_applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tgg_membership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tgg_members ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.tgg_account_holders FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.tgg_applicants FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.tgg_membership_applications FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.tgg_members FROM PUBLIC, anon, authenticated;

COMMIT;

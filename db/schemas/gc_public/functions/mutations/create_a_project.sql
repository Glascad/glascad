DROP FUNCTION IF EXISTS create_a_project;

CREATE OR REPLACE FUNCTION gc_public.create_a_project(
    name TEXT,
    OUT project PROJECTS
)
RETURNS projects AS $$
BEGIN
    INSERT INTO projects (name, owner_id)
    VALUES (name, get_current_user_id())
    RETURNING * INTO project;
END;
$$ LANGUAGE plpgsql VOLATILE;

ALTER FUNCTION gc_public.copy_elevation SET OWNER TO pg_invoker;

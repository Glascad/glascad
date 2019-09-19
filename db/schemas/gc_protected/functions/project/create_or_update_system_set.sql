DROP FUNCTION IF EXISTS create_or_update_system_set;

CREATE OR REPLACE FUNCTION gc_public.create_or_update_system_set(system_set ENTIRE_SYSTEM_SET)
RETURNS SYSTEM_SETS AS $$
DECLARE
    ss ALIAS FOR system_set;
    uss system_sets%ROWTYPE;
BEGIN

    IF ss.id IS NULL THEN
        INSERT INTO system_sets (
            project_id,
            system_id,
            name,
            system_option_value_id
        ) VALUES (
            ss.project_id,
            ss.system_id,
            ss.name,
            ss.system_option_value_id
        )
        RETURNING * INTO uss;
    ELSE
        UPDATE system_sets SET
            project_id = COALESCE(
                ss.project_id,
                system_sets.project_id
            ),
            system_id = COALESCE(
                ss.system_id,
                system_sets.system_id
            ),
            name = COALESCE(
                ss.name,
                system_sets.name
            ),
            system_option_value_id = COALESCE(
                ss.system_option_value_id,
                system_sets.system_option_value_id
            )
        WHERE id = ss.id
        RETURNING * INTO uss;
    END IF;

    RETURN uss;

END;
$$ LANGUAGE plpgsql;

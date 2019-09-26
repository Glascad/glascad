-- DROP FUNCTION IF EXISTS update_entire_system_set;

-- CREATE OR REPLACE FUNCTION gc_public.update_entire_system_set(system_set ENTIRE_SYSTEM_SET)
-- RETURNS SYSTEM_SETS AS $$
-- DECLARE
--     ss ALIAS FOR system_set;
--     uss system_sets%ROWTYPE;
--     rov ENTIRE_RAISED_OPTION_VALUE;
--     ___ INTEGER;
--     -- sov SELECTED_OPTION_VALUE;
--     -- sdtct SELECTED_DETAIL_TYPE_CONFIGURATION_TYPE;
-- BEGIN

--     SET search_path = gc_public,gc_data,gc_protected,pg_temp_1,pg_toast,pg_toast_temp_1;

--     SELECT * FROM create_or_update_system_set(ss) INTO uss;

--     IF ss.raised_option_values IS NOT NULL THEN
--         FOREACH rov IN ARRAY ss.raised_option_values LOOP
--             SELECT 1 FROM create_or_update_raised_option_value(rov, uss) INTO ___;
--         END LOOP;
--     END IF;

--     RETURN uss;

-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;

-- ALTER FUNCTION gc_public.update_entire_system_set OWNER TO gc_invoker;

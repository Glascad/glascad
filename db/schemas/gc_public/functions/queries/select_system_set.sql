-- DROP FUNCTION IF EXISTS select_entire_system_set;

-- CREATE OR REPLACE FUNCTION gc_public.select_entire_system_set(system_set_id INTEGER)
-- RETURNS SYSTEM_SET_OUTPUT AS $$
-- DECLARE
--     ssid ALIAS FOR system_set_id;
--     ss system_sets%ROWTYPE;
--     so SYSTEM_OUTPUT;
--     ssis FLOAT;
--     selected_id INTEGER;
--     ov option_values%ROWTYPE;
--     sop SYSTEM_OPTION;
--     soo SYSTEM_OPTION_OUTPUT;
--     ssoos SYSTEM_SET_OPTION_OUTPUT[];
--     selected BOOLEAN;
--     cto CONFIGURATION_TYPE_OUTPUT;
--     scto detail_configuration_OUTPUT;
--     ssctos SYSTEM_SET_CONFIGURATION_TYPE_OUTPUT[];
--     dt DETAIL_TYPE;
--     sdto system_detail_OUTPUT;
--     ssdtos SYSTEM_SET_DETAIL_TYPE_OUTPUT[];
-- BEGIN
--     SELECT * FROM system_sets
--     INTO ss
--     WHERE system_sets.id = ssid;

--     so := select_entire_system(ss.system_id);

--     -- OPTIONS
--     IF array_length(so.system_options, 1) > 0 THEN
--         FOREACH soo IN ARRAY so.system_options
--         LOOP
--             sop := soo.system_option;

--             SELECT option_value_id FROM system_set_option_values
--             INTO selected_id
--             WHERE system_set_option_values.system_set_id = ssid
--             AND system_set_option_values.system_option_id = sop.id;

--             ssoos := ssoos || ROW(
--                 selected_id,
--                 soo.system_option,
--                 soo.option_values
--             )::SYSTEM_SET_OPTION_OUTPUT;
--         END LOOP;
--     END IF;

--     -- DETAIL TYPES
--     IF array_length(so.detail_types, 1) > 0 THEN
--         FOREACH sdto IN ARRAY so.detail_types
--         LOOP
--             dt := sdto.detail_type;
--             ssctos := NULL;

--             IF array_length(sdto.configuration_types, 1) > 0 THEN
--                 FOREACH scto IN ARRAY sdto.configuration_types
--                 LOOP
--                     cto := scto.configuration_type;
--                     selected := EXISTS (
--                         SELECT * FROM system_set_detail_type_configuration_types
--                         WHERE system_set_detail_type_configuration_types.system_set_id = ssid
--                         AND system_set_detail_type_configuration_types.detail_type_id = dt.id
--                         AND system_set_detail_type_configuration_types.configuration_type_id = cto.id
--                     );
--                     ssctos := ssctos || ROW(
--                         selected,
--                         scto
--                     )::SYSTEM_SET_CONFIGURATION_TYPE_OUTPUT;
--                 END LOOP;
--             END IF;

--             ssdtos := ssdtos || ROW(
--                 sdto.detail_type,
--                 ssctos
--             )::SYSTEM_SET_DETAIL_TYPE_OUTPUT;
--         END LOOP;
--     END IF;

--     RETURN ROW(
--         ss.id,
--         so.system,
--         ss.infill_size,
--         ssoos,
--         ssdtos
--     )::SYSTEM_SET_OUTPUT; 
-- END;
-- $$ LANGUAGE plpgsql STABLE;

DROP FUNCTION IF EXISTS create_or_update_system_configuration;

CREATE OR REPLACE FUNCTION gc_protected.create_or_update_system_configuration(
    system_configuration ENTIRE_SYSTEM_CONFIGURATION,
    system SYSTEMS,
    id_map ENTIRE_SYSTEM_ID_MAP
) RETURNS ENTIRE_SYSTEM_ID_MAP AS $$
DECLARE
    sct ALIAS FOR system_configuration;
    s ALIAS FOR system;
    usct system_configurations%ROWTYPE;
    real_id INTEGER;
    dov_id_pairs ID_PAIR[];
    -- fake system option id
    fake_dovid INTEGER;
    -- system option id
    pdovid INTEGER;
BEGIN

    -- get real parent system option value id
    dov_id_pairs := id_map.detail_option_value_id_pairs;

    pdovid := CASE WHEN sct.parent_detail_option_value_id IS NOT NULL
        THEN sct.parent_detail_option_value_id
        ELSE get_real_id(dov_id_pairs, sct.parent_detail_option_value_fake_id) END;

    IF sct.id IS NOT NULL THEN
        -- update
        UPDATE system_configurations SET
            configuration_type = CASE WHEN sct.configuration_type IS NOT NULL
                THEN sct.configuration_type
                ELSE system_configurations.configuration_type END,
            optional = CASE WHEN sct.optional IS NOT NULL
                THEN sct.optional
                ELSE system_configurations.optional END
        WHERE id = sct.id
        AND system_id = s.id;
    ELSIF sct.fake_id IS NOT NULL THEN
        -- insert and update id map
        INSERT INTO system_configurations (
            system_id,
            configuration_type,
            parent_detail_option_value_id,
            optional
        ) VALUES (
            s.id,
            sct.configuration_type,
            pdovid,
            COALESCE(sct.optional, FALSE)
        )
        RETURNING * INTO usct;

        -- add detail type id to updated id map
        id_map.system_configuration_id_pairs := id_map.system_configuration_id_pairs || ROW(
            -- link fake id to real id
            usct.id,
            sct.fake_id
        )::ID_PAIR;
    ELSE
        RAISE EXCEPTION 'Must specify detail type `id` or `fake_id`';
    END IF;

    -- UPDATE PARENT OPTION VALUE TO HAVE is_recursive: FALSE
    IF pdovid IS NOT NULL THEN
        UPDATE detail_option_values cov SET
            is_recursive = FALSE
        WHERE cov.id = pdovid;
    END IF;

    RETURN id_map;

END;
$$ LANGUAGE plpgsql;

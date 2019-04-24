DROP FUNCTION IF EXISTS select_entire_system;

CREATE OR REPLACE FUNCTION select_entire_system (system_id INTEGER)
RETURNS SYSTEM_OUTPUT 
RETURNS NULL ON NULL INPUT
AS $$
DECLARE
    sid ALIAS FOR system_id;
    s systems%ROWTYPE;
    m manufacturers%ROWTYPE;
    mo NAME_OUTPUT;
    stp system_types%ROWTYPE;
    stpo TYPE_OUTPUT;
    stg system_tags%ROWTYPE;
    stgs RECORD;
    stgos TAG_OUTPUT[];
    iss FLOAT[];
    ipss FLOAT[];
    ipt infill_pocket_types%ROWTYPE;
    ipts TYPE_OUTPUT[];
    ov option_values%ROWTYPE;
    ovos OPTION_VALUE_OUTPUT[];
    so system_options%ROWTYPE;
    soos SYSTEM_OPTION_OUTPUT[];
    sto SYSTEM_TYPE_OUTPUT;
    dt detail_types%ROWTYPE;
    dtp DETAIL_TYPE;
    dto DETAIL_TYPE_OUTPUT;
    dtos DETAIL_TYPE_OUTPUT[];
    sdto SYSTEM_DETAIL_TYPE_OUTPUT;
    sdtos SYSTEM_DETAIL_TYPE_OUTPUT[];
    ct RECORD;
    cto CONFIGURATION_TYPE_OUTPUT;
    ctos CONFIGURATION_TYPE_OUTPUT[];
    scto SYSTEM_CONFIGURATION_TYPE_OUTPUT;
    sctos SYSTEM_CONFIGURATION_TYPE_OUTPUT[];
    invalid BOOLEAN;
    sco RECORD;
BEGIN
    -- SYSTEM
    SELECT * FROM systems
    INTO s
    WHERE systems.id = sid;

    SELECT id, name FROM manufacturers
    INTO m
    WHERE manufacturers.id = s.manufacturer_id;

    -- MANUFACTURER
    mo := ROW(
        m.id,
        m.name
    )::NAME_OUTPUT;

    sto := select_entire_system_type(s.system_type_id);

    -- SYSTEM TYPE
    SELECT * FROM system_types
    INTO stp
    WHERE system_types.id = s.system_type_id;

    stpo := ROW(
        stp.id,
        stp.type
    )::TYPE_OUTPUT;

    -- SYSTEM TAGS
    IF EXISTS (
        SELECT * FROM system_system_tags
        WHERE system_system_tags.system_id = sid
    ) THEN
        FOR stg IN (
            SELECT * FROM system_tags
            WHERE system_tags.id IN (
                SELECT system_tag_id FROM system_system_tags
                WHERE system_system_tags.system_id = sid
            )
        )
        LOOP
            stgos := stgos || ROW(
                stg.id,
                stg.tag
            )::TAG_OUTPUT;
        END LOOP;
    END IF;

    -- INFILL SIZES
    SELECT infill_size FROM system_infill_sizes
    INTO iss
    WHERE system_infill_sizes.system_id = sid;

    -- INFILL POCKET SIZES
    SELECT infill_pocket_size FROM system_infill_pocket_sizes
    INTO ipss
    WHERE system_infill_pocket_sizes.system_id = sid;

    -- INFILL POCKET TYPES
    IF EXISTS (
        SELECT * FROM system_infill_pocket_types
        WHERE system_infill_pocket_types.system_id = sid
    ) THEN
        FOR ipt IN (
            SELECT * FROM infill_pocket_types
            WHERE infill_pocket_types.id IN (
                SELECT id FROM system_infill_pocket_types
                WHERE system_infill_pocket_types.system_id = sid
            )
        )
        LOOP
            ipts := ipts || ROW(
                ipt.id,
                ipt.type
            )::TYPE_OUTPUT;
        END LOOP;
    END IF;

    -- OPTIONS
    IF EXISTS (
        SELECT * FROM system_options
        WHERE system_options.system_id = sid
    ) THEN
        FOR so IN (
            SELECT * FROM system_options
            WHERE system_options.system_id = sid
        )
        LOOP
            ovos := NULL;
            IF EXISTS (
                SELECT * FROM option_values
                WHERE option_values.system_option_id = so.id
            ) THEN
                FOR ov IN (
                    SELECT * FROM option_values
                    WHERE option_values.system_option_id = so.id
                )
                LOOP
                    ovos := ovos || ROW(
                        ov.id,
                        ov.name,
                        ov.value,
                        ov.value_order
                    )::OPTION_VALUE_OUTPUT;
                END LOOP;
            END IF;
            soos := soos || ROW(
                ROW(
                    so.id,
                    so.name,
                    so.option_order,
                    so.presentation_level,
                    so.override_level
                )::SYSTEM_OPTION,
                ovos
            )::SYSTEM_OPTION_OUTPUT;
        END LOOP;
    END IF;

    -- DETAIL TYPES
    IF array_length(sto.detail_types, 1) > 0 THEN
        FOREACH dto IN ARRAY sto.detail_types
        LOOP
            sctos := NULL;
            dtp := dto.detail_type;

            IF array_length(dto.configuration_types, 1) > 0 THEN
                FOREACH cto IN ARRAY dto.configuration_types
                LOOP
                    invalid := EXISTS (
                        SELECT * FROM invalid_system_configuration_types
                        WHERE invalid_system_configuration_types.system_id = sid
                        AND invalid_system_configuration_types.invalid_configuration_type_id = cto.id
                    );

                    SELECT * FROM system_configuration_overrides
                    INTO sco
                    WHERE system_configuration_overrides.system_id = sid
                    AND system_configuration_overrides.system_type_id = s.system_type_id
                    AND system_configuration_overrides.detail_type_id = dtp.id
                    AND system_configuration_overrides.configuration_type_id = cto.id;

                    sctos := sctos || ROW(
                        invalid,
                        ROW(
                            cto.id,
                            cto.type,
                            cto.door,
                            CASE WHEN sco.required_override IS NOT NULL
                                THEN sco.required_override
                                ELSE cto.required END,
                            CASE WHEN sco.mirrorable_override IS NOT NULL
                                THEN sco.mirrorable_override
                                ELSE cto.mirrorable END,
                            CASE WHEN sco.presentation_level_override IS NOT NULL
                                THEN sco.presentation_level_override
                                ELSE cto.presentation_level END,
                            CASE WHEN sco.override_level_override IS NOT NULL
                                THEN sco.override_level_override
                                ELSE cto.override_level END
                        )::CONFIGURATION_TYPE_OUTPUT,
                        cto
                    )::SYSTEM_CONFIGURATION_TYPE_OUTPUT;
                END LOOP;
            END IF;

            sdtos := sdtos || ROW(
                dto.detail_type,
                sctos
            )::SYSTEM_DETAIL_TYPE_OUTPUT;
        END LOOP;
    END IF;

    RETURN ROW(
        ROW(
            s.id,
            s.name,
            s.depth,
            s.default_glass_size,
            s.default_glass_bite,
            s.default_sightline,
            s.top_gap,
            s.bottom_gap,
            s.side_gap,
            s.meeting_stile_gap,
            s.inset,
            s.glass_gap,
            s.shim_size,
            s.front_inset,
            mo,
            stpo,
            stgos,
            iss,
            ipss,
            ipts
        )::SYSTEM,
        soos,
        sdtos
    )::SYSTEM_OUTPUT;
END;
$$ LANGUAGE plpgsql STABLE;
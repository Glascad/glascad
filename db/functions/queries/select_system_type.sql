DROP FUNCTION IF EXISTS select_entire_system_type;

CREATE OR REPLACE FUNCTION select_entire_system_type(system_type_id INTEGER)
RETURNS SYSTEM_TYPE_OUTPUT AS $$
DECLARE
    stid ALIAS FOR system_type_id;
    st system_types%ROWTYPE;
    dt detail_types%ROWTYPE;
    ct RECORD;
    ctos CONFIGURATION_TYPE_OUTPUT[];
    dtos DETAIL_TYPE_OUTPUT[];
BEGIN
    SELECT * FROM system_types
    INTO st
    WHERE system_types.id = stid;

    RAISE NOTICE 'SELECTED SYSTEM TYPE: %', st.type;

    FOR dt IN
        SELECT * FROM detail_types
        WHERE detail_types.id IN (
            SELECT detail_type_id FROM system_type_detail_type_configuration_types
            WHERE system_type_detail_type_configuration_types.system_type_id = stid
        )
    LOOP
        ctos := NULL;
        FOR ct IN
            SELECT
                configuration_types.id,
                configuration_types.type,
                system_type_detail_type_configuration_types.required,
                system_type_detail_type_configuration_types.mirrorable,
                system_type_detail_type_configuration_types.presentation_level,
                system_type_detail_type_configuration_types.override_level
            FROM configuration_types
            INNER JOIN system_type_detail_type_configuration_types ON system_type_detail_type_configuration_types.configuration_type_id = configuration_types.id
            WHERE system_type_detail_type_configuration_types.system_type_id = stid
            AND system_type_detail_type_configuration_types.detail_type_id = dt.id
        LOOP
            ctos := ctos || ROW(
                ct.id,
                ct.type,
                ct.required,
                ct.mirrorable,
                ct.presentation_level,
                ct.override_level
            )::CONFIGURATION_TYPE_OUTPUT;
        END LOOP;
        dtos := dtos || ROW(
            dt.id,
            dt.type,
            dt.entrance,
            dt.vertical,
            ctos
        )::DETAIL_TYPE_OUTPUT;
    END LOOP;

    RETURN ROW(
        stid,
        st.type,
        dtos
    )::SYSTEM_TYPE_OUTPUT;
END;
$$ LANGUAGE plpgsql STABLE;

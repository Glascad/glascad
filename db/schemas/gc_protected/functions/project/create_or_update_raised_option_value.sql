DROP FUNCTION IF EXISTS create_or_update_raised_option_value;

CREATE OR REPLACE FUNCTION create_or_update_raised_option_value(
    raised_option_value ENTIRE_RAISED_OPTION_VALUE,
    system_set SYSTEM_SETS
) RETURNS SYSTEM_SET_RAISED_OPTION_VALUES AS $$
DECLARE
    rov ALIAS FOR raised_option_value;
    ss ALIAS FOR system_set;
    urov system_set_raised_option_values%ROWTYPE;
BEGIN

    IF rov.id IS NULL THEN
        INSERT INTO raised_option_values (
            system_set_id,
            system_id,
            option_name,
            option_value_name
        ) VALUES (
            ss.id,
            ss.system_id,
            rov.option_name,
            rov.option_value_name
        )
        RETURNING * INTO urov;
    ELSE
        UPDATE raised_option_values SET
            option_name = COALESCE(
                rov.option_name,
                raised_option_values.option_name
            ),
            option_value_name = COALESCE(
                rov.option_value_name,
                raised_option_values.option_value_name
            )
        WHERE id = rov.id
        AND system_set_id = ss.id
        AND system_id = ss.system_id
        RETURNING * INTO urov;
    END IF;

    RETURN urov;

END;
$$ LANGUAGE plpgsql;

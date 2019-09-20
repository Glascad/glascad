DROP FUNCTION IF EXISTS set_default_detail_option_value;

CREATE OR REPLACE FUNCTION gc_protected.set_default_detail_option_value(
    detail_option ENTIRE_DETAIL_OPTION,
    id_map ENTIRE_SYSTEM_ID_MAP
) RETURNS VOID AS $$
DECLARE
    _do ALIAS FOR detail_option;
BEGIN

    UPDATE detail_options
        SET default_detail_option_value_id = COALESCE(
            _do.default_detail_option_value_id,
            get_real_id(
                id_map.detail_option_value_id_pairs,
                _do.default_detail_option_value_fake_id
            )
        )
        WHERE detail_options.id = COALESCE(
            _do.id,
            get_real_id(
                id_map.detail_option_id_pairs,
                _do.fake_id
            )
        );

END;
$$ LANGUAGE plpgsql;
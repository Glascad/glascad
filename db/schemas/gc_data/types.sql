
CREATE TYPE
gc_data.entire_configuration_option_value AS (
    id INTEGER,
    fake_id INTEGER,
    name OPTION_VALUE_NAME,
    parent_configuration_option_id INTEGER,
    parent_configuration_option_fake_id INTEGER
);

CREATE TYPE
gc_data.entire_configuration_option AS (
    id INTEGER,
    fake_id INTEGER,
    name OPTION_NAME,
    parent_system_configuration_id INTEGER,
    parent_system_configuration_fake_id INTEGER,
    parent_configuration_option_value_id INTEGER,
    parent_configuration_option_value_fake_id INTEGER,
    default_configuration_option_value_id INTEGER,
    default_configuration_option_value_fake_id INTEGER
);

CREATE TYPE
gc_data.entire_system_configuration AS (
    id INTEGER,
    fake_id INTEGER,
    configuration_type CONFIGURATION_TYPE,
    optional BOOLEAN,
    parent_detail_option_value_id INTEGER,
    parent_detail_option_value_fake_id INTEGER
);

CREATE TYPE
gc_data.entire_detail_option_value AS (
    id INTEGER,
    fake_id INTEGER,
    name OPTION_VALUE_NAME,
    parent_detail_option_id INTEGER,
    parent_detail_option_fake_id INTEGER
);

CREATE TYPE
gc_data.entire_detail_option AS (
    id INTEGER,
    fake_id INTEGER,
    name OPTION_NAME,
    parent_system_detail_id INTEGER,
    parent_system_detail_fake_id INTEGER,
    parent_detail_option_value_id INTEGER,
    parent_detail_option_value_fake_id INTEGER,
    default_detail_option_value_id INTEGER,
    default_detail_option_value_fake_id INTEGER
);

CREATE TYPE
gc_data.entire_system_detail AS (
    id INTEGER,
    fake_id INTEGER,
    detail_type DETAIL_TYPE,
    parent_system_option_value_id INTEGER,
    parent_system_option_value_fake_id INTEGER
);

CREATE TYPE
gc_data.entire_system_option_value AS (
    id INTEGER,
    fake_id INTEGER,
    name OPTION_VALUE_NAME,
    raised_option_names OPTION_NAME[],
    raised_configuration_types CONFIGURATION_TYPE[],
    parent_system_option_id INTEGER,
    parent_system_option_fake_id INTEGER
);

CREATE TYPE
gc_data.entire_system_option AS (
    id INTEGER,
    fake_id INTEGER,
    name OPTION_NAME,
    parent_system_option_value_id INTEGER,
    parent_system_option_value_fake_id INTEGER,
    default_system_option_value_id INTEGER,
    default_system_option_value_fake_id INTEGER
);

CREATE TYPE
gc_data.entire_system AS (
    id INTEGER,
    name TEXT,
    manufacturer_id INTEGER,
    system_type SYSTEM_TYPE,

    system_options ENTIRE_SYSTEM_OPTION[],
    detail_options ENTIRE_DETAIL_OPTION[],
    configuration_options ENTIRE_CONFIGURATION_OPTION[],

    system_option_values ENTIRE_SYSTEM_OPTION_VALUE[],
    detail_option_values ENTIRE_DETAIL_OPTION_VALUE[],
    configuration_option_values ENTIRE_CONFIGURATION_OPTION_VALUE[],

    system_details ENTIRE_system_detail[],
    system_configurations ENTIRE_system_configuration[],

    system_option_ids_to_delete INTEGER[],
    detail_option_ids_to_delete INTEGER[],
    configuration_option_ids_to_delete INTEGER[],

    system_option_value_ids_to_delete INTEGER[],
    detail_option_value_ids_to_delete INTEGER[],
    configuration_option_value_ids_to_delete INTEGER[],

    system_detail_ids_to_delete INTEGER[],
    system_configuration_ids_to_delete INTEGER[]
);

CREATE TYPE
gc_data.entire_system_id_map AS (
    system_option_id_pairs ID_PAIR[],
    system_option_value_id_pairs ID_PAIR[],
    detail_option_id_pairs ID_PAIR[],
    detail_option_value_id_pairs ID_PAIR[],
    system_detail_id_pairs ID_PAIR[],
    configuration_option_id_pairs ID_PAIR[],
    configuration_option_value_id_pairs ID_PAIR[],
    system_configuration_id_pairs ID_PAIR[]
);
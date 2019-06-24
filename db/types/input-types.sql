
CREATE TYPE
entire_option_value AS (
    id INTEGER,
    system_option_id INTEGER,
    name TEXT,
    value FLOAT,
    value_order INTEGER,
    mirror_from_option_value_id INTEGER
);

CREATE TYPE
entire_system_option AS (
    id INTEGER,
    system_id INTEGER,
    name TEXT,
    presentation_level PRESENTATION_LEVEL,
    override_level PRESENTATION_LEVEL,
    option_order INTEGER,
    option_values ENTIRE_OPTION_VALUE[],
    option_value_ids_to_delete INTEGER[],
    configuration_type_ids INTEGER[],
    configuration_type_ids_to_delete INTEGER[]
);

CREATE TYPE
entire_system_configuration_override AS (
    system_id INTEGER,
    system_type_id INTEGER,
    detail_type_id INTEGER,
    configuration_type_id INTEGER,
    required_override BOOLEAN,
    mirrorable_override BOOLEAN,
    presentation_level_override PRESENTATION_LEVEL,
    override_level_override PRESENTATION_LEVEL
);

CREATE TYPE
entire_system AS (
    -- SYSTEM INFO
    id INTEGER,
    manufacturer_id INTEGER,
    system_type_id INTEGER,
    name TEXT,
    depth FLOAT,
    default_glass_size FLOAT,
    default_glass_bite FLOAT,
    default_sightline FLOAT,
    top_gap FLOAT,
    bottom_gap FLOAT,
    side_gap FLOAT,
    meeting_stile_gap FLOAT,
    inset FLOAT,
    glass_gap FLOAT,
    shim_size FLOAT,
    front_inset BOOLEAN,
    system_tag_ids INTEGER[],
    system_tag_ids_to_delete INTEGER[],
    -- GLAZING INFO
    infill_sizes FLOAT[],
    infill_sizes_to_delete FLOAT[],
    infill_pocket_type_ids INTEGER[],
    infill_pocket_type_ids_to_delete INTEGER[],
    infill_pocket_sizes FLOAT[],
    infill_pocket_sizes_to_delete FLOAT[],
    -- VALID TYPES
    invalid_configuration_type_ids INTEGER[],
    invalid_configuration_type_ids_to_delete INTEGER[],
    configuration_overrides ENTIRE_SYSTEM_CONFIGURATION_OVERRIDE[],
    configuration_overrides_to_delete ENTIRE_SYSTEM_CONFIGURATION_OVERRIDE[],
    -- OPTIONS
    system_options ENTIRE_SYSTEM_OPTION[],
    system_option_ids_to_delete INTEGER[]
);

CREATE TYPE
entire_elevation_container AS (
    id INTEGER,
    fake_id INTEGER,
    original BOOLEAN,
    contents TEXT,
    daylight_opening COORDINATE,
    custom_rough_opening BOOLEAN
);

CREATE TYPE
entire_container_detail AS (
    id INTEGER,
    vertical BOOLEAN,
    first_container_id INTEGER,
    first_container_fake_id INTEGER,
    second_container_id INTEGER,
    second_container_fake_id INTEGER
);

CREATE TYPE
entire_elevation AS (
    id INTEGER,
    project_id INTEGER,
    name TEXT,
    rough_opening COORDINATE,
    finished_floor_height FLOAT,
    containers ENTIRE_ELEVATION_CONTAINER[],
    container_ids_to_delete INTEGER[],
    details ENTIRE_CONTAINER_DETAIL[],
    detail_ids_to_delete INTEGER[],
    sightline FLOAT
);

CREATE TYPE
selected_option_value AS (
    option_value_id INTEGER,
    system_option_id INTEGER
);

CREATE TYPE
selected_detail_type_configuration_type AS (
    detail_type_id INTEGER,
    configuration_type_id INTEGER
);

CREATE TYPE
entire_system_set AS (
    id INTEGER,
    project_id INTEGER,
    system_id INTEGER,
    system_type_id INTEGER,
    infill_size FLOAT,
    selected_option_values SELECTED_OPTION_VALUE[],
    detail_type_configuration_types SELECTED_DETAIL_TYPE_CONFIGURATION_TYPE[],
    detail_type_configuration_types_to_unselect SELECTED_DETAIL_TYPE_CONFIGURATION_TYPE[]
);
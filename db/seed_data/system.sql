
DO $create_systems$ DECLARE ___ INTEGER; BEGIN

    <<LOOP
        NAME (Initial, Practice)
        MNFG_ID (1, 2)
    >>

        SELECT 1 FROM update_entire_system((
            -- id INTEGER,
            NULL,
            -- name TEXT,
            '<<NAME>> System',
            -- system_type SYSTEM_TYPE,
            'STOREFRONT',
            -- manufacturer_id INTEGER,
            <<MNFG_ID>>,
            -- paths_to_delete LTREE[],
            NULL,
            -- option_groups_to_delete OPTION_NAME[],
            NULL,
            -- new_option_groups OPTION_NAME[],
            ARRAY[
                'STOPS',
                'GLAZING'
            ]::OPTION_NAME[],
            -- configuration_part_ids_to_delete INTEGER[]
            NULL,
            -- , configuration_parts ENTIRE_CONFIGURATION_PART[]
            NULL,
            -- , new_configuration_parts NEW_CONFIGURATION_PART[]
            NULL,
            -- , configuration_option_values ENTIRE_CONFIGURATION_OPTION_VALUE[]
            NULL,
            -- , new_configuration_option_values NEW_CONFIGURATION_OPTION_VALUE[]
            ARRAY[
                ('UP', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS'),
                ('DOWN', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS'),
                ('UP', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS'),
                ('DOWN', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS'),
                ('STANDARD_DUTY', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY'),
                ('HIGH_PERFORMANCE', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY'),
                ('OUTSIDE', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING'),
                ('INSIDE', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING'),
                ('OUTSIDE', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.UP.GLAZING'),
                ('INSIDE', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.UP.GLAZING'),
                ('OUTSIDE', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING'),
                ('INSIDE', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING')
            ]::NEW_CONFIGURATION_OPTION_VALUE[],
            -- , configuration_options ENTIRE_CONFIGURATION_OPTION[]
            NULL,
            -- , new_configuration_options NEW_CONFIGURATION_OPTION[]
            ARRAY[
                ('STOPS', 'UP', NULL, 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD'),
                ('STOPS', 'UP', NULL, 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL'),
                ('DURABILITY', 'STANDARD_DUTY', NULL, 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR'),
                ('GLAZING', 'OUTSIDE', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN', NULL),
                ('GLAZING', 'OUTSIDE', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.UP', NULL),
                ('GLAZING', 'OUTSIDE', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN', NULL)
            ]::NEW_CONFIGURATION_OPTION[],
            -- , detail_configurations ENTIRE_DETAIL_CONFIGURATION[]
            NULL,
            -- , new_detail_configurations NEW_DETAIL_CONFIGURATION[]
            ARRAY[
                ('HEAD', NULL, 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD', FALSE),
                ('COMPENSATING_RECEPTOR', NULL, 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD', TRUE),
                ('SHIM_SUPPORT', NULL, 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD', TRUE),
                ('HORIZONTAL', NULL, 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL', FALSE),
                ('SILL', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN', NULL, FALSE),
                ('SILL', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.OUTSIDE', NULL, FALSE),
                ('SILL', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE', NULL, FALSE),
                ('SILL_FLASHING', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN', NULL, TRUE),
                ('SILL_FLASHING', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.OUTSIDE', NULL, TRUE),
                ('SHIM_SUPPORT', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN', NULL, TRUE),
                ('SHIM_SUPPORT', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.OUTSIDE', NULL, TRUE),
                ('SHIM_SUPPORT', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE', NULL, TRUE)
            ]::NEW_DETAIL_CONFIGURATION[],
            -- , detail_option_values ENTIRE_DETAIL_OPTION_VALUE[]
            NULL,
            -- , new_detail_option_values NEW_DETAIL_OPTION_VALUE[]
            ARRAY[
                ('UP', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS'),
                ('DOWN', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS'),
                ('OUTSIDE', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING'),
                ('INSIDE', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING')
            ]::NEW_DETAIL_OPTION_VALUE[],
            -- , detail_options ENTIRE_DETAIL_OPTION[]
            NULL,
            -- , new_detail_options NEW_DETAIL_OPTION[]
            ARRAY[
                ('STOPS', 'UP', NULL, 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL'),
                ('GLAZING', 'OUTSIDE', 'SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP', NULL)
            ]::NEW_DETAIL_OPTION[],
            -- , system_details ENTIRE_SYSTEM_DETAIL[]
            NULL,
            -- , new_system_details NEW_SYSTEM_DETAIL[]
            ARRAY[
                ('HEAD', 'SET.CENTER.JOINERY.SCREW_SPLINE'),
                ('HORIZONTAL', 'SET.CENTER.JOINERY.SCREW_SPLINE'),
                ('SILL', 'SET.CENTER.JOINERY.SCREW_SPLINE'),
                ('HEAD', 'SET.FRONT'),
                ('HEAD', 'SET.BACK'),
                ('HEAD', 'SET.CENTER.JOINERY.SHEAR_BLOCK'),
                ('HEAD', 'SET.CENTER.JOINERY.STICK')
            ]::NEW_SYSTEM_DETAIL[],
            -- , system_option_values ENTIRE_SYSTEM_OPTION_VALUE[]
            NULL,
            -- , new_system_option_values NEW_SYSTEM_OPTION_VALUE[]
            ARRAY[
                ('FRONT', 'SET'),
                ('CENTER', 'SET'),
                ('BACK', 'SET'),
                ('SCREW_SPLINE', 'SET.CENTER.JOINERY'),
                ('SHEAR_BLOCK', 'SET.CENTER.JOINERY'),
                ('STICK', 'SET.CENTER.JOINERY')
            ]::NEW_SYSTEM_OPTION_VALUE[],
            -- , system_options ENTIRE_SYSTEM_OPTION[]
            NULL,
            -- , new_system_options NEW_SYSTEM_OPTION[]
            ARRAY[
                ('SET', 'CENTER', NULL),
                ('JOINERY', 'SCREW_SPLINE', 'SET.CENTER')
            ]::NEW_SYSTEM_OPTION[]
        )::ENTIRE_SYSTEM)
        INTO ___;

    <<END LOOP>>

END $create_systems$;

DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS system_sets CASCADE;
DROP TABLE IF EXISTS system_set_option_values CASCADE;
DROP TABLE IF EXISTS system_set_detail_type_configuration_types CASCADE;

CREATE TABLE
projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    owner_id INTEGER REFERENCES users.users,
    last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_updated_by INTEGER REFERENCES users.users NOT NULL,
    UNIQUE (project_id, name)
);

CREATE TABLE
system_sets (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects,
    system_id INTEGER REFERENCES systems,
    system_type_id INTEGER REFERENCES system_types,
    infill_size FLOAT REFERENCES infill_sizes,
    FOREIGN KEY (
        system_id,
        system_type_id
    )
    REFERENCES systems (
        id,
        system_type_id
    ),
    FOREIGN KEY (
        system_id,
        infill_size
    )
    REFERENCES system_infill_sizes (
        system_id,
        infill_size
    ),
    UNIQUE (id, system_id, system_type_id)
);

CREATE TABLE
system_set_option_values (
    system_set_id INTEGER,
    system_id INTEGER,
    system_type_id INTEGER,
    system_option_id INTEGER,
    option_value_id INTEGER REFERENCES option_values,
    PRIMARY KEY (system_id, system_option_id),
    FOREIGN KEY (
        system_set_id,
        system_id,
        system_type_id
    )
    REFERENCES system_sets (
        id,
        system_id,
        system_type_id
    ),
    FOREIGN KEY (
        system_id,
        system_option_id
    )
    REFERENCES system_options (
        system_id,
        id
    ),
    FOREIGN KEY (
        system_option_id,
        option_value_id
    )
    REFERENCES option_values (
        system_option_id,
        id
    )
);

CREATE TABLE
system_set_detail_type_configuration_types (
    system_set_id INTEGER,
    system_id INTEGER,
    system_type_id INTEGER,
    detail_type_id INTEGER,
    configuration_type_id INTEGER,
    PRIMARY KEY (system_id, detail_type_id, configuration_type_id),
    FOREIGN KEY (
        system_set_id,
        system_id,
        system_type_id
    )
    REFERENCES system_sets (
        id,
        system_id,
        system_type_id
    )
);

CREATE TABLE
system_set_infill_sizes (
    system_set_id INTEGER,
    system_id INTEGER,
    PRIMARY KEY (system_id, infill_size),
);

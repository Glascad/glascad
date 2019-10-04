
-- SYSTEM OPTIONS

DROP FUNCTION IF EXISTS generate_system_option_path;

CREATE OR REPLACE FUNCTION gc_protected.generate_system_option_path()
RETURNS TRIGGER AS $$
BEGIN

    NEW.path := COALESCE(
        NEW.parent_system_option_value_path,
        NEW.system_id::TEXT::LTREE,
        OLD.parent_system_option_value_path,
        OLD.system_id::TEXT::LTREE
    ) || COALESCE(
        NEW.name,
        OLD.name
    )::TEXT;

    NEW.system_id := COALESCE(
        NEW.system_id,
        subltree(NEW.path, 0, 1)::TEXT::INTEGER
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_system_option_path
BEFORE INSERT OR UPDATE ON system_options
FOR EACH ROW EXECUTE FUNCTION generate_system_option_path();



-- TYPES AND OPTIONS

<<LOOP
    TYPE (detail, configuration)
    PARENT (system, detail)
>>

    -- TYPES

    DROP FUNCTION IF EXISTS generate_system_<<TYPE>>_path;

    CREATE OR REPLACE FUNCTION gc_protected.generate_system_<<TYPE>>_path()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.path := COALESCE(
            NEW.parent_<<PARENT>>_option_value_path,
            OLD.parent_<<PARENT>>_option_value_path
        ) || COALESCE(
            NEW.<<TYPE>>_type,
            OLD.<<TYPE>>_type
        )::TEXT;

        NEW.system_id := subltree(NEW.path, 0, 1)::TEXT::INTEGER;

        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER generate_system_<<TYPE>>_path
    BEFORE INSERT OR UPDATE ON system_<<TYPE>>s
    FOR EACH ROW EXECUTE FUNCTION generate_system_<<TYPE>>_path();

    -- OPTIONS

    DROP FUNCTION IF EXISTS generate_<<TYPE>>_option_path;

    CREATE OR REPLACE FUNCTION gc_protected.generate_<<TYPE>>_option_path()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.path := COALESCE(
            NEW.parent_system_<<TYPE>>_path,
            NEW.parent_<<TYPE>>_option_value_path,
            OLD.parent_system_<<TYPE>>_path,
            OLD.parent_<<TYPE>>_option_value_path
        ) || COALESCE(
            NEW.name,
            OLD.name
        )::TEXT;

        NEW.system_id := subltree(NEW.path, 0, 1)::TEXT::INTEGER;

        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER generate_<<TYPE>>_option_path
    BEFORE INSERT OR UPDATE ON <<TYPE>>_options
    FOR EACH ROW EXECUTE FUNCTION generate_<<TYPE>>_option_path();

<<END LOOP>>



-- VALUES

<<LOOP TYPE (system, detail, configuration)>>

    DROP FUNCTION IF EXISTS generate_<<TYPE>>_option_value_path;

    CREATE OR REPLACE FUNCTION gc_protected.generate_<<TYPE>>_option_value_path()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.option_name := subpath(
            COALESCE(
                NEW.parent_<<TYPE>>_option_path,
                OLD.parent_<<TYPE>>_option_path
            ),
            -1
        )::TEXT::OPTION_NAME;

        NEW.path := COALESCE(
            NEW.parent_<<TYPE>>_option_path,
            OLD.parent_<<TYPE>>_option_path
        ) || COALESCE(
            NEW.name,
            OLD.name
        )::TEXT;

        NEW.system_id := subltree(NEW.path, 0, 1)::TEXT::INTEGER;

        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER generate_<<TYPE>>_option_value_path
    BEFORE INSERT OR UPDATE ON <<TYPE>>_option_values
    FOR EACH ROW EXECUTE FUNCTION generate_<<TYPE>>_option_value_path();

<<END LOOP>>

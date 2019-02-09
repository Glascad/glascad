DROP FUNCTION IF EXISTS order_array(FLOAT[]);
DROP FUNCTION IF EXISTS order_array(TEXT[]);


CREATE OR REPLACE FUNCTION order_array (
    array_param FLOAT[]
) RETURNS SETOF ordered_array AS $$
BEGIN
    DROP TABLE IF EXISTS temp_array;
    CREATE TEMPORARY TABLE temp_array (
        id SERIAL PRIMARY KEY,
        name TEXT,
        value FLOAT
    );
    INSERT INTO temp_array (
        value
    )
    SELECT value FROM UNNEST (array_param) value;
    RETURN QUERY SELECT * FROM temp_array;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION order_array (
    array_param TEXT[]
) RETURNS SETOF ordered_array AS $$
BEGIN
    DROP TABLE IF EXISTS temp_array;
    CREATE TEMPORARY TABLE temp_array (
        id SERIAL PRIMARY KEY,
        name TEXT,
        value FLOAT
    );
    INSERT INTO temp_array (
        name
    )
    SELECT name FROM UNNEST (array_param) name;
    RETURN QUERY SELECT * FROM temp_array;
END;
$$ LANGUAGE plpgsql;
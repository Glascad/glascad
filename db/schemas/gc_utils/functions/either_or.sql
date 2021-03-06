DROP FUNCTION IF EXISTS either_or;

CREATE OR REPLACE FUNCTION gc_utils.either_or(a BOOLEAN, b BOOLEAN)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN a::INTEGER + b::INTEGER = 1;
END;
$$ LANGUAGE plpgsql STRICT IMMUTABLE;

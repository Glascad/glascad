
-- ROLES

DROP ROLE gc_admin;
DROP ROLE gc_data_entry;
DROP ROLE gc_client;

-- only run once;
-- CREATE ROLE doadmin; -- (developer) -- already exists
-- CREATE ROLE glascad WITH PASSWORD DO_GC_PASSWORD -- must run manually
CREATE ROLE gc_admin NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT;
CREATE ROLE gc_data_entry NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT;
CREATE ROLE gc_client NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT;

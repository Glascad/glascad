
-- INITIAL USERS;
DO $users$ DECLARE ___ INTEGER; BEGIN

<<LOOP USER (
    -- from .env
    <<USER_ADMIN>>,
    <<USER_CYPRESS>>,
    <<USER_ANDREW>>,
    <<USER_RAY>>,
    <<USER_WAYNE>>,
    <<USER_MARY_ANN>>
)>>

    SELECT 1 FROM create_a_user(<<USER>>) INTO ___;

<<END LOOP>>

END; $users$;

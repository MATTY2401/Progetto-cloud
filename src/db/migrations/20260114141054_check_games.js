/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    // Creazione della funzione all'interno dello schema lolbile
    if( knex.schema.hasTable('check_games'))
    { 
        await knex.raw(`

            -- FUNCTION: check_games(text[])

            -- DROP FUNCTION IF EXISTS check_games(text[]);
        CREATE OR REPLACE FUNCTION check_games(
                "array" text[])
                RETURNS boolean
                LANGUAGE 'plpgsql'
                COST 100
                VOLATILE PARALLEL UNSAFE
            AS $BODY$
            BEGIN
            
                IF "array" IS NULL THEN
                    RETURN FALSE;
                END IF;

                IF array_length("array", 1) = 0 THEN
                    return TRUE;
                END IF;

                RETURN NOT EXISTS (
                    SELECT *
                    FROM UNNEST("array") AS ref(id)       
                    LEFT JOIN games ON games.game_id = ref.id 
                    WHERE games.game_id IS NULL    
                    AND ref.id IS NOT NULL            
                );
            END;
            $BODY$;
        `);

        // Assegnazione del proprietario (owner)
        await knex.raw('ALTER FUNCTION check_games(text[]) OWNER TO admin;');
    }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

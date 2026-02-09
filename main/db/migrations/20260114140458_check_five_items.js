/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    // Creazione della funzione all'interno dello schema lolbile
    if( knex.schema.hasTable('check_five_items'))
    { 
        await knex.raw(`
            -- FUNCTION: check_five_items(text[])

            -- DROP FUNCTION IF EXISTS check_five_items(text[]);
            CREATE OR REPLACE FUNCTION check_five_items("array" text[])
                RETURNS boolean
                LANGUAGE 'plpgsql'
                COST 100
                VOLATILE PARALLEL UNSAFE
            AS $BODY$
            BEGIN
                -- Controlla se l'array è NULL
                IF "array" IS NULL THEN
                    RETURN FALSE;
                END IF;

                RETURN array_length("array", 1) = 5;
            END;
            $BODY$;
        `);
        // Assegnazione del proprietario (owner)
        await knex.raw('ALTER FUNCTION check_five_items(text[]) OWNER TO postgres;');
    }
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

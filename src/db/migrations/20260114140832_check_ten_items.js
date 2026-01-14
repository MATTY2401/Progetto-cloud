/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    // Creazione della funzione all'interno dello schema lolbile
    if( knex.schema.hasTable('check_ten_items'))
    { 
        await knex.raw(`
            -- FUNCTION: check_ten_items(text[])

            -- DROP FUNCTION IF EXISTS check_ten_items(text[]);

        CREATE OR REPLACE FUNCTION check_ten_items(
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

                RETURN array_length("array", 1) < 11;
            END;
            $BODY$;
        `);
        // Assegnazione del proprietario (owner)
        await knex.raw('ALTER FUNCTION check_ten_items(text[]) OWNER TO admin;');
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

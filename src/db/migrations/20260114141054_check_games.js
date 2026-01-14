/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    // Creazione della funzione all'interno dello schema lolbile
    await knex.raw(`
       CREATE OR REPLACE FUNCTION lolbile.check_games(
            "array" text[])
            RETURNS boolean
            LANGUAGE 'plpgsql'
            COST 100
            VOLATILE PARALLEL UNSAFE
        AS $BODY$
        BEGIN
           
            IF "array" IS NULL THEN
                RETURN TRUE;
            END IF;

            RETURN NOT EXISTS (
                SELECT *
                FROM UNNEST("array") AS ref(id)       
                LEFT JOIN lolbile.games ON games.id = ref.id 
                WHERE games.id IS NULL    
                AND ref.id IS NOT NULL            
            );
        END;
        $BODY$;
    `);

    // Assegnazione del proprietario (owner)
    await knex.raw('ALTER FUNCTION lolbile.check_games(text[]) OWNER TO admin;');
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  if( knex.schema.hasTable('summoners'))
    {
        return knex.schema.createTable('summoners', (table) => {
            table.text('user_id').notNullable().primary();
            table.text('nome').notNullable();
            table.text('soloq_rank');
            table.text('flex_rank');
            table.specificType('games', 'text ARRAY');
            table.timestamps(true,true)
        })
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

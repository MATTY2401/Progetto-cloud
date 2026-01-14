/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  if( knex.schema.hasTable('riot_users'))
    {
        return knex.schema.createTable('riot_users', (table) => {
            table.text('user_id').notNullable().primary();
            table.text('nome').notNullable();
            table.text('soloq_rank').notNullable();
            table.text('flex_rank').notNullable();
            table.specificType('partite', 'text ARRAY').notNullable();
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

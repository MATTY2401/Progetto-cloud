/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  if( knex.schema.hasTable('apex_player_cache'))
    {
        return knex.schema.createTable('apex_player_cache', (table) => {
            table.text('puid').notNullable().primary();
            table.text('nome').notNullable();
            table.integer('lp').notNullable();
            table.timestamps(true,true);
        })
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

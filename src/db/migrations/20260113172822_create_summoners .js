/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    if( knex.schema.hasTable('summoners'))
    {
        return knex.schema.createTable('summoners', (table) => {
            table.text('username').notNullable().primary();
            table.text('google_oauth').unique();
            table.text('riot_oauth').unique();
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

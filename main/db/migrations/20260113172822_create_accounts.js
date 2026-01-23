/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    if( knex.schema.hasTable('accounts'))
    {
        return knex.schema.createTable('accounts', (table) => {
            table.text('username').notNullable();
            table.text('name').notNullable();
            table.text('last_name').notNullable();
            table.text('email').notNullable();
            table.text('google_id').unique().primary();
            table.text('access_token').unique().notNullable();
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

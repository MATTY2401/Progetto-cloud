/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    if( knex.schema.hasTable('accounts'))
    {
        return knex.schema.createTable('accounts', (table) => {
            table.text('username').notNullable();
            table.text('name');
            table.text('last_name');
            table.text('email').notNullable().unique().primary();
            table.text('google_id').unique();
            table.text('password').notNullable();
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

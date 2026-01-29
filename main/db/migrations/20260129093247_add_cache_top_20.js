/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   if( knex.schema.hasTable('cache_top_20'))
    {  
        return knex.schema.createTable('cache_top_20', (table) =>{
            table.text('puid').notNullable().primary();
            table.text('nome').notNullable();
            table.integer("lp").notNullable();
        })
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

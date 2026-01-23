/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  if( knex.schema.hasTable('cron_lock'))
    {
        return knex.schema.createTable('cron_lock', (table) => {
            table.text('cronJobName').notNullable().primary().unique();
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

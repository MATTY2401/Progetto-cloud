/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.alterTable('summoners', (table) => {
        table.text('profile_icon_id').notNullable().defaultTo('0');
        table.integer('summoner_level').notNullable().defaultTo(1);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

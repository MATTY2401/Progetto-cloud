/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.alterTable('summoners', (table) => {
        table.check('check_ten_items(games)', [], 'games_matches_count_check');
        table.check('check_games(games)', [], 'games_matches_check');
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

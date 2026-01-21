/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.alterTable('games', (table) => {
        table.check('check_five_items(team_1)', [], 'games_team_1_count_check');
        table.check('check_five_items(team_2)', [], 'games_team_2_count_check');
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

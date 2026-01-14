/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  if( knex.schema.hasTable('summoners'))
    {
        return knex.schema.createTable('summoners', (table) => {
            table.text('user_id').notNullable().primary();
            table.text('nome').notNullable();
            table.text('soloq_rank').notNullable();
            table.text('flex_rank').notNullable();
            table.specificType('partite', 'text ARRAY').notNullable();
            table.timestamps(true,true)
            table.check('lolbile.check_ten_items(games)', [], 'games_matches_count_check');
            table.check('lolbile.check_validity_games(games)', [], 'games_matches_validity_check');
        })
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

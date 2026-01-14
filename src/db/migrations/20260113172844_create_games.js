/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    if( knex.schema.hasTable('games'))
    {  
        return knex.schema.createTable('games', (table) =>{
            table.text('game_id').notNullable().primary();
            table.text('gamemode').notNullable();
            table.specificType('team_1', 'text ARRAY').notNullable();
            table.specificType('team_2', 'text ARRAY').notNullable();
            table.date('date').notNullable();
            table.boolean('winner');
            table.timestamps(true,true);
            table.check('lolbile.check_five_items(team_1)', [], 'games_team_1_count_check');
            table.check('lolbile.check_five_items(team_2)', [], 'games_team_2_count_check');
        })
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

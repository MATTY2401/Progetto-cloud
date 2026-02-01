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
            table.dateTime('date', {useTz:false}).notNullable();
            table.boolean('winner');
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

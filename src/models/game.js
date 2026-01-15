const { Model } = require('objection');

class Game extends Model {
    static get tableName()
    {
        return 'games';
    }
    
    static get idColumn()
    {
        return 'game_id';
    }
}


module.exports = Game
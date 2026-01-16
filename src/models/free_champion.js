const { Model } = require('objection');

class Free_Champion extends Model {
    static get tableName()
    {
        return 'free_champions';
    }

    static get idColumn()
    {
        return 'champion_id';
    }
}


module.exports = Free_Champion
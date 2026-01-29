const { Model } = require('objection');

class Cache extends Model {
    static get tableName()
    {
        return 'cache_top_20';
    }
    static get idColumn()
    {
        return 'puuid';
    }
}


module.exports = Cache
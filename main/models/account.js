const { Model } = require('objection');

class Account extends Model {
    static get tableName()
    {
        return 'accounts';
    }
    static get idColumn()
    {
        return 'email';
    }
}


module.exports = Account
const { Model } = require('objection');

class Account extends Model {
    static get tableName()
    {
        return 'accounts';
    }
}


module.exports = Account
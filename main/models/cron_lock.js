const { Model } = require('objection');

class CronLock extends Model {
    static get tableName()
    {
        return 'cron_lock';
    }

    static get idColumn()
    {
        return 'cronJobName';
    }
}


module.exports = CronLock
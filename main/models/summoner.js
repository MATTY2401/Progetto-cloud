const { Model } = require('objection');

class Summoner extends Model {
    static get tableName()
    {
        return 'summoners';
    }

    static get idColumn()
    {
        return 'user_id';
    }

    to_JSON()
    {
        return {
            user_id: this.user_id,
            nome: this.nome,
            soloq_rank: this.soloq_rank,
            flex_rank: this.flex_rank,
            profile_icon_id: this.profile_icon_id,
            summoner_level: this.summoner_level,
            games: this.games,
        }
    }
}


module.exports = Summoner
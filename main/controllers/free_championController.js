const cron = require('cron');
const Free_champion = require('../models/free_champion')
const apiServer = require('../middleware/apiServer')

const FreeChampjob = cron.CronJob.from({
        cronTime: '0 12 * * TUE', //execute this job every tuesday at 12
        onTick: update_free_champions,
        start: true,
        runOnInit: true,
        waitForCompletion: true
});


exports.champion_rotation = async (req, res, next) => {
    //put a check for the week
    /*
        probably better to take first entry of the table check the creation date and if the
        next tuesday has been found update and return otherwise just return the id of all the entries
    */
    const champion_list = await Free_champion.query().select('champion_id');
    var champion_array = [];
    champion_list.forEach(champion => {
        champion_array.push(champion.champion_id);
    });
    res.json({response_code: 200, data: champion_array});

};



async function update_free_champions() {
    console.log('updating free champion rotation');
    const champion_date = await Free_champion.query().select('created_at');
    console.log(champion_date[0].created_at);
    const date = new Date(champion_date[0].created_at);
    const nowDate = new Date();
    const difference = nowDate - date;
    const days = (difference / (1000 * 3600 * 24)).toFixed(0);
    console.log(`Time difference is: ${days}`);
    /*
    const champion_list = await apiServer.get_free_champions();
    
    //delete the table
    console.log(champion_list.freeChampionIds);
    console.log('deleting old champs');
    await Free_champion.query().delete();
    //update the table
    console.log('inserting new champs');
    await Promise.all(champion_list.freeChampionIds.map(async (champion) => {
        await Free_champion.query().insert({
            champion_id: champion,
        });
    }))
    */
}
const cron = require('cron');
const Free_champion = require('../models/free_champion')
const CronLock = require('../models/cron_lock')
const apiServer = require('../middleware/apiServer');

const cronJobName = {
  CHECK_FREE_CHAMP: "CHECK_FREE_CHAMP",
}


const FreeChampjob = cron.CronJob.from({
        cronTime: '0 12 * * TUE', //execute this job every tuesday at 12
        onTick: update_free_champions,
        start: false,
        runOnInit: false,
        waitForCompletion: true
});

exports.startJob = () => {
    FreeChampjob.start()
    update_free_champions()
}


exports.champion_rotation = async (req, res, next) => {
    const champion_list = await Free_champion.query().select('champion_id');
    var champion_array = [];
    champion_list.forEach(champion => {
        champion_array.push(champion.champion_id);
    });
    res.status(200).json({champion_array: champion_array});

};



async function update_free_champions() {
    //check lock
    try{
        await CronLock.query().insert({cronJobName: cronJobName.CHECK_FREE_CHAMP});
        console.log('Locked resource');
        console.log('updating free champion rotation');
        const champion_date = await Free_champion.query().select('created_at');
        if(champion_date[0] === undefined)
        {
            const champion_list = await apiServer.get_free_champions();
            if( champion_list == {})
            {
                return;
            }
            await Promise.all(champion_list.freeChampionIds.map(async (champion) => {
            await Free_champion.query().insert({
                champion_id: champion,
            });
        }))
        }
        const date = new Date(champion_date[0].created_at);
        const nowDate = new Date();
        const difference = nowDate - date;
        const days = (difference / (1000 * 3600 * 24)).toFixed(0);
        console.log(`Time difference is: ${days}`);
        if(days < 7)
        {
            console.log('returning');
            return;
        }
        const champion_list = await apiServer.get_free_champions();
        if( champion_list == {})
        {
            return;
        }
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
    }catch(error){
        console.debug(`${cronJobName.CHECK_FREE_CHAMP} job already locked`, error);
    }finally{
        console.debug(`${cronJobName.CHECK_FREE_CHAMP} job finished`);
        await CronLock.query().deleteById(cronJobName.CHECK_FREE_CHAMP);
    } 

}
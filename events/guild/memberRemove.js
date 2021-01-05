const refreshUsercount = require('../../helpers/discord/refreshUserCount');
const findOrCreateServer = require('../../helpers/db/findOrCreateServer');

module.exports = async (member) => {

    //TODO fix on leaving
    const msg = await refreshUsercount(member, false);
    if(!msg){
        console.error("There was an error with memberRemove.");
    }

}

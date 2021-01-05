const refreshUsercount = require('../../helpers/discord/refreshUserCount');
module.exports = async (member) => {


    //fix weird bugss
    const msg = await refreshUsercount(member);


  };

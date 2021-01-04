const dbConnection = require("./dbConnection");
const servers = require('./dbConnection')
module.exports = async (bot) => {
    

    //const server = await servers.
    console.log(await servers.findAll());

}

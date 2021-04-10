const {Servers} = require('./dbConnection')

module.exports = async (guildid, messageId) => {

    const myserver = await servers.update({
        campusMessageId: messageId,
        where: {
            id: guildId
        }
    })

    if(process.env.DEBUG){
        if(myserver[1]){
            console.log("New server was created.");
        }else {
            console.log("Server already exists.");
        }
        console.log(myserver[0]);
    }

    if(!myserver) {
        return null;
    }

    return myserver[0];
}


const {servers, studiengang, campus, semester, ude} = require("../../helpers/db/dbConnection");

module.exports = async (reaction, user, server) => {

    console.log("got reaction");

    //checks if the received reaction is part of an older uncached message
    if(reaction.partial){

        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
            // Return as `reaction.message.author` may be undefined/null
            return;
        }
    }

    if(user.id !== process.env.BOT_ID &&  reaction.message.channel.id === server.channelId  ){
        console.log(channel);

        // handle the reaction



    }




};

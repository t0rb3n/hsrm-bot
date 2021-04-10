const {Servers, ude} = require("../../helpers/db/dbConnection");

module.exports = async (reaction, user) => {

    console.log("got reaction");
    console.log(ude);

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

    if(user.id !== process.env.BOT_ID  ){//&&  reaction.message.channel.id  ){
        console.log(channel);

        // handle the reaction

    }




};

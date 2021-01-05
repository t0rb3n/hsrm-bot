const fs = require('fs');
const env = require('dotenv').config();
const Discord = require('discord.js');


const client = new Discord.Client();
client.prefix = "!"


client.commands = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");

if (process.env.DEBUG) {
    console.log("======================================");
    console.log("\t DEBUG MODE \t");
    console.log("======================================");
}


["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on('guildMemberAdd', async member => {
    require("./events/guild/memberAdd")(member)
})

client.on('guildMemberRemove', async (message) => {
    require("./events/guild/memberRemove")(message)
})


// Logging in the bot
if (process.env.PRODUCTION) {
    client.login(process.env.BOT_TOKEN_PROD);
} else {
    client.login(process.env.BOT_TOKEN_DEV);
}

const fs = require('fs');
const env = require('dotenv').config();
const Discord = require('discord.js');
const roleClaim = require('./roles/roleClaim.js');


const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	roleClaim(client);

});

client.on('message', async message => {

	// Checks if prefix is there
	if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

	// if message occurs on server
	if (message.guild) {
		// gets the arguments in this commands
		const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
		// retrieve commandname
		const commandName = args.shift().toLowerCase();

		// if this command doesnt exist just return
		if (!client.commands.has(commandName)) return;
		// get a command object to call it
		const command = client.commands.get(commandName);

		
		try {
			command.execute(message, args);
		}
		catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
		}
	}
	else {
		// TODO handle DMs

		message.reply('I don\'t answer to DMs, just like a loyal hoe.');

	}

});


client.login(process.env.TOKEN);
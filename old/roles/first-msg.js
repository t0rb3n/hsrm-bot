const Discord = require('discord.js');
const { Tags, Emojis } = require('../dbexport.js');

const addReactions = (message, reactions) => {
	message.react(reactions[0]);
	reactions.shift();
	if (reactions.length > 0) {
		setTimeout(() => addReactions(message, reactions), 750);
	}
};


// sends a message or edits it in an empty channel
module.exports = async (client, id, reactions = []) => {
	if(id === undefined) return;

	// get the server id for this channel
	const serverid = await Tags.findAll({
		attributes: ['serverid'],
		where: {
			channel: id,
		},
	});

	const embed = new Discord.MessageEmbed()
		.setColor('#0e4aa8')
		.setTitle('Willkommen auf dem UdE-Discord Server!')
		.setAuthor('Die verfügbaren Rollen')
		.setDescription('Hier findet ihr andere Studenten der Hochschule RheinMain. Aktuell unterteilen wir den Server in die einzelnen Fachbereiche.')
		.setThumbnail('https://i.imgur.com/6UB9wpw.png')
		.setFooter('Drückt auf die entsprechenden Emojis hier unter dieser Nachricht um Teil der Gruppe zu werden');

	// Build all the emojis and strings for the given emojilist
	const emojilist = await Emojis.findAll({
		attributes: ['emojiString', 'embedText'],
		where: {
			serverid: serverid[0].serverid,
		},
	});
	// TODO two lists: one for studiengägnge one for semester
	const semesterArray = {};


	emojilist.forEach(e => {
		if(e.embedText.includes('Semester')) {
			semesterArray[e.emojiString] = e.embedText;
			return;
		}

		embed.addFields(
			{ name: e.emojiString, value:  e.embedText, inline:true },
		);
	});
	// embed.addFields( { name: '\u200B', value: '\u200B' });


	for(const key in semesterArray) {
		embed.addFields(
			{ name: key, value:  semesterArray[key], inline:true },
		);
	}

	const channel = await client.channels.fetch(id);
	// gets all messages in this given channel

	channel.messages.fetch()
		.then((messages) => {
			if (messages.size === 0) {
			// Send a new message
				channel.send(embed).then((message) => {
					addReactions(message, reactions);
				});
			}
			else {
				// if there are messages in this channel
				// look for the last message of the bot and edit it
				// if there is none create one
				const botmessages = messages.filter(m => m.author.id === process.env.BOT_ID);

				if(botmessages.size === 0) {
					channel.send(embed).then((message) => {
						addReactions(message, reactions);
					});
				}
				else {
					botmessages.last().edit(embed);
					addReactions(botmessages.last(), reactions);
				}
			}
		});
};

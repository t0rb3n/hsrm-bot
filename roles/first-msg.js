const Discord = require('discord.js');


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


	const embed = new Discord.MessageEmbed()
		.setColor('#0e4aa8')
		.setTitle('Willkommen auf dem UdE-Discord Server!')
		.setAuthor('Die verfügbaren Rollen')
		.setDescription('Hier findet ihr andere Studenten der Hochschule RheinMain. Aktuell unterteilen wir den Server in die einzelnen Fachbereiche.')
		.setThumbnail('https://i.imgur.com/KbOmm2w.jpg')
		.addFields(
			{ name: '<:mi:767107540433502248>', value: 'Medieninformatik', inline: true },
			{ name: '<:ai:767107540432846888>', value: 'Angewandte Informatik', inline: true },
			{ name: '<:wi:767107540508475392>', value: 'Wirtschaftsinformatik', inline: true },
			{ name: '<:its:767054643191873546>', value: 'Informatik - Technische Systeme', inline: true },
			{ name: '<:semester34:767107540516995162>', value: '1. oder 2. Semester', inline: true },
			{ name: '<:semester34:767107540240302091>', value: '3. oder 4. Semester', inline: true },
			{ name: '<:semester56:767107540185120831>', value: '5. oder 6. Semester', inline: true},
			{ name: '<:semester7:767107540131119115>', value: '7. Semester oder höher', inline: true },
		)
		.setFooter('Drückt auf die entsprechenden Emojis hier unter dieser Nachricht um Teil der Gruppe zu werden');

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
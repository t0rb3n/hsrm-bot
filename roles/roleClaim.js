const { DiscordAPIError } = require('discord.js');
const firstMessage = require('./first-msg');
const db = require('../dbexport.js');

module.exports = (client) => {
	// channel to write this message
	let channelID;


	// emoji to use and role name
	const emojis = {
		'🇦': 'AI',
		'🇲': 'MI',
		'🇼': 'WI',
		'1️⃣': '1/2. Semester',
		'2️⃣': '1/2. Semester',
		'3️⃣': '3/4. Semester',
		'4️⃣': '3/4. Semester',
		'5️⃣': '5/6. Semester',
		'6️⃣': '5/6. Semester',
		'7️⃣': '7.+ Semester',

	};
	// add the keys from emojis as reaction to the message
	const reactions = Object.keys(emojis);

	const emojiText = 'Add a reaction to claim a role\n\n!!!';

	firstMessage(client, channelID, emojiText, reactions);

	const handleReaction = (reaction, user, add) => {
		// id of the bot
		if (user.id === '760446089748283422') {
			return;
		}

		const emoji = reaction._emoji.name;
		const { guild } = reaction.message;

		const roleName = emojis[emoji];
		if (!roleName) {
			return;
		}

		const role = guild.roles.cache.find((role) => role.name === roleName);
		const member = guild.members.cache.find((member) => member.id === user.id);

		if (add) {
			member.roles.add(role);
		}
		else {
			member.roles.remove(role);
		}
	};

	/*  Once a user reacts to a message from the bot in specific channel
		the Bot will remove this specific reaction from the reactions
		so you might be able to fix your roles by yourself
	*/
	client.on('messageReactionAdd', async (reaction, user) => {
		// get this servers channel id
		channelID = await db.get(reaction.message.guild.id);


		if (reaction.message.channel.id === channelID && user.id != '760446089748283422') {
			handleReaction(reaction, user, true);
			client.users.cache.get(user.id).send('Your role has been updated!');


			reaction.message.channel.updateOverwrite(reaction.message.guild.roles.everyone, { ADD_REACTIONS: false, SEND_MESSAGES: false });

			const userReactions = reaction.message.reactions.cache.filter(react => react.users.cache.has(user.id));





			try {
				for (const react of userReactions.values()) {
					await react.users.remove(user.id);
				}
			}
			catch (error) {
				console.error('Failed to remove reactions.');


			}
		}
	});
	// Maybe useful at some time
	/* client.on('messageReactionRemove', (reaction, user) => {
		if (reaction.message.channel.id === channelId) {
			handleReaction(reaction, user, false);
		}
	});
	*/
};
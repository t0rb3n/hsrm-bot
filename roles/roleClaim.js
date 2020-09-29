const { DiscordAPIError } = require('discord.js');
const firstMessage = require('./first-msg');

module.exports = (client) => {
	// channel to write this message
	const channelId = '760472618322100245';


	// emoji to use and role name
	const emojis = {
		'➕': 'Test2',
		'➖': 'Test3',
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
	

	firstMessage(client, channelId, emojiText, reactions);

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

	client.on('messageReactionAdd', (reaction, user) => {
		if (reaction.message.channel.id === channelId) {
			handleReaction(reaction, user, true);
		}
	});

	client.on('messageReactionRemove', (reaction, user) => {
		if (reaction.message.channel.id === channelId) {
			handleReaction(reaction, user, false);
		}
	});
};
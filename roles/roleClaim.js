const firstMessage = require('./first-msg');

module.exports = (client, channelID, emojis) => {


	// add the keys from emojis as reaction to the message
	const reactions = Object.keys(emojis);

	firstMessage(client, channelID, reactions);

	const handleReaction = (reaction, user, add) => {
		// id of the bot
		if (user.id === process.env.BOT_ID) {
			return;
		}
		const emoji = reaction._emoji.id;
		const { guild } = reaction.message;


		const roleID = emojis[emoji];
		const role = guild.roles.cache.get(roleID);
		const studentenRolle = guild.roles.cache.find((r) => r.name === 'Student HsRm (UdE)');
		const newcomer = guild.roles.cache.find((r) => r.name === 'Neuankömmling');

		const member = guild.members.cache.find((m) => m.id === user.id);

		if (add) {
			member.roles.add(studentenRolle).catch(console.error);
			member.roles.add(role);
			member.roles.remove(newcomer);
		}
		else {
			member.roles.remove(role);
		}

		// Returning rolename so the user can be informed which role he got
		return role.name;
	};

	/*  Once a user reacts to a message from the bot in specific channel
		the Bot will remove this specific reaction from the reactions
		so you might be able to fix your roles by yourself
	*/
	client.on('messageReactionAdd', async (reaction, user) => {
		if (reaction.message.channel.id === channelID && user.id != process.env.BOT_ID) {
			const rolename = handleReaction(reaction, user, true);
			client.users.cache.get(user.id).send(`Du hast nun die Rolle ${rolename}!`);


			reaction.message.channel.updateOverwrite(reaction.message.guild.roles.everyone, { ADD_REACTIONS: false, SEND_MESSAGES: false });

			//const userReactions = reaction.message.reactions.cache.filter(react => react.users.cache.has(user.id));

			/*
			try {
				for (const react of userReactions.values()) {
					await react.users.remove(user.id);
				}
			}
			catch (error) {
				console.error('Failed to remove reactions.');


			}*/

		}
	});
	// Maybe useful at some time
	client.on('messageReactionRemove', (reaction, user) => {
		if (reaction.message.channel.id === channelID && user.id != process.env.BOT_ID) {
			handleReaction(reaction, user, false);
		}
	});

};

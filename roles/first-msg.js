const addReactions = (message, reactions) => {
	message.react(reactions[0]);
	reactions.shift();
	if (reactions.length > 0) {
		setTimeout(() => addReactions(message, reactions), 750);
	}
};
// sends a message or edits it in an empty channel
module.exports = async (client, id, text, reactions = []) => {
	if(id === undefined) return;
	const channel = await client.channels.fetch(id);
	// gets all messages in this given channel
	channel.messages.fetch()
		.then((messages) => {
			if (messages.size === 0) {
			// Send a new message
				channel.send(text).then((message) => {
					addReactions(message, reactions);
				});
			}
			else {
				// if there are messages in this channel
				// look for the last message of the bot and edit it
				// if there is none create one
				const botmessages = messages.filter(m => m.author.id === process.env.BOT_ID);

				if(botmessages.size === 0) {
					channel.send(text).then((message) => {
						addReactions(message, reactions);
					});
				}
				else {
					botmessages.last().edit(text);
					addReactions(botmessages.last(), reactions);
				}
			}
		});
};
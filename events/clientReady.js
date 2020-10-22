const roleClaim = require('../roles/roleClaim.js');
const { Tags, Emojis } = require('../dbexport.js');

module.exports = async (client) => {
	console.log('Ready!');


	// go through every channel and setup message
	const tagList = await Tags.findAll();
	tagList.forEach(async element => {

		const emojilist = await Emojis.findAll({
			attributes: ['emojiString', 'roleToGive'],
			where: {
				serverid: element.serverid,
			},
		});
		if(emojilist.length == 0) {
			return;
		}

		const emojiArray = {};
		emojilist.forEach(e => {
			// using a regex look-behind
			const id = e.emojiString.match(/(?<=:)[0-9]+/)[0];
			emojiArray[id] = e.roleToGive;
		});

		roleClaim(client, element.channel, emojiArray);
	});

};

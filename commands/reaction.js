const { Tags, Emojis } = require('../dbexport.js');
const Discord = require('discord.js');

module.exports = {
	name: 'reaction',
	description: 'Adds or removes a reaction!',
	async execute(client, message, args) {
		message.channel.send('Pong.');

		if(args.length < 4) {
			message.reply('every emoji needs a role and a embedtext');
			return;
		}

		// add a reaction
		if(args[0] === 'add') {

			// as match returns an array, we only need the first one !! not bulletproof !!
			const foundRole = args[2].match(/([0-9]+)/)[0];
			let embedText = '';
			for(let i = 0; i < args.length - 3; i++) {
				embedText += args[3 + i] + ' ';
			}

			// First check if an entry already exists
			// TODO PUT IN TRY CATCH
			const emojilist = await Emojis.findAll({
				where: {
					serverid: message.guild.id,
					emojiString: args[1],
				},
			});

			if(emojilist.length != 0) {
				message.reply('An entry for this emoji already exists. To change it, remove it first.');
				return;
			}

			try {
				// equivalent to: INSERT INTO tags (serverid,emojistring,roleToGive) values (x,x,x,);
				const emoji = await Emojis.create({
					serverid: message.guild.id,
					emojiString: args[1],
					roleToGive: foundRole,
					embedText: embedText,
				});
				message.reply('added' + args[1] + 'as reaction emoji.');
			}
			catch (e) {
				if (e.name === 'SequelizeUniqueConstraintError') {
					// update the tag accordingly
					return message.reply('SequelizeUniqueConstraintError');
				}
				return message.reply('Something went wrong with adding a tag.');
			}


		}
		else if(args[0] === 'remove') {
			// remove a reaction
			// TODO 
		}
		else{
			message.reply('Use either !reaction add or !reaction remove...');
		}
	},
};

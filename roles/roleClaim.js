const firstMessage = require('./first-msg');
const { Op } = require('sequelize');
const { Tags, Emojis } = require('../dbexport.js');
const { list } = require('pm2');

module.exports = (client, channelID, emojis) => {


	// add the keys from emojis as reaction to the message
	const reactions = Object.keys(emojis);

	firstMessage(client, channelID, reactions);

	const handleReaction = async (reaction, user, add) => {
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


		// check if both Semester and Studiengang are present. Only then give Student Role and remove Neuankömmling.
		// if they already have student role, they will not enter this condition
		if (add) {

			// either way add the role they want to have at first
			try {
				await member.roles.add(role);
			}
			catch (e) {
				console.error(e);
			}

			// then check if they NOT have student
			const memberHasStudentRole = member.roles.cache.get(studentenRolle.id);
			if(!memberHasStudentRole) {
				if (!message.member.roles.cache.some((role) => role.name === 'Master')) {
					await member.roles.add(studentenRolle);
					await member.roles.remove(newcomer);
					return role.name;
				}

				try {
					// check if they have any semester role before doing a db-call
					if(await member.roles.cache.find((r) => r.name.match(/.*(Semester).*/)) === undefined) {
						return;
					}
					// getting all Course of Studies from db
					// gets the non-semester roles from db
					// similiar to SELECT roleToGive from Emojis where serverid = guild.id AND embedText not like '%Semester%';
					const listOfCourseOfStudies = await Emojis.findAll({
						attributes: ['roleToGive'],
						where: {
							[Op.and]: [
								{ serverid: guild.id },
								{ [Op.not]:  {
									embedText: {
										[Op.substring]: '%Semester%',
									},
								},
								},
							],
						},
					});

					if(listOfCourseOfStudies.length === 0) {
						return;
					}

					// go through every CourseOfStudy on this server and check if user has one of those roles. If so, add the Student Role
					listOfCourseOfStudies.forEach(async element => {
						if(await member.roles.cache.get(element.roleToGive)) {

							await member.roles.add(studentenRolle);
							await member.roles.remove(newcomer);

						}
					});
				}
				catch (error) {
					console.error(error);
				}
			}
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
			try {
				const rolename = await handleReaction(reaction, user, true);
				await client.users.cache.get(user.id).send(`Du hast nun die Rolle ${rolename}!`);
			}
			catch (e) {
				console.error('The user ' + user.id + ' probably disabled DMs.');
				console.error(e);
				client.users.cache.get('254729585491443713').send('The user ' + user.id + ' probably disabled DMs for adding a role.');
			}

			reaction.message.channel.updateOverwrite(reaction.message.guild.roles.everyone, { ADD_REACTIONS: false, SEND_MESSAGES: false });

		}
	});
	// Maybe useful at some time
	client.on('messageReactionRemove', async (reaction, user) => {
		if (reaction.message.channel.id === channelID && user.id != process.env.BOT_ID) {

			try{
				const rolename = await handleReaction(reaction, user, false);
				await client.users.cache.get(user.id).send(`Du hast nun nicht mehr die Rolle ${rolename}!`);
			}
			catch(e) {
				console.error('The user ' + user.id + ' probably disabled DMs.');
				console.error(e);
				client.users.cache.get('254729585491443713').send('The user ' + user.id + ' probably disabled DMs for removing a role.');
			}

		}
	});

};

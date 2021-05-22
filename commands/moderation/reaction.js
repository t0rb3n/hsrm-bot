const {servers, studiengang, semester, campus, ude}  = require('../../helpers/db/dbConnection')
const { MessageEmbed, Channel, MessageAttachment } = require('discord.js')
const findOrCreateServer = require('../../helpers/db/findOrCreateServer');
const reactionAdd = require('../../events/message/reactionAdd');

module.exports = {
	name: "reaction",
	category: "moderation",
	description: "Sends the messages users can react to",
	usage: "!reaction [campus|studiengang|semester|all]",
	run: async (client, message, args) => {

		checkMemberHasPermission(message);

		console.log("Received Reaction Add command");


		//get the infos object from database
		const server = await findOrCreateServer(message.guild.id);
		if (!server) {
			message.reply("Some error while trying to access the database.");
		}

		let channel;
		if (!message.guild.channels.cache.find(channel => channel.id === server.channelId)) {
			//create a channel if none exists
			channel = await message.guild.channels.create("Rollenverteilung ", {
				type: 'text',
				permissionOverwrites: [{
					id: message.guild.id,
					deny: ['SEND_MESSAGES']
				}]
			});

			await servers.update({ channelId: channel.id }, { where: { id: message.guild.id } });

		} else {
			channel = await client.channels.fetch(server.channelId);
			// add messages to cache if channel already exists
			await channel.messages.fetch();
		}


		console.log(channel.messages.cache.size);

		let campusMessage;
		let courseMessage;
		let semesterMessage;

		if (server.campusMessageId && channel.messages.cache.find(msg => msg.id === server.campusMessageId)) {
			console.log("there is campusMessage");
			campusMessage = await channel.messages.fetch(server.campusMessageId);
			addCampusReactions(campusMessage);
		} else {

			console.log("no campusMessage");
			console.log("DBentry:" + server.campusMessageId);
			console.log("cache.find : " + channel.messages.cache.find(msg => msg.id === server.campusMessageId))

			//create campusMessage and save it to database;
			channel.send(getCampusMessageEmbed()).then(msg => {
				campusMessage = msg;
				addCampusReactions(msg);
				updateCampusMessageId(server, msg.id);
			});
		}

		if (server.courseMessageId
			&& channel.messages.cache.find(message => message.id === server.courseMessageId)) {

			console.log("there is courseMessage");

			courseMessage = await channel.messages.fetch(server.courseMessageId);
			addCourseReactions(courseMessage);

		} else {

			console.log("no courseMessage");
			//create courseMessage and save it to database;
			channel.send(getCourseMessageEmbed()).then(msg => {
				courseMessage = msg;
				addCourseReactions(msg);
				updateCourseMessageId(server, msg.id);
			});
		}

		if (server.semesterMessageId
			&& channel.messages.cache.find(message => message.id === server.semesterMessageId)) {

			console.log("there is semesterMessage");

			semesterMessage = await channel.messages.fetch(server.semesterMessageId);
			addSemesterReactions(semesterMessage);

		} else {
			console.log("no semesterMessage");

			//create courseMessage and save it to database;
			channel.send(getSemesterMessageEmbed()).then(msg => {
				semesterMessage = msg;
				addSemesterReactions(msg);
				updateSemesterMessageId(server, msg.id);
			});
		}

		// TODO send the correct emojis


	}

}


function checkMemberHasPermission(message){
	if (!message.member.permissions.has("MANAGE_MESSAGES")) {  // sets the permission
		return message.channel.send(
			`You do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
		);
	}
}


function getCampusMessageEmbed() {
	const embed = new MessageEmbed()
		.setColor('#0e4aa8')
		.setTitle('Wähle deinen Campus aus!')
		.setDescription('Wähle den Campus auf dem du studierst. Einer reicht! :) ')
		.setThumbnail('https://i.imgur.com/6UB9wpw.png')
		.setFooter('Drückt auf die entsprechenden Emojis hier unter dieser Nachricht um Teil der Gruppe zu werden.');

	return embed;
}

function getCourseMessageEmbed() {
	const embed = new MessageEmbed()
		.setColor('#0e4aa8')
		.setTitle('Wähle deinen Studiengang aus!')
		.setDescription('Wähle jetzt deinen Studiengang. Auch hier reicht einer! :) ')
		.setThumbnail('https://i.imgur.com/6UB9wpw.png')
		.setFooter('Drückt auf die entsprechenden Emojis hier unter dieser Nachricht um Teil der Gruppe zu werden.');

	return embed;
}

function getSemesterMessageEmbed() {
	const embed = new MessageEmbed()
		.setColor('#0e4aa8')
		.setTitle('Wähle dein Semester aus!')
		.setDescription('Ziemlich selbsterklärend oder? :) ')
		.setThumbnail('https://i.imgur.com/6UB9wpw.png')
		.setFooter('Drückt auf die entsprechenden Emojis hier unter dieser Nachricht um Teil der Gruppe zu werden.');

	return embed;
}

async function addCampusReactions(message) {
	//current campus are UDE,KSR,RÜ,WBS,
	const emojis = await campus.findAll({
		attributes: ['emojiString'],
		where: {
			serverId: message.guild.id
		}
	});
	await reactToMessage(emojis, message);
}


async function addCourseReactions(message) {
	//current studiengange
	const emojis = await studiengang.findAll({
		attributes: ['emojiString'],
		where: {
			serverId: message.guild.id
		}
	});
	await reactToMessage(emojis, message);
}

async function addSemesterReactions(message){
	const emojis = await semester.findAll({
		attributes: ['emojiString'],
		where: {
			serverId: message.guild.id
		}
	});
	await reactToMessage(emojis, message);
}

async function reactToMessage(emojis, message){
	for(const emoji of emojis){
		await message.react(emoji.emojiString);
	}
}




async function updateCampusMessageId(server, msgId) {
	server.campusMessageId = msgId;
	await server.save();
}
async function updateCourseMessageId(server, msgId) {
	server.courseMessageId = msgId;
	await server.save();
}
async function updateSemesterMessageId(server, msgId) {
	server.semesterMessageId = msgId;
	await server.save();
}

// acts as test playground
module.exports = {
	name: 'findstudiengang',
	description: 'tries to mention a user who has only studiengang role!',
	async execute(client, message, args) {

		let send = '';
		if(args.length > 0) {
			send = args[0];
		}
		const userArray = [];
		message.channel.send('Studenten die nur Studiengangs Rolle aber keine Semester Rolle haben:');


		message.guild.members.cache.each(member => {
			// Doesnt work with the object from above

			if(!member.roles.cache.find(r => r.name === 'Dozent')
				&& !member.roles.cache.find(r => r.name === 'Master')
				&& (member.roles.cache.find(r => r.name === 'MI')
				|| member.roles.cache.find(r => r.name === 'AI')
				|| member.roles.cache.find(r => r.name === 'ITS')
				|| member.roles.cache.find(r => r.name === 'WI')
				|| member.roles.cache.find(r => r.name === 'MM'))) {


				if(!member.roles.cache.find(r => r.name === '1/2. Semester')
					&& !member.roles.cache.find(r => r.name === '3/4. Semester')
					&& !member.roles.cache.find(r => r.name === '5/6. Semester')
					&& !member.roles.cache.find(r => r.name === '7.+ Semester')) {


					userArray.push(member.id);
				}
			}

		});
		if(userArray.length == 0) {
			message.channel.send('Es gibt keine. Yay ヽ(^o^)ノ');
		}
		userArray.forEach(async (m) => {
			message.channel.send('<@' + m + '>');
			if(send === 'send') {
				try {
					await client.users.cache.get(m).send('Hey, es scheint so als wären auf dem UdE-Discord-Server deine Rollen nicht ganz richtig. Setze dir im <#767825439208374292> -Channel doch bitte ein Semester. Danke ^-^ \nFalls du Fragen hast, kannst du im <#767825199374270524>-Channel um Hilfe bitten.');
				}
				catch(e) {
					console.error(e);
					console.log('This user probably disabled DMs.');
				}
			}

		});
	},
};

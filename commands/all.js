module.exports = {
	name: 'all',
	description: 'Print every member!',
	execute(message, args) {

		const sem12 = message.guild.roles.cache.find(r => r.name === '1/2. Semester');
		const sem34 = message.guild.roles.cache.find(r => r.name === '3/4. Semester');
		const sem56 = message.guild.roles.cache.find(r => r.name === '5/6. Semester');
		const sem7 = message.guild.roles.cache.find(r => r.name === '7.+ Semester');

		message.guild.members.cache.each(member => {
			// Doesnt work with the object from above
			// todo case that someone has multiple sem roles
			if(member.roles.cache.find(r => r.name === '1/2. Semester')) {
				member.roles.add(sem34);
				member.roles.remove(sem12);
			}
			else if(member.roles.cache.find(r => r.name === '3/4. Semester')) {
				member.roles.add(sem56);
				member.roles.remove(sem34);
			}
			else if(member.roles.cache.find(r => r.name === '5/6. Semester')) {
				member.roles.add(sem7);
				member.roles.remove(sem56);
			}

		});

	},
};
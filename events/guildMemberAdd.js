module.exports = async (member, client) => {
	try{
		const studentenRolle = await member.guild.roles.cache.find((r) => r.name === 'Neuankömmling');
		await member.roles.add(studentenRolle);
	}
	catch(e) {
		// should be in try-catch aswell but yea
		client.users.cache.get('254729585491443713').send('There was an error while trying to add a new role on guildMemberAdd!');
		console.error(e);
	}

};
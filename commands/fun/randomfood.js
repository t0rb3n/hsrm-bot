const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'randomfood',
    category: "fun",
	description: 'Delivers a random food from https://randomfood.fynf.dev',
    usage: "!randomfood",
	async execute (client, message) {
		const amount = 1;
        const foodUrl = `https://randomfood.fynf.dev/${amount}`;

		fetch(foodUrl)
			.then(response => response.json())
			.then(body => {
                const fynf = client.users.cache.get('156411557511692288');

                const embed = new MessageEmbed()
                    .setTitle('Einmal zum Mitnehmen bitte!')
                    .setColor('#c55bcd')
                    .addFields(
                        {
                            name: '🍽️ Empfehlung des Hauses',
                            value: body[0],
                            inline: true
                        }
                    )
                    .setFooter('API made with ❤️ by ' +  (!fynf ? 'Fynf' : fynf.tag));//case that we are not on ude server
                message.channel.send({embeds: [embed]});
            });
	}
};

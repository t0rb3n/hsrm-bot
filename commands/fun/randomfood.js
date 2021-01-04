const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'randomfood',
    category: "fun",
	description: 'Delivers a random food',
	run: async (client, message, args) => {
		const amount = 1;
        const foodUrl = `https://randomfood.fynf.dev/${amount}`;
        
        
		fetch(foodUrl)
			.then(response => response.json())
			.then(body =>  {
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
                    .setFooter('API made with ❤️ by' + fynf.tag);
                message.channel.send(embed);             
            });
	}
};

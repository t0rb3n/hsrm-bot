
//acts as test playground
const Tags = require('../dbexport.js');
const Discord = require('discord.js');
module.exports = {
	name: 'randomfood',
	description: 'Delivers a random food',
	async execute(client, message, args) {
        var xmlHttp = new XMLHttpRequest()
        const foodUrl = "https://randomfood.fynf.dev/1"
        xmlHttp.open("GET", foodUrl, true)
        xmlHttp.send(null)

        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                message.channel.send(JSON.parse(this.responseText)[0]);
            }
        };
	},
};


//acts as test playground
const Tags = require('../dbexport.js');
const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	name: 'randomfood',
	description: 'Delivers a random food',
	async execute(client, message, args) {
        const amount = 1
        const foodUrl = `https://randomfood.fynf.dev/${amount}`
        fetch(foodUrl)
        .then(response => response.json())
        .then(body => message.channel.send(body[0]))
	},
};

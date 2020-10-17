const Sequelize = require('sequelize');


const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: './database.sqlite',
});

const Tags = sequelize.define('tags', {
	serverid: {
		type: Sequelize.STRING,
		unique: true,
	},
	prefix: Sequelize.STRING,
	roleForAll:{
		type: Sequelize.STRING,
		defaultValue: 'admin',
	},
	roleToOptOut:{
		type: Sequelize.STRING,
		defaultValue: 'default',
	},
	channel: Sequelize.STRING,
});



Tags.sync()
	.then(() => {
		console.log('Database & tables created!');
	});

// Tags.on('error', err => console.log('Connection Error', err));
module.exports = Tags;

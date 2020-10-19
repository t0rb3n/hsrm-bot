const Sequelize = require('sequelize');

/*
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: './database.sqlite',
});
	new Sequelize('postgres://:@:5432/');

*/

const sequelize = new Sequelize('ddie8i3m9aiv64', 'ddie8i3m9aiv64', 'a21c55fdc86698481dafc386e2035d9fa3824a6ceb736839c879ee91dfcee79b', {
	host: 'ec2-34-251-118-151.eu-west-1.compute.amazonaws.com',
	dialect: 'postgres',
	port: 5432,
	logging: false,
	dialectOptions: {
		ssl: true,
	},
});


checkConnection(sequelize);


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


async function checkConnection(seq) {
	try {
		await seq.authenticate();
		console.log('Connection has been established successfully.');
	}
	catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}
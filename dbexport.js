const Sequelize = require('sequelize');
let sequelize = null;

if(process.env.PRODUCTION) {
	sequelize = new Sequelize(process.env.JAWSDB_URL);
	process.env.BOT_ID = process.env.BOT_ID_PROD;
}
else {
	sequelize = new Sequelize('database', 'user', 'password', {
		host: 'localhost',
		dialect: 'sqlite',
		logging: false,
		// SQLite only
		storage: './database.sqlite',
	});
	process.env.BOT_ID = process.env.BOT_ID_DEV;
}


checkConnection(sequelize);


const Tags = sequelize.define('tags', {
	serverid: {
		type: Sequelize.STRING,
		unique: true,
	},
	servername: Sequelize.STRING,
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

const Sequelize = require('sequelize');


const sequelize = new Sequelize('mysql://suzq657hyicuhbi5:m3dr9yqp5somru4l@ryfqldzbliwmq6g5.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/nnjy3p5ea9cau0aq');


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
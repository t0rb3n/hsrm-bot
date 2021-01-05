async function checkConnection(seq) {
    try {
        await seq.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


    const Sequelize = require('sequelize');
    let sequelize ;


    if (process.env.PRODUCTION) {
        sequelize = new Sequelize(process.env.DATABASE_URL, {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: true
            }
        });
        process.env.BOT_ID = process.env.BOT_ID_PROD;
    }
    else {
        sequelize = new Sequelize(process.env.DATABASE_URL, {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: {
                    rejectUnauthorized: false
                }
            },
            logging: process.env.DEBUG ? console.log : null
        });
    }

    checkConnection(sequelize);


    const Servers = sequelize.define('server', {
        id: {
            type: Sequelize.BIGINT,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        rolesInfo: Sequelize.JSONB,
        channelId: Sequelize.BIGINT, //the channel where reaction messages are placed
        memberCountChannel: Sequelize.BIGINT // the channel where the memberCount is shown
    },{
        timestamps: false
    });



    Servers.sync() //{force:true}
	.then(() => {
		console.log('Database & tables created!');
    });


module.exports = Servers;

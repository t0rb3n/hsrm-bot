async function checkConnection(seq) {
    try {
        await seq.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

async function getUDE(seq){
    return await Servers.findOne();
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


    const Servers = sequelize.define('servers', {
        id: {
            type: Sequelize.BIGINT,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        semesterEmoji: Sequelize.JSONB,
        studiengangEmoji: Sequelize.JSONB,
        campusEmoji: Sequelize.JSONB,
        channelId: Sequelize.BIGINT, //the channel where reaction messages are placed
        campusMessageId: Sequelize.BIGINT,
        courseMessageId: Sequelize.BIGINT,
        semesterMessageId: Sequelize.BIGINT,
        memberCountChannel: Sequelize.BIGINT // the channel where the memberCount is shown
    },{
        timestamps: false
    });



    Servers.sync() //{force:true}
	.then(() => {
		console.log('Database & tables created!');
    });





//    module.exports = { Servers, Emojis };
/*
let ude = getUDE().then((result) => {
    return result;
    //console.log(ude);
});
*/
let ude = await getUDE();

module.exports = {Servers, ude};


/*module.exports.ude = async () => {
    console.log("Bruh");
    return await getUDE();
}
*/

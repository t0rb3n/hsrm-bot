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
    return await servers.findOne();
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


    const servers = sequelize.define('Server', {
        id: {
            type: Sequelize.BIGINT,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        channelId: Sequelize.BIGINT, //the channel where reaction messages are placed
        campusMessageId: Sequelize.BIGINT,
        courseMessageId: Sequelize.BIGINT,
        semesterMessageId: Sequelize.BIGINT,
        memberCountChannel: Sequelize.BIGINT // the channel where the memberCount is shown
    },{
        timestamps: false
    });

    const studiengang = sequelize.define("Studiengang", {
        shortName: {
            type: Sequelize.STRING,
            unique: true,
            primaryKey: true
        },
        emojiString: Sequelize.STRING,
        fullName: Sequelize.STRING,
        role: Sequelize.STRING,
        serverId: {
            type: Sequelize.BIGINT,
            references: {
                model: "Servers",
                key: 'id'
            }
        }
    });

    const semester = sequelize.define("Semester", {
        shortName: {
            type: Sequelize.STRING,
            unique: true,
            primaryKey: true
        },
        emojiString: Sequelize.STRING,
        fullName: Sequelize.STRING,
        role: Sequelize.STRING,
        serverId: {
            type: Sequelize.BIGINT,
            references: {
                model: "Servers",
                key: 'id'
            }
        }
    });
    const campus = sequelize.define("Campus", {
        shortName: {
            type: Sequelize.STRING,
            unique: true,
            primaryKey: true
        },
        emojiString: Sequelize.STRING,
        fullName: Sequelize.STRING,
        role: Sequelize.STRING,
        serverId: {
            type: Sequelize.BIGINT,
            references: {
                model: "Servers",
                key: 'id'
            }
        }
    });



    //Servers.sync({force:true}) //{force:true}
    sequelize.sync()
	.then(() => {
		console.log('Database & tables created!');
    });





//    module.exports = { Servers, Emojis };

let ude = getUDE().then((result) => {
    return result;
    //console.log(ude);
});

module.exports = {servers, studiengang, campus, semester};
module.exports.ude = async () => {
    return await getUDE();
}


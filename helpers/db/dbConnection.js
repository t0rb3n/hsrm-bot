const { Model } = require('sequelize');


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
    let sequelize = null;


    if (process.env.PRODUCTION) {
        sequelize = new Sequelize(process.env.POSTGRES_URL, {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: true
            }
        });
        process.env.BOT_ID = process.env.BOT_ID_PROD;
    }
    else {
        /*
        sequelize = new Sequelize('database', 'user', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            // SQLite only
            storage: './database.sqlite',
        });
        */
        sequelize = new Sequelize(process.env.DATABASE_URL, {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: {
                    rejectUnauthorized: false  
                }
            },
            logging: console.log
        });
        //sequelize = new Sequelize(process.env.POSTGRES_URL);
        //process.env.BOT_ID = process.env.BOT_ID_DEV;


    }
    checkConnection(sequelize);


    const Server = sequelize.define('server', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        
        info: Sequelize.JSON,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });
    
    Server.sync({force:true})
	.then(() => {
		console.log('Database & tables created!');
    });


module.exports = Server;
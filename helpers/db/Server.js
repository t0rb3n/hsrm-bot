const { Model,DataTypes, Deferrable } = require("sequelize/types");

class Server extends Model{}

Server.init({
    id: {
        type: Sequelize.BIGINT,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    },
    rolesInfo: Sequelize.JSONB,
    channelId: Sequelize.BIGINT, //the channel where reaction messages are placed
    campusMessageId: Sequelize.BIGINT,
    courseMessageId: Sequelize.BIGINT,
    semesterMessageId: Sequelize.BIGINT,
    memberCountChannel: Sequelize.BIGINT // the channel where the memberCount is shown
},{
    timestamps: false

}, { sequelize });


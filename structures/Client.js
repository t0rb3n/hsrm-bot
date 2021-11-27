"use strict";
const {Client, Intents, Collection} = require("discord.js");
const {REST} = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v9");
const fs = require("fs");
const logger = require("../lib/log.js");
const {Button} = require("../lib/db");


class Udebot extends Client {
    constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
            ],
            partials: [
                "CHANNEL",
                "MESSAGE",
                "REACTION"
            ],
            presence: {status: "online"}
        });
        this.owners = [process.env.OWNER]; // Stalk3r#1708
        this.prefix = "!";
        this.studiengangButton = {};
        this.campusButton = {};
        this.commands = new Collection();
        this.categories = fs.readdirSync("./commands/");
    }

    loadEvents() {
        const eventFiles = fs.readdirSync("events").filter(file => file.endsWith(".js"));

        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
            if (!event.name) {
                logger.error(`The file \`${file}\` is missing an event name.`);
            }
            if (!event.execute) {
                logger.error(`The file \`${file}\` is missing an \`execute\` function.`);
            }
            if (event.disabled) {
                continue;
            }
            if (event.once) {
                this.once(event.name, (...args) => event.execute(...args, this));
            } else {
                this.on(event.name, (...args) => event.execute(...args, this));
            }
            logger.info(`[Client] Event loaded: ${event.name}`);
        }
    }


    loadCommands() {
        const commandFolders = fs.readdirSync("commands");

        for (const category of commandFolders) {
            const commandFiles = fs.readdirSync(`commands/${category}`);

            for (const file of commandFiles) {

                if (file.startsWith("disabled")) {
                    continue;
                }

                const command = require(`../commands/${category}/${file}`);

                if (!command.name) {
                    logger.error(`The file \`${category}/${file}\` is missing a command name.`);
                } else if (!command.execute) {
                    logger.error(`The file \`${category}/${file}\` is missing an \`execute\` function.`);
                } else {
                    command.category = category;
                }
                this.commands.set(command.name, command);
                logger.info(`[Client] Command loaded: ${command.name}`);
            }
        }
    }

    async loadRoleButtons() {
        const buttons = await Button.findAll();
        for (const button of buttons) {

            if (button.type === "campus") {
                this.campusButton[button.customId] = {
                    roleId: button.roleId,
                    label: button.label,
                }
            } else if (button.type === "studiengang") {
                this.studiengangButton[button.customId] = {
                    roleId: button.roleId,
                    label: button.label,
                }

            }
        }
    }

    async login(token) {
        this.loadEvents();
        this.loadCommands();
        await this.loadRoleButtons()
        return super.login(token).then().catch(err => logger.error(err.toString()));
    }
}

module.exports = Udebot;

"use strict";

require("dotenv").config();

const logger = require("./lib/log.js");
const Client = require("./structures/Client");
const client = new Client();

// Logging in the bot
if (process.env.PRODUCTION) {
    client.login(process.env.BOT_TOKEN_PROD).then().catch(err => logger.error(err));
} else {
    client.login(process.env.BOT_TOKEN_DEV).then().catch(err => logger.error(err));
}
process.on("unhandledRejection", err => {
    logger.error(`[Node Error] Unhandled Promise Rejection:'${err.stack}`);
});

process.on("unhandledException", err => {
    logger.error(`[Node Error] Unhandled Exception:'${err.stack}`);
});

process.on("SIGINT", () => { // CTRL+C / Kill process event
    logger.info("[Client] Shutting down...");
    client.destroy();
    logger.info("[Client] Shut down. Goodbye!");
    process.exit();
});

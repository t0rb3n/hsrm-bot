"use strict";
const logger = require("../lib/log.js");

module.exports = {
    name: "error",
    execute(error) {
        logger.error(error.stack);
    }
};

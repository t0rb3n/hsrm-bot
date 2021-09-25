/*
  PM2 Config
*/


module.exports = {
  apps : [{
    name   : "UDE BOT",
    script : "./index.js",
    env_production: {
      NODE_ENV: "PRODUCTION"
   },
   max_restarts: 10,
  }]
}

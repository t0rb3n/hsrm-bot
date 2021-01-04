
const { sql } = require("sequelize");
module.exports = (bot) => {

    //TODO create this module to create a new server entry
    readdirSync("./commands/").map(dir => {
        const commands = readdirSync(`./commands/${dir}/`).map(cmd=>{
            let pull = require(`../commands/${dir}/${cmd}`)
            console.log(`Loaded command ${pull.name}`)
            bot.commands.set(pull.name,pull)
            // didnt't make handler
            /*
            if(pull.aliases){
                pull.aliases.map(p=>bot.aliases.set(p,pull))
            }
            */
        })
    })
}
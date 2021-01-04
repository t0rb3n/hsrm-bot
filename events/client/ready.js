module.exports = client => {
    
    let botStatus = [
      "your profile rn!",
      `over ${client.users.cache.size} users!`,
      `over ${client.channels.cache.size} channels!`
  ]
  
      /*setInterval(function() {
        let status = botStatus[Math.floor(Math.random() * botStatus.length)];
        client.user.setActivity(status, {type: "WATCHING"});
  
      }, 5000)*/

      client.user.setUsername('Botus Bottinger'); // sets the bots name
      client.user.setStatus("online"); // sets the bots status

      client.user.setActivity("you!", {type: "WATCHING"});

    console.log(`${client.user.username} is now online!`); // consoles logs this when bot is turned on
     
  };
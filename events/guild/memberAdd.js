module.exports = async (member) => {
  
    // this is finding the welcome channel
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    if (!channel) return;
    
    // this is sendint the message
    channel.send(`Welcome to the server, ${member}!`); 
  
  };
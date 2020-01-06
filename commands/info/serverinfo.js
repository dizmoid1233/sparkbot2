const { RichEmbed } = require('discord.js');


module.exports = {
    name: "sinfo",
    category: "info",
    description: "Returns the Bots Latency",
    run: async(client, message, args) => {
    let sicon = message.guild.iconURL;
    let mems = message.guild.members.filter(member => !member.user.bot).size;
    let bots = message.guild.memberCount - mems;
    let onlineCount = message.guild.members.filter(m => m.presence.status === 'online').size;
    let offlineCount = message.guild.members.filter(m => m.presence.status === 'offline').size;
    let voicechans = message.client.channels.filter(c => c.type == 'voice').size;
    let textchans = message.client.channels.filter(c => c.type == 'text').size;
    var banc = new Object;
    let baned = message.guild.fetchBans().then(bans => {
        banc = Object.keys(bans).length
        console.log(banc)
      });
      
    



    let serverembed = new RichEmbed()
    .setColor(0x36393e)
    .setAuthor(`${message.guild.name} Server Info`, sicon)
    .addField("ID", message.guild.id, true)
    .addField("Owner", message.guild.owner.user.username)
    .addField("Users", `${message.guild.memberCount} total \n${mems} People | ${bots} bots\n${emoji("634148494256373785")} ${onlineCount} ${emoji("634148814156201995")} ${offlineCount}`)
    .addField("Channels", `${voicechans} 🔊 | ${textchans} ✍`)
    .addField("Roles", `${message.guild.roles.array()}`)
    .addField("region", `**${message.guild.region}**`)
    .addField("Bans", `**${banc}**`)
    .addField("Creation date", `${message.guild.createdAt}`);



    message.channel.send(serverembed);

    function emoji(id){
        return client.emojis.get(id).toString();
    }

    }
    
}
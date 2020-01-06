const { RichEmbed } = require("discord.js");

module.exports = {
    name: "skip",
    category: "music",
    description: "Returns the Bots Latency",
    run: async(client, message, args, ops) => {

        let fetched = ops.active.get(message.guild.id);

        if (!fetched) return message.channel.send("There Are 0 Songs In The Queue");
    
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You Have To Be A Server Mod To Use This Command, Command Ignored!")
    
        if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("We ARe in different voice channels ");
    
    
        ops.active.set(message.guild.id, fetched);
    
      return  fetched.dispatcher.end();
    }
}
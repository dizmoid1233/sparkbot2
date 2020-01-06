const { RichEmbed } = require("discord.js");

module.exports = {
    name: "resume",
    category: "music",
    description: "resumes music",
    run: async(client, message, args, ops) => {
      let fetched = ops.active.get(message.guild.id);

      if (!fetched) return message.channel.send("Im Not Playing Any Music, Command Ignored")
  
      if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("We are in different Voice Channels, Command Ignored!")
  
      if(!fetched.dispatcher.paused) return message.channel.send("My Music Isn't Paused");
  
      fetched.dispatcher.resume();
  
      message.channel.send(`I Have resumed **${fetched.queue[0].songTitle}** `);
       
    }
}
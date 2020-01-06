module.exports = {
    name: "pause",
    category: "music",
    description: "Returns the Bots Latency",
    run: async(client, message, args, ops) => {

        let fetched = ops.active.get(message.guild.id);

        if (!fetched) return message.channel.send("Im Not Playing Any Music, Command Ignored")
    
        if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("We are in different Voice Channels, Command Ignored!")
    
        if(fetched.dispatcher.paused) return message.channel.send("My Music Is Already Paused");
    
        fetched.dispatcher.pause();
    
        message.channel.send(`I Have Paused **${fetched.queue[0].songTitle}** For You To Listen To Later `);
    



    }
}
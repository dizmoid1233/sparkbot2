module.exports = {
    name: "stop",
    category: "music",
    description: "Returns the Bots Latency",
    run: async(client, message, args, ops) => {

        let fethched = ops.active.get(message.guild.id);
    if(!fethched) message.channel.send("there are 0 songs in the queue");

    if (!message.member.voiceChannel) return message.channel.send("You Are Not In A Voice Channel, Command Ignored")

    if (!message.guild.me.voiceChannel) return message.channel.send("Im am Not In Any Voice Channel, Command Ignored")

    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("We are in different Voice Channels, Command Ignored!")
    
    //console.log(fethched)
    
    ops.active.delete(message.guild.id);

    if (message.guild.me.voiceChannel ){
    message.guild.me.voiceChannel.leave();
    }



    }
}
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    category: "music",
    description: "Returns the Bots Latency",
    run: async(client, message, args, ops) => {

        let fetched = ops.active.get(message.guild.id);

    if (!fetched) return message.channel.send("There Are 0 Songs In The Queue");

    if(fetched.queue.length == 0 )   return message.channel.send(`**Now Playing**\n${fetched.queue[0].songTitle}`)



    let queue = fetched.queue;

    let queueemb = new RichEmbed()
    .setTitle("Sparkbot Queue")
    .setColor(0x36393e)
    .addField("**Now Playing**", queue[0].songTitle)
    .addField("**Up Next**", queue[1].songTitle)
    .setFooter("Music By Sparkbot", client.user.avatarURL);

    message.channel.send(queueemb);


    }
}
const { RichEmbed } = require('discord.js');


module.exports = {
    name: "ping",
    category: "info",
    description: "Returns the Bots Latency",
    run: async(client, message, args) => {
        const msg = await message.channel.send(`🏓 Pinging Server...`);
        
        const pingemb = new RichEmbed()
        .setColor(0x36393e)
        .setTitle("🏓 Pong! 🏓")
        .setFooter("Sparkbot Server Latency Test")
        .addField("Message Latency", "``" + Math.floor(msg.createdAt - message.createdAt) + "``ms")
        .addField("API Latency", "``" + Math.round(client.ping) + "``ms");
        
        msg.edit(pingemb);

    }
}
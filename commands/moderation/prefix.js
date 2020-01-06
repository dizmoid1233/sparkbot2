const { RichEmbed } = require("discord.js");

module.exports = {
    name: "prefix",
    category: "moderation",
    description: "Returns the Bots Latency",
    run: async(client, message, args, ops) => {
      const fs = require("fs");
      const prefixes = require("./prefix.json");
  
      if (!args[0]) return message.channel.send("You Havent Given Me a Prefix To Use");
  
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You Are Not Allowed To Change This Guilds Prefix!");
  
      
      prefixes[message.guild.id] = {
          prefix : args[0]
      }
  
      fs.writeFile("./prefix.json", JSON.stringify(prefixes, null, 4,), err =>{
          if (err) console.log(err);
      });
  
      message.channel.send(`The Servers Prefix Is Now: **${args[0]}**`);
    }
}
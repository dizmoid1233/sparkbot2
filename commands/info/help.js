const { RichEmbed } = require('discord.js');


module.exports = {
    name: "help",
    category: "info",
    description: "Returns a help message",
    run: async(client, message, args) => {
       
    if(!args[0]){
        const helpemb = new RichEmbed()
        .setTitle("**Sparkbot Help**")
        .addField("**Commands**", "Here At SparkBot We Have Multiple Commands, We Have Categorised Them For Your Ease:\n[1] - **Rhelp General** - These Are My General Commands\n[2] - **Rhelp Music** - These Are My Music Commands\n[3] - **Rhelp Moderation** - These Are my Moderation Commands")
        .setColor(0x36393e)
        .setFooter("Sparkbot", client.user.avatarURL);
  
        return message.channel.send(helpemb);
  
      }
  
      if(args[0].toLowerCase() == "general"){
  
        message.author.send("Testing Purposes")
  
  
      }
  
      if(args[0].toLowerCase() == "music"){
  
        const playemb = new RichEmbed()
        .setTitle("**Music Help**")
        .addField("**Commands**", "**[Rplay <url/String>]** - This Will Play The Youtube Link You Provide Or Will Search For Your Song.\n**[Rstop]** - This Will Stop The Music And Sparkbot Will Leave The Voice Channel.\n**[Rpause]** - This Pauses The Music.\n**[Rresume]** - This Resumes The Music.\n**[Rqueue]** - This Shows You The Curent Server Queue.\n**[Rskip]**S - This Skips The Current Song, If There Is No Song Playing Then The Bot Will Leave The Channel.")
        .setColor(0x36393e)
        .setFooter("Sparkbot", client.user.avatarURL);
  
        message.author.send(playemb);
  
  
      }
  
      if(args[0].toLowerCase() == "moderation"){
  
        message.author.send("Testing Purposes");
  
  
      }
  
  

    }
}
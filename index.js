const Discord = require('discord.js');

const fs = require('fs');
const active = new Map();
const config = require("./config.json");

const SQlite = require("better-sqlite3");
const sql = new SQlite('./commands/moderation/prefixes.sqlite');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["command"].forEach(handler => {
  require(`./handler/${handler}`)(client);
});

//Internal Command Handler For All Fancy Stuff

client.on("ready", async () => {

    console.log(`${client.user.username} is online on ${client.guilds.size} servers!`);
    console.log(`Im In These Discord Servers\n ${client.guilds.array()}`);

   client.user.setActivity(`Bot Is Online`, {type: "STREAMING"});

    console.log(config);

    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'prefixes';").get();
  if (!table['count(*)']) {
    sql.prepare("CREATE TABLE prefixes (id TEXT PRIMARY KEY, guild TEXT, prefix TEXT);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }


  client.getScore = sql.prepare("SELECT * FROM prefixes WHERE guild = ? AND prefix = ?");
  client.setScore = sql.prepare("INSERT OR REPLACE INTO prefixes (id, guild, prefix) VALUES (@id, @guild, @prefix);");
 


  });

client.on("guildCreate", async guild =>{

  let defaultChannel = "";
guild.channels.forEach((channel) => {
  if(channel.type == "text" && defaultChannel == "") {
    if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
      defaultChannel = channel;
    }
  }



})
  defaultChannel.send("Whats gucci sexy")

  let prefix;
  prefix = client.getScore.get(guild.id);

  if(!prefix){
    
  }
});



client.on("message", async message => {


let prefix = "SBD"
  
  
    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length == 0) return;

    let ops = {
      ownerID : "null",
        active: active
     }

    

    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));

    if(command){
      command.run(client, message, args, ops);
    }


  });


  // This Is for Auto Moderation Token
  client.on("message", async message => {


    if(message.author.bot) return;

    if(message.channel.type === "dm") return
    
    let swearwords = [
      "fuck",
      "shit",
      "cunt",
      "nigger"
    ];

   // for(var i = 0; i<swearwords.length; i++){
    //  if(message.content.toLocaleLowerCase().includes(swearwords[i])){
    //    message.delete();
     //   message.reply("You Are Not Allowed To Swear In This Server!");
     // }

   // }

   // if(message.content.toLocaleLowerCase().includes(swearwords)){
   //   console.log("swore" + message);
   // }


  });
//NjMzNzQwMDczNzUzMzc4ODI3.XaYy2g.uzwlq8PeXjSminB5wkku67MjYY0 -- dev id
//NTE3NjY2Mzc2NDcxODA1OTY2.D1yetw.CscYOlWetNZRI1rAZvv3BPU9gOg -- full id
  client.login("NjMzNzQwMDczNzUzMzc4ODI3.XaYy2g.uzwlq8PeXjSminB5wkku67MjYY0");

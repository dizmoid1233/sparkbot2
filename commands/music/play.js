const ytdl = require('ytdl-core');
const discord = require('discord.js');
const Youtube = require('simple-youtube-api');


const youtube = new Youtube("AIzaSyA18irKBUWvclKZFbYdwamUwemJDFXYqxY");



module.exports = {
    name: "play",
    category: "music",
    description: "Returns the Bots Latency",
    run: async(client, message, args, ops) => {
        if (!message.member.voiceChannel) return message.channel.send("You Are Not In A Voice Channel, Command Ignored")

if (!args[0]) return message.channel.send("Please Provide A Url For Me To Search, Command Ignored")

let data = ops.active.get(message.guild.id) || {};
let url = args[0];
 

if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)){
const playlist = await youtube.getPlaylist(url);
const videos = await playlist.getVideos();
for(const video of Object.values(videos)){
  const video2 = await youtube.getVideoByID(video.id);
  await handlevideo(client, message, ops, data, video2, true);
}
return message.channel.send(`Added Playlist: **${playlist.title}** To the Queue`)


}else{
  try {
     var video = await youtube.getVideo(url)
  } catch (e) {
    try {
      var search = args.join(" ");
      var videos = await youtube.searchVideos(search, 1);
      var video = await youtube.getVideoByID(videos[0].id);
    } catch (e) {
      console.log(e);
      message.channel.send("I Was Unable To Search Youtube For That Video, Sorry!")
    }
  }
  return handlevideo(client, message, ops, data, video);
}

    }
}

async function handlevideo(client, message, ops, data, video, playlist = false){

    //console.log(video);
  
   if (!data.connection) data.connection = await message.member.voiceChannel.join();
  
    if(!data.queue) data.queue = [];
  
    data.guildID = message.guild.id;
  
    data.queue.push({
      songTitle: video.title,
      requester: message.author.tag,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      announceChannel: message.channel.id
    });
  
   if(!data.dispatcher){ play(client, ops, data)
   }else {
  
      if(playlist) return undefined;
      else return message.channel.send("Added: **" + video.title + "** To The Queue");
   }
  
  
    ops.active.set(message.guild.id, data);
  
  
  }

  async function play(client, ops, data){

    let nowplayingemb = new discord.RichEmbed()
   .setTitle("**Now Playing**")
    .addField("**Song Title**", data.queue[0].songTitle)
    .addField("**Song Link**", data.queue[0].url)
   .addField("**Song Added By**", data.queue[0].requester)
    .setColor(0x36393e)
    .setFooter("Music By Sparkbot", client.user.avatarURL);
  
    let url = data.queue[0].url;
  
  client.channels.get(data.queue[0].announceChannel).send(nowplayingemb);
  
  
  
  
  data.dispatcher = await data.connection.playStream(ytdl(url, {filter: "audioonly"}));
  data.dispatcher.guildID = data.guildID;
  
  
  data.dispatcher.on('end', () => {
  
  finish(client, ops, data.dispatcher, data.queue[0].announceChannel);
  
  });
  
  
  
  
  }

  function finish(client, ops, dispatcher, balls){

    let fetched = ops.active.get(dispatcher.guildID);
    if (!fetched) {
      let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;
      if(vc) vc.leave();
      client.channels.get(balls).send("Playback Complete, Leaving Voice Channel");
      
    }else{
      fetched.queue.shift();
  
    if(fetched.queue.length > 0){
  
      ops.active.set(dispatcher.guildID, fetched);
  
      play(client, ops, fetched);
  
  
    }else {
  
      ops.active.delete(dispatcher.guildID);
  
      let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;
  
      if(vc) vc.leave();
  
      client.channels.get(balls).send("Playback Complete, Leaving Voice Channel");
  
    }
  
    }
  
    
  
  
  
  }
  
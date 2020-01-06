const { ShardingManager } = require('discord.js');
const manager = new ShardingManager(`${__dirname}/index.js`, { totalShards: 3 });

manager.spawn();
manager.on('launch', shard => console.log(`Successfully launched shard ${shard.id}`));
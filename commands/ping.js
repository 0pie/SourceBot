const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs")
const yaml = require("js-yaml")
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))

exports.run = async (client, message, args) => {
    if(config.info.ping.enabled === true){
        const m = await message.channel.send("Ping?");
        m.edit(`:ping_pong: Pong!
        Latency is ${m.createdTimestamp - message.createdTimestamp}ms. Discord Latency is ${Math.round(client.ping)}ms`);
    }else{ return; }
};
exports.help = {
    name: "ping",
    aliases: config.info.ping.aliases
};
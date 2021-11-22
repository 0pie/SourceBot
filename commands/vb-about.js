const Discord = require("discord.js");
const client = new Discord.Client();
const yaml = require("js-yaml")
const fs = require("fs")
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))

exports.run = async (client, message, args) => {
    try {
        message.channel.send(`This server is running SourceBot!\nVersion: ${config.bot.version}\nBot latency is ${message.createdTimestamp - message.createdTimestamp}ms.\nDiscord API Latency is ${Math.round(client.ping)}ms\n\nVodkaBot - By Ufero Team`)
            .then(msg => {
                msg.delete(5000);
            });
    } catch (error) {
        console.warn(error);
    }
};
exports.help = {
    name: "vb-about",
    aliases: []
};
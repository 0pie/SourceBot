const Discord = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const embeds = require("../modules/embeds.js");

module.exports.run = async (client, message, args) => {
    if(config.info.uptime.enabled === false) { return; }
    var total, days, hours, minutes, seconds;
    total = (client.uptime / 1000);
    days = Math.floor(total / 86400);
    hours = Math.floor(total / 3600);
    total %= 3600;
    minutes = Math.floor(total / 60);
    seconds = total % 60;

    if(config.core.embeds === false) { return message.channel.send(`The bot has been running for: ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`); }
    let embed = new Discord.RichEmbed()
    .setAuthor("Uptime")
    .setColor("#ff00dc")
    .setDescription("The bot has been running for")
    .addField("days", days, true)
    .addField("hours", hours, true)
    .addField("minutes", minutes, true)
    .addField("seconds", seconds, true);
    return message.channel.send(embed);
};
module.exports.help = {
    name: "uptime",
    aliases: config.info.uptime.aliases
};
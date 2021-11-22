const Discord = require("discord.js");
const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

module.exports.run = async (client, message, args) => {
    if (config.misc.memberCount.enabled === true) {
        message.delete();

        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        if (config.core.embeds === true) {
            let embed = new Discord.RichEmbed()
                .setAuthor(`${message.guild.name} Member Count`)
                .setColor(randomColor)
                .addField("Total Members:", message.guild.memberCount, true)
                .setTimestamp()
            message.channel.send(embed)
        } else {
            message.reply(`${message.guild.name} has ${message.guild.memberCount} members`);
        }
    }
};
module.exports.help = {
    name: "membercount",
    aliases: config.misc.memberCount.aliases
};
const Discord = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

module.exports.run = async (bot, message, args) => {
    if (config.info.serverID.enabled === true) {
        if (config.core.embeds === true) {
            var randomColor = Math.floor(Math.random() * 16777215).toString(16);

            let embed = new Discord.RichEmbed()
                .setAuthor("Server ID")
                .setColor(`#${randomColor}`)
                .addField("ID:", message.guild.id)
                .setTimestamp();
            message.channel.send(embed);
        } else {
            return message.reply(`The ID of this guild is: ${message.guild.id}`);
        }
    }
};
module.exports.help = {
    name: "serverid",
    aliases: config.info.serverID.aliases
};
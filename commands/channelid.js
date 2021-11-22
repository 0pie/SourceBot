const Discord = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

module.exports.run = async (bot, message, args) => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    var channel;
    channel = message.mentions.channels.first();

    if (config.info.channelID.enabled === true) {
        if (!channel) {
            channel = message.channel;
        }

        if (config.core.embeds === true) {
            let embed = new Discord.RichEmbed()
                .setAuthor("Channel ID")
                .setColor(`#${randomColor}`)
                .addField("Channel Name:", channel, true)
                .addField("Channel ID", channel.id, true);
            message.channel.send(embed);
        } else {
            return message.reply(`The ID of the channel ${channel} is: ${channel.id}`);
        }
    }
};
module.exports.help = {
    name: "channelid",
    aliases: config.info.channelID.aliases
};
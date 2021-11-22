const Discord = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

module.exports.run = async (bot, message, args) => {
    if (config.info.userID.enabled === true) {
        let user = message.mentions.users.first();

        if (!user) {
            if (config.core.embeds === true) {
                let embed = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username}'s ID`)
                    .setColor("#029555")
                    .addField("ID:", message.author.id, true)
                    .setTimestamp();
                message.channel.send(embed);
            } else {
                return message.reply(`Your ID is: ${message.author.id}`);
            }
        } else {
            if (config.core.embeds === true) {
                let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}'s ID`)
                    .setColor("#029555")
                    .addField("ID:", user.id, true)
                    .setTimestamp();
                message.channel.send(embed);
            } else {
                return message.reply(`Your ID is: ${user.id}`);
            }
        }
    }
};
module.exports.help = {
    name: "userid",
    aliases: config.info.userID.aliases
};
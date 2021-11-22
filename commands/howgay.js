const Discord = require("discord.js");
const client = new Discord.Client();
const yaml = require("js-yaml")
const fs = require("fs")
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))
const messages = require("../modules/messages");

exports.run = async (bot, message, args) => {
    try {
        if (config.fun.howGay.enabled === true) {
            var number = Math.floor((Math.random() * 100) + 1),
                user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!args[0]) {
                return messages.EmbedMessages(message, "HowGay Command User", number);
            }
            if (args[0] = user) {
                return messages.EmbedMessages(message, "HowGay Command Another User", user, number);
            }
        }
    } catch (error) {
        if (error) {
            console.log(error);
        }
    }
};
exports.help = {
    name: "howgay",
    aliases: config.fun.howGay.aliases
};
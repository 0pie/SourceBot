const Discord = require("discord.js");
const client = new Discord.Client();
const yaml = require("js-yaml")
const fs = require("fs")
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))
const messages = require("../modules/messages");
exports.run = async (client, message, args) => {
    try {
        if (config.general.ip.enabled === true) {
            var x = 1;
            messages.EmbedMessages(message, "IP Command Message", x, x, x, config.general.ip.messages.embed.footer);
        }
    } catch (error) {
        if (error) {
            console.log(error);
        }
    }
};
exports.help = {
    name: "ip",
    aliases: config.general.ip.aliases
};
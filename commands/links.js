const Discord = require("discord.js");
const client = new Discord.Client();
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require("../modules/messages");

exports.run = async (client, message, args) => {
    try {
        if (config.general.links.enabled === true) {
            var x = 1;
            messages.EmbedMessages(message, "Links Command Message", x, x, x, config.general.links.messages.embed.footer);
        }
    } catch (error) {
        if (error) {
            console.log(error);
        }
    }
};
exports.help = {
    name: "links",
    aliases: config.general.links.aliases
};
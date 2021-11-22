const Discord = require("discord.js");
const client = new Discord.Client();
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require("../modules/messages");

exports.run = async (bot, message, args) => {
    try{
        if(config.general.website.enabled === true){
            messages.EmbedMessages(message, "Website Command Message", config.general.website.messages.embed.footer, config.general.website.messages.embed.footer, config.general.website.messages.embed.footer, config.general.website.messages.embed.footer);
        }
    }
    catch(error){
        if(error){
            console.log(error);
        }
    }
};
exports.help = {
  name: "website",
  aliases: config.general.website.aliases
};
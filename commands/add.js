const Discord = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const embeds = require("../modules/embeds.js");

module.exports.run = async (bot, message, args) => {
    if (config.ticket.add.enabled === true) {
       if(!message.channel.name.includes("ticket-")) {
           return message.channel.send("Please run this command in the ticket.");
       }

       let channel = message.channel.name;

       let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
       if(!user) {
           return message.reply("You did not mention a user");
       }

       message.guild.channels.find(c => c.name == channel)
            .overwritePermissions(user, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
        });
        message.channel.send(`${message.author} added ${user} to ticket ${channel}`);
    }
};
module.exports.help = {
    name: "add",
    aliases: config.ticket.add.aliases
};
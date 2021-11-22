const Discord = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const embeds = require("../modules/embeds.js");

module.exports.run = async (bot, message, args) => {
    if (config.ticket.remove.enabled === true) {
        let ticketID = message.channel.name.replace("ticket-", "");

        var num = message.author.id;
        var str = num.toString();
        var authorID = str.substring(0, 6);
        authorID = parseInt(authorID);
        tID = message.guild.channels.find(c => c.name == `ticket-${authorID}`);

        const STrole = message.guild.roles.find(r => r.name == config.roles.supportTeam);
        
            if (message.member.roles.find(r => r.name === config.roles.supportTeam).id == STrole.id) {

                if(!message.channel.name.includes("ticket-")) {
                    return message.channel.send("Please run this command in the ticket.");
                }

                let channel = message.channel.name;

                let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
                
                if (!user) {
                    return message.reply("You did not tag a user!");
                
                }

                message.guild.channels.find(c => c.name == channel)
                .overwritePermissions(user, {
                    SEND_MESSAGES: false,
                    READ_MESSAGES: false
                });

                message.channel.send(`${message.author} removed ${user} from ticket ${channel}`);

            } else {
                message.reply("Sorry you cannot do this command!");
            }
        }
};
module.exports.help = {
    name: "remove",
    aliases: config.ticket.remove.aliases
};
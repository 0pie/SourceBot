const Discord = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require("../modules/messages");

module.exports.run = async (client, message, args, recievedMessage) => {
    if(config.ticket.new.enabled === false) { return; }
    // Vars
    var 
        // ID Generator
        idNumber = message.author.id,
        StringNumber = idNumber.toString(),
        TicketID = StringNumber.substring(0, 6),
        TicketID = parseInt(TicketID),

        // Things
        reason = message.content.split(" ").slice(1).join(" "),

        // Roles
        SupportTeamRole = config.roles.supportTeam;

        let Everyone = message.guild.roles.find(r => r.name.toLowerCase() == "@everyone");

        if(!message.guild.roles.find(r => r.name.toLowerCase() == config.roles.supportTeam.toLowerCase())){
            return message.channel.send(`This server doesn't have a ${SupportTeamRole} role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
        } else {
            SupportTeamRole = message.guild.roles.find(r => r.name.toLowerCase() === config.roles.supportTeam.toLowerCase());
        }

        if(message.guild.channels.find(c => c.name.toLowerCase() == `ticket-${TicketID}`)){
            if (config.core.embeds === true) {
                let TicketChannel = message.guild.channels.find(c => c.name.toLowerCase() == `ticket-${TicketID}`);
                return messages.EmbedMessages(message, "Ticket Already Open", message.author.tag, TicketChannel.id);
             } else {
                 return message.channel.send(config.ticket.new.messages.ticketAlreadyOpen.message.replace(/{ticket}/g, `#ticket-${TicketID}`));
             }

        }else{
            message.guild.createChannel(`ticket-${TicketID}`, { type: "text" }).then(ticket => {
                ticket.overwritePermissions(SupportTeamRole, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true
                });
                ticket.overwritePermissions(Everyone, {
                    SEND_MESSAGES: false,
                    READ_MESSAGES: false
                });
                ticket.overwritePermissions(message.author, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true
                });
    
                messages.EmbedMessages(message, "Ticket Created", ticket);
    
                let embed = new Discord.RichEmbed()
                .setColor(config.ticketSystem.messages.ticketWelcomeMessage.embed.color)
                .setDescription(`**${config.ticketSystem.messages.ticketWelcomeMessage.message.replace(/{user}/g, `@${message.author.tag}`)}**`)
                .setTimestamp()
                ticket.send(embed);
            
                ticket.send(`<@${message.author.id}>`).then(msg => {
                msg.delete(0);
                });
            });
        }
    }
module.exports.help = {
    name: "new",
    aliases: config.ticket.new.aliases
}
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require("./logs");

module.exports = {
    playerAction: function (message, action, sender, target, reason) {
        if (config.allmessagesin_embeds === true) {
            switch (action) {
                case "Ban":
                    let banEmbed = new Discord.RichEmbed()
                        .setAuthor(`${config.Ban_Command_Embed_Title}`)
                        .setColor(`${config.Ban_Command_Embed_Color}`)
                        .addField("Staff Member", `<@${sender}>`)
                        .addField("User Banned", `<@${target}>`)
                        .addField("Reason", `${reason}`)
                        .setFooter(`${config.embed_footer}`);
                    return message.guild.channels.find(c => c.name == `${config.logs_channel}`).send(banEmbed);
                case "Blacklist":
                    let blacklistEmbed = new Discord.RichEmbed()
                        .setAuthor(`${config.moderation.poll.messages.log.embed.title}`)
                        .setColor(`${config.moderation.poll.messages.log.embed.color}`)
                        .addField("Staff Member", `<@${sender}>`)
                        .addField("User Blacklisted", `${target}`)
                        .addField("Reason", `${reason}`)
                        .setFooter(`${config.blacklistcommand_embed_footer}`);
                    return message.guild.channels.find(c => c.name == `${config.logs_channel}`).send(blacklistEmbed);
            }
        }
    },
    logAction: function (message, action, sender, reason, channel) {
        var embeds;
        if(config.messages.embed.override === true) {
            embeds = config.messages.embed.footer;
        } else {
            embeds = channel;
        }

        if (config.allmessagesin_embeds === true) {
            switch (action) {
                case "Poll Created":
                    let pollEmbed = new Discord.RichEmbed()
                        .setAuthor(config.moderation.poll.messages.log.embed.title)
                        .setColor(config.moderation.poll.messages.log.embed.color)
                        .addField("Executor", `<@${sender}>`)
                        .addField("Poll", reason)
                        .setFooter(`${embeds}`);
                    try{
                    return message.guild.channels.find(c => c.name == `${config.channel.logs}`).send(pollEmbed);
                    }
                    catch(error){
                        if(error){
                            return messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.logs, config.messages.channelNotFound.embed.footer, config.messages.channelNotFound.embed.footer);
                        }
                    }
                    
                case "Purge":
                    let purgeEmbed = new Discord.RichEmbed()
                        .setAuthor(`${config.Purge_Log_Embed_Title}`)
                        .setColor(`${config.Purge_Log_Embed_Color}`)
                        .addField("Executor", `<@${sender}>`)
                        .addField("Deleted", `${reason}`)
                        .setFooter(`${config.embed_footer}`);
                    return message.guild.channels.find(c => c.name == `${config.logs_channel}`).send(purgeEmbed);
                case "CLock":
                    let clockEmbed = new Discord.RichEmbed()
                        .setAuthor(`${config.lockchannel_embed_title}`)
                        .setColor(`${config.lockchannel_embed_color}`)
                        .setDescription(`${reason} has been unlocked`)
                        .setFooter(`${config.lockchannel_footer}`);
                    return message.channel.send(clockEmbed);

                case "CUnlock":
                    let CunlockEmbed = new Discord.RichEmbed()
                        .setAuthor(`${config.unlockchannel_embed_title}`)
                        .setColor(`${config.unlockchannel_embed_color}`)
                        .setDescription("This channel has now been unlocked.")
                        .setFooter(`${config.unlockchannel_embed_footer}`);
                    return message.channel.send(CunlockEmbed);

                case "Lock":
                    let lockEmbed = new Discord.RichEmbed()
                        .setAuthor(`${config.lockchannel_log_embed_title}`)
                        .setColor(`${config.lockchannel_log_embed_color}`)
                        .addField("Executor", `<@${message.author.id}>`)
                        .addField("Channel locked", `${channel}`)
                        .addField("Reason", `${reason}`)
                        .setFooter(`${config.embed_footer}`);
                    return message.guild.channels.find(c => c.name == `${config.logs_channel}`).send(lockEmbed);

                case "Unlock":
                    let unlockEmbed = new Discord.RichEmbed()
                        .setAuthor(`${config.Unlock_Channel_Log_Embed_Title}`)
                        .setColor(`${config.Unlock_Channel_Log_Embed_Color}`)
                        .addField("Executor", `<@${message.author.id}>`)
                        .addField("Channel locked", `${reason}`)
                        .setFooter(`${config.embed_footer}`);
                    return message.guild.channels.find(c => c.name == `${config.logs_channel}`).send(unlockEmbed);

                case "Unban":
                    let unbanEmbed = new Discord.RichEmbed()
                        .setAuthor(config.Unban_Command_Log_Embed_Title)
                        .setColor(config.Unban_Command_Log_Embed_Color)
                        .addField("Executor", `<@${sender}>`)
                        .addField("User", `<${reason}>`)
                        .setFooter(config.embed_footer);
                    return message.guild.channels.find(c => c.name == `${config.logs_channel}`).send(unbanEmbed);

                case "Unblacklist":
                    let unblacklistEmbed = new Discord.RichEmbed()
                        .setAuthor(`${config.Unblacklist_Command_Logs_Embed_Title}`)
                        .setColor(`${config.Unblacklist_Command_logs_Embed_Color}`)
                        .addField("Executor", `<@${sender}>`)
                        .addField("User", `<@${reason}>`)
                        .setFooter(`${config.embed_footer}`);
                    return message.guild.channels.find(c => c.name == `${config.logs_channel}`).send(unblacklistEmbed);
                case "Announcement":
                    let announceEmbed = new Discord.RichEmbed()
                        .setAuthor(`${config.Announce_Log_Embed_Title}`)
                        .setColor(`${config.Announce_Log_Embed_Color}`)
                        .addField("Executor", `<@${sender}>`)
                        .addField("Announcement", `${reason}`)
                        .setFooter(`${config.embed_footer}`);
                    return message.guild.channels.find(c => c.name == `${config.logs_channel}`).send(announceEmbed);

                case "Role Created":
                    let Role_Created = new Discord.RichEmbed()
                    .setAuthor(`Action | Role Created`)
                    .setColor("#099aA0")
                    .addField("Executor", `<@${sender}>`)
                    .addField("Role Name", `${reason}`)
                    .addField("Role Color", `${channel}`)
                    .setFooter(config.embed_footer)
                    return message.guild.channels.find(c => c.name == config.logs_channel).send(Role_Created);

                case "Channel Deleted":
                    let Channel_Deleted = new Discord.RichEmbed()
                    .setAuthor(`Action | Channel Deleted`)
                    .setColor(`#098aed`)
                    .addField("Executor", `<@${sender}>`)
                    .addField("Channel Name", `<#${reason}>`)
                    .addField("Channel ID", `${reason}`)
                    .setFooter(config.embed_footer)
                    return message.guild.channels.find(c => c.name === config.logs_channel).send(Channel_Deleted);

                case "Role Deleted":
                    let Role_Deleted = new Discord.RichEmbed()
                    .setAuthor(`Action | Role Deleted`)
                    .setColor(`#098aed`)
                    .addField("Executor", `<@${sender}>`)
                    .addField("Role Deleted", `<@${reason}>`)
                    .setFooter(config.embed_footer)
                    return message.guild.channels.find(c => c.name === config.logs_channel).send(Role_Deleted);

                case "Filter System Word Added":
                    let Filter_System_Word_Added = new Discord.RichEmbed()
                    .setAuthor("Action | Word Added To Filter")
                    .setColor("#089ade")
                    .addField("Executor", `<@${sender}>`)
                    .addField("Word", `${reason}`)
                    return message.guild.channels.find(c => c.name === config.logs_channel).send(Filter_System_Word_Added);

                case "Say Command":
                    let Say_Command = new Discord.RichEmbed()
                    .setAuthor("Action | Message Said")
                    .setColor("089aed")
                    .addField("Executor", `<@${sender}>`)
                    .addField("Channel", `<#${Channel}>`)
                    .addField("Message", `${reason}`)
                    .setFooter(config.embed_footer)
                    return message.guild.channels.find(c => c.name === config.logs_channel).send(Say_Command);
            }
        }
    }
};
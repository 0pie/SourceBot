const Discord = require("discord.js");
const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const logs = require('../modules/logs');
const messages = require("../modules/messages");

module.exports.run = async (client, message, args) => {
    if (config.moderation.deleteChannel.enabled === true) {
        if (message.member.roles.find(r => r.name === config.moderation.deleteChannel.permissionRole)) {
            let channel = message.channel;
            var embeds3;
            if (config.messages.embed.override === true) {
                embeds3 = config.messages.embed.footer;
            } else {
                embeds3 = config.moderation.deleteChannel.messages.log.embed.footer;
            }
            if (config.moderation.deleteChannel.log === true) {
                let Channel_Deleted = new Discord.RichEmbed()
                    .setAuthor(config.moderation.deleteChannel.messages.log.embed.title)
                    .setColor(config.moderation.deleteChannel.messages.log.embed.color)
                    .addField("Executor", `<@${message.author.id}>`)
                    .addField("Channel Name", `<#${channel.id}>`)
                    .addField("Channel ID", `${channel.id}`)
                    .setFooter(embeds3);
                try {
                    message.guild.channels.find(c => c.name === config.channel.logs).send(Channel_Deleted);
                } catch (error) {
                    if (error) {
                        return messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.logs, "deleteChannel", config.messages.channelNotFound.embed.footer);
                    }
                }
            }
            message.channel.delete();

        } else {
            return messages.EmbedInvalidArgsMessages(message, "No Permission", config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer);
        }
    }
};
module.exports.help = {
    name: "deletechannel",
    aliases: config.moderation.deleteChannel.aliases
};
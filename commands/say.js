const Discord = require("discord.js");
const client = new Discord.Client();
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const logs = require('../modules/logs');
const messages = require("../modules/messages");

exports.run = async (client, message, args) => {
    if (config.moderation.say.enabled == true) {
        if (message.member.roles.find(r => r.name == `${config.moderation.say.permissionRole}`)) {
            message.delete();
            let argument = args.join(" ");
            let channel = message.channel;
            if (!args[0]) {
                return messages.EmbedInvalidArgsMessages(message, "No Message", config.messages.noMessage.embed.footer, config.messages.noMessage.embed.footer, config.messages.noMessage.embed.footer);
            }

            if (config.core.embeds === true) {

                var embeds;
                if (config.messages.embed.override === true) {
                    embeds = config.messages.embed.footer;
                } else {
                    embeds = config.moderation.say.messages.embed.footer;
                }

                let embed = new Discord.RichEmbed()
                    .setAuthor(`${config.moderation.say.messages.embed.title}`)
                    .setColor(`${config.moderation.say.messages.embed.color}`)
                    .setDescription(argument)
                    .setFooter(`${embeds}`);
                message.channel.send(embed);
            } else {
                message.delete();
                message.channel.send(argument);
            }

            var embeds1;
            if (config.messages.embed.override === true) {
                embeds1 = config.messages.embed.footer;
            } else {
                embeds1 = config.moderation.say.messages.embed.footer;
            }

            if (config.moderation.say.log === true) {
                let Say_Command = new Discord.RichEmbed()
                    .setAuthor(config.moderation.say.messages.log.embed.title)
                    .setColor(config.moderation.say.messages.log.embed.color)
                    .addField("Executor", `<@${message.author.id}>`)
                    .addField("Channel", `${message.channel}`)
                    .addField("Message", `${argument}`)
                    .setFooter(embeds1);
                try {
                    message.guild.channels.find(c => c.name === config.channel.logs).send(Say_Command);
                } catch (error) {
                    if (error) {
                        return messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.logs, "say", config.messages.channelNotFound.embed.footer);
                    }
                }
            }
            return;
            
        } else {
            return messages.EmbedInvalidArgsMessages(message, "No Permission", config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer);
        }
    }
};
exports.help = {
    name: "say",
    aliases: config.moderation.say.aliases
};
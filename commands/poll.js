const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const logs = require('../modules/logs');
const messages = require("../modules/messages");

exports.run = async (bot, message, args) => {
    if (config.moderation.poll.enabled == true) {
        if (message.member.roles.find(r => r.name == `${config.moderation.poll.permissionRole}`)) {
            let votingchannel = message.guild.channels.find(c => c.name == `${config.channel.polls}`);
            let argument = args.slice(0).join(' ');

            if (!args[0]) {
                return messages.EmbedInvalidArgsMessages(message, "No Message", config.messages.noMessage.embed.footer, config.messages.noMessage.embed.footer, config.messages.noMessage.embed.footer);
            }
            var embeds;
            if (config.messages.embed.override === true) {
                embeds = config.messages.embed.footer;
            } else {
                embeds = config.moderation.poll.messages.poll.embed.footer;
            }

            let botEmbed = new Discord.RichEmbed()
                .setColor(`${config.moderation.poll.messages.poll.embed.color}`)
                .setAuthor(`${config.moderation.poll.messages.poll.embed.title}`)
                .setDescription(argument)
                .setFooter(embeds);

            try{
                votingchannel.send(botEmbed).then(async (msg) => {
                    msg.react("✅").then(r => msg.react("❎"));
                });
            }
            catch(error){
                if(error){
                    if(config.core.debug === true){
                        console.log(error);
                    }
                    return messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.polls, "Poll cmd", config.messages.channelNotFound.embed.footer);
                }
            }

            if (config.core.embeds === true) {
                let embed = new Discord.RichEmbed()
                    .setAuthor(config.moderation.poll.messages.pollSent.embed.title)
                    .setColor(config.moderation.poll.messages.pollSent.embed.color)
                    .setDescription(config.moderation.poll.messages.pollSent.message);
                message.channel.send(embed);
            } else {
                message.channel.send(config.moderation.poll.messages.pollSent.message);
            }

            return logs.logAction(message, "Poll Created", message.author.id, argument, config.moderation.poll.messages.log.embed.footer);
        } else {
            return messages.EmbedInvalidArgsMessages(message, "No Permission", config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer);
        }
    }
};
exports.help = {
    name: "poll",
    aliases: config.moderation.poll.aliases
};
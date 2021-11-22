const Discord = require("discord.js");
const client = new Discord.Client();
const yaml = require("js-yaml")
const fs = require("fs")
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require("../modules/messages.js");

exports.run = async (client, message, args) => {
    var embeds, embeds2, embeds3, embeds4, channel;
    if (config.messages.embed.override === true) {
        embeds = config.messages.embed.footer;
    } else {
        embeds = config.general.report.messages.invalidOption.embed.footer;
    }

    if (config.messages.embed.override === true) {
        embeds2 = config.messages.embed.footer;
    } else {
        embeds2 = config.general.report.messages.reported.embed.footer;
    }

    if (config.messages.embed.override === true) {
        embeds3 = config.messages.embed.footer;
    } else {
        embeds3 = config.general.report.messages.inReportsChannel.embed.footer;
    }


    if (config.general.report.enabled == true) {
        let args111 = args[0];
        if (!args111) {
            if (config.core.embeds === true) {
                let embed = new Discord.RichEmbed()
                    .setAuthor(config.general.report.messages.invalidOption.embed.title)
                    .setColor(config.general.report.messages.invalidOption.embed.color)
                    .setDescription(config.general.report.messages.invalidOption.message)
                    .setFooter(embeds)

                return message.channel.send(embed)
            } else {
                return message.channel.send(config.general.report.messages.invalidOption.message)
            }
        }
        if (args111 == "Player" || args111 == "Bug" || args111 == "Other" || args111 == "player" || args111 == "bug" || args111 == "other") {
            let args11 = args.slice(1).join(' ');

            if (!args11) {
                return messages.EmbedMessages(message, "No Reason Provided", args111, args111, config.messages.noReason.embed.footer);
            }
            let embed = new Discord.RichEmbed()
                .setAuthor(config.general.report.messages.inReportsChannel.embed.title)
                .setColor(config.general.report.messages.inReportsChannel.embed.color)
                .addField("Report from:", `${message.author}`)
                .addField("Report type:", `${args111}`)
                .addField("Reason:", `${args11}`)
                .setFooter(embeds3);
                try {
                    channel = message.guild.channels.find(c => c.name == `${config.channel.reports}`).send(embed);
                } catch (error) {
                    if (error) {
                        return message.channel.send(config.messages.channelNotFound.message.replace(/{channel}/g, config.channel.reports).replace(/{command}/g, "Reports"));
                    }
                }


            if (config.core.embeds === true) {
                let embed = new Discord.RichEmbed()
                    .setAuthor(config.general.report.messages.reported.embed.title)
                    .setColor(config.general.report.messages.reported.embed.color)
                    .setDescription(config.general.report.messages.reported.message)
                    .setFooter(embeds2);

                return message.channel.send(embed);
            } else {
                return message.channel.send(config.general.report.messages.reported.message)
            }
        }
    }
};
exports.help = {
    name: "report",
    aliases: config.general.report.aliases
};
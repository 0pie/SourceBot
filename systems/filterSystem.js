const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs")
const yaml = require("js-yaml")
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))
const filter = require(`${process.cwd()}/assets/Required-Files/Systems/Filter/filter.json`);
const messages = require("../modules/messages");

module.exports = async (message) => {
    if (config.filterSystem.enabled === true) {
        try {
            var logsChannel = message.guild.channels.find(c => c.name == config.channel.logs);
        } catch (error) {
            if (error) {
                return messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.logs, config.messages.channelNotFound.embed.footer, config.messages.channelNotFound.embed.footer);
            }
        }
        if (message.author.bot) return;
        if (message.member.roles.find(r => r.name === config.filterSystem.permissionRole)) {
            return;
        }
        if (message.content.indexOf(config.prefix) !== 0 && filter.BLACKLISTED_WORDS.some(word => message.content.toLowerCase().includes(word))) {
            if (config.core.embeds === true) {
                messages.EmbedMessages(message, "Filter Message Removed", message.author.id);
            } else {
                message.channel.send(config.filterSystem.messages.wordIsBlacklisted.message.replace(/{tagauthor}/g, `${message.author}`));
            }

            if (config.filterSystem.log === true) {
                let embed = new Discord.RichEmbed()
                    .setAuthor(config.filterSystem.messages.wordIsBlacklisted.embed.title)
                    .setColor(config.filterSystem.messages.wordIsBlacklisted.embed.color)
                    .setDescription("I caught someone saying a banned word. Here you go:")
                    .addField("Name:", `<@${message.author.id}>`)
                    .addField("In Channel:", `${message.channel.name}`)
                    .addField("Original Message:", `${message.content}`);

                logsChannel.send(embed);
            }
            message.delete();
        }
    }
};
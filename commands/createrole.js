const Discord = require("discord.js");
const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const logs = require('../modules/logs.js');
const messages = require("../modules/messages");

module.exports.run = async (client, message, args) => {
    if (config.moderation.createRole.enabled === false) {
        return;
    }
    if (!message.member.roles.find(r => r.name === config.moderation.createRole.permissionRole)) {
        return messages.EmbedInvalidArgsMessages(message, "No Permission", config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer);
    }
    
    let roleName = args[0];
    let roleColor = args.slice(1).join(' ');

    if (!roleName) {
        return messages.EmbedInvalidArgsMessages(message, "No Name", config.messages.noName.embed.footer, config.messages.noName.embed.footer, config.messages.noName.embed.footer);
    }
    if (!roleColor) {
        return messages.EmbedInvalidArgsMessages(message, "No Color", config.messages.noColor.embed.footer, config.messages.noColor.embed.footer, config.messages.noColor.embed.footer);
    }

    message.guild.createRole({
        name: roleName,
        color: roleColor,
        permissions: []
    });

    var embeds3;
    if (config.messages.embed.override === true) {
        embeds3 = config.messages.embed.footer;
    } else {
        embeds3 = config.moderation.createRole.messages.log.embed.footer;
    }
    messages.EmbedMessages(message, "Create Role Command Role Created", message.author.id, roleName, config.moderation.createRole.messages.roleCreated.embed.footer, config.moderation.createRole.messages.roleCreated.embed.footer);

    if (config.moderation.createRole.log === true) {
        let Role_Created = new Discord.RichEmbed()
            .setAuthor(config.moderation.createRole.messages.log.embed.title)
            .setColor(config.moderation.createRole.messages.log.embed.color)
            .addField("Executor", `<@${message.author.id}>`)
            .addField("Role Name", `${roleName}`)
            .addField("Role Color", `#${roleColor}`)
            .setFooter(embeds3)
        try {
            return message.guild.channels.find(c => c.name == config.channel.logs).send(Role_Created);
        } catch (error) {
            if (error) {
                return messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.logs, "createRole", config.messages.channelNotFound.embed.footer);
            }
        }
    }
};
module.exports.help = {
    name: "createrole",
    aliases: config.moderation.createRole.aliases
};

const Discord = require("discord.js");
const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const logs = require('../modules/logs');
const messages = require("../modules/messages");

module.exports.run = async (client, message, args) => {
    if (config.moderation.deleteRole.enabled === true) {
        if (message.member.roles.find(r => r.name === config.moderation.deleteRole.permissionRole)) {
            let roleName = args[0];

            if (!roleName) {
                return messages.EmbedInvalidArgsMessages(message, "No Name", config.messages.noName.embed.footer, config.messages.noName.embed.footer, config.messages.noName.embed.footer);
            } else {
                let role = message.guild.roles.find(r => r.name === roleName);
                try{
                role.delete();
                }
                catch(error){
                    return message.channel.send("Role doesn't exist or I do not have permission");
                }

                messages.EmbedMessages(message, "Delete Role Command Role Deleted", roleName, config.moderation.deleteRole.messages.roleDeleted.embed.footer, config.moderation.deleteRole.messages.roleDeleted.embed.footer, config.moderation.deleteRole.messages.roleDeleted.embed.footer);
                
                var embeds3;
                    if (config.messages.embed.override === true) {
                        embeds3 = config.messages.embed.footer;
                    } else {
                        embeds3 = config.moderation.deleteRole.messages.log.embed.footer;
                    }
                
                if(config.moderation.deleteRole.log === true){
                let Role_Deleted = new Discord.RichEmbed()
                    .setAuthor(config.moderation.deleteRole.messages.log.embed.title)
                    .setColor(config.moderation.deleteRole.messages.log.embed.color)
                    .addField("Executor", `<@${message.author.id}>`)
                    .addField("Role Deleted", `<@${role.id}>`)
                    .setFooter(embeds3);
                try{
                return message.guild.channels.find(c => c.name === config.channel.logs).send(Role_Deleted);
                }
                catch(error){
                    if(error){
                        return messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.logs, "deleteRole", config.messages.channelNotFound.embed.footer);
                    }
                }
                }
            }
        } else {
            return messages.EmbedInvalidArgsMessages(message, "No Permission", config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer);
        }
    }
};
module.exports.help = {
    name: "deleterole",
    aliases: config.moderation.deleteRole.aliases
};
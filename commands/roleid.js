const Discord = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const embeds = require("../modules/embeds.js");

module.exports.run = async (bot, message, args) => {
    if (config.info.roleID.enabled === true) {
        let role = message.mentions.roles.first();
        if (!role) {
            if (config.core.embeds === true) {
                let embed = new Discord.RichEmbed()
                    .setAuthor("No Role Provided!")
                    .setColor("660101")
                    .setDescription("You did not tag a role for me to lookup!")
                    .setTimestamp();
                message.channel.send(embed);
            } else {
                message.reply("You did not tag a role!");
            }
        } else {
            let embed = new Discord.RichEmbed()
                .setAuthor("Role information")
                .setColor("#154999")
                .addField("Name:", role, true)
                .addField("ID:", role.id, true);
            message.channel.send(embed);
        }
    }
};
module.exports.help = {
    name: "roleid",
    aliases: config.info.roleID.aliases
};
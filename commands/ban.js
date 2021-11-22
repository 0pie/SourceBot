const Discord = require("discord.js");
const client = new Discord.Client();
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require('../modules/messages');

exports.run = async (bot, message, args) => {
    if (config.moderation.ban.enabled === true) {
        // Checks the members permission to see if they have the correct role
        if (message.member.roles.find(r => r.name == config.moderation.ban.permissionRole)) {


            // variables
            let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            var reason;
            reason = args.slice(1).join(" ");

            // Does this if the user did not tag a member
            if (!user) {
                return messages.EmbedInvalidArgsMessages(message, "No User Tagged", config.messages.noUserTagged.embed.footer, config.messages.noUserTagged.embed.footer, config.messages.noUserTagged.embed.footer);
            }
            // Checks if there is a reason
            // If not do this:
            if (!reason) {
                // Sets the Var reason to this:
                reason = "No reason provided";
            }

            // Checks if the person trying to ban is the bot
            // If so it does this:
            if (user.id === bot.user.id) {
                //Checks if the embed option is true
                if (config.core.embeds === true) {
                    // Creates and sends this embed
                    let embed = new Discord.RichEmbed()
                        .setAuthor("Nice try!")
                        .setColor("#486dAA")
                        .setDescription("Why would you try this? Trying to ban me through my own command! Ha! Nice try.\nYou are unable to ban me!")
                    return message.channel.send(embed)
                } else {
                    //Sends this if the embed option is false
                    return message.channel.send("No, just No.");
                }
            }

            // Checks if the user being banned is the author
            // If so it does this:
            var embeds;
            if (config.messages.embed.override === true) {
                embeds = config.messages.embed.footer;
            } else {
                embeds = config.moderation.ban.messages.userIsThemself.embed.footer
            }

            if (user.id === message.author.id) {
                //Checks if the embed option is true
                if (config.core.embeds === true) {
                    // Creates and sends this embed
                    let embed = new Discord.RichEmbed()
                        .setAuthor(config.moderation.ban.messages.userIsThemself.embed.title)
                        .setColor(config.moderation.ban.messages.userIsThemself.embed.color)
                        .setDescription(config.moderation.ban.messages.userIsThemself.message)
                        .setFooter(embeds)

                    return message.channel.send(embed);
                } else {
                    //Sends this if the embed option is false
                    return message.channel.send(config.moderation.ban.messages.userIsThemself.message);
                }
            }

            // Checks if the person tagged is null
            // If so send this:
            if (user == null) {
                return messages.EmbedInvalidArgsMessages(message, "personNotFound", config.messages.personNotFound.embed.footer, config.messages.personNotFound.embed.footer, config.messages.perNotFound.embed.footer);
            }

            // If all checks have been passed as OK
            // it will then ban the user
            try{
            user.ban(reason);
            }
            catch(error){
                if(error){
                    return console.log("Missing permissions?");
                }
            }

            var embeds1;
            if (config.messages.embed.override === true) {
                embeds1 = config.messages.embed.footer;
            } else {
                embeds1 = config.moderation.ban.messages.userBanned.embed.footer;
            }

            // Then it will send this embed to say
            // that the user has been banned
            if (config.core.embeds === true) {
                let embed = new Discord.RichEmbed()
                    .setAuthor(config.moderation.ban.messages.userBanned.embed.title)
                    .setColor(config.moderation.ban.messages.userBanned.embed.color)
                    .setDescription(config.moderation.ban.messages.userBanned.message
                        .replace(/{user}/g, user)
                        .replace(/{userID}/g, user.id)
                        .replace(/{staffMember}/g, message.author)
                        .replace(/{reason}/g, reason))
                    .setFooter(embeds1);
                message.channel.send(embed);
            } else {
                message.channel.send(config.moderation.ban.messages.userBanned.message
                    .replace(/{user}/g, user)
                    .replace(/{userID}/g, user.id)
                    .replace(/{staffMember}/g, message.author)
                    .replace(/{reason}/g, reason));
            }


            // Checks the config if the user wants logging enabled
            // if so it does this:
            var embeds2;
            if (config.messages.embed.override === true) {
                embeds2 = config.messages.embed.footer;
            } else {
                embeds2 = config.moderation.ban.messages.log.embed.footer;
            }
            if (config.moderation.ban.log === true) {
                let user = message.guild.member(message.mentions.users.first());
                
                let banEmbed = new Discord.RichEmbed()
                    .setAuthor(`${config.moderation.ban.messages.log.embed.title}`)
                    .setColor(`${config.moderation.ban.messages.log.embed.color}`)
                    .addField("Staff Member", `<@${message.author.id}>`)
                    .addField("User Banned", `<@${user.id}>`)
                    .addField("Reason", `${reason}`)
                    .setFooter(`${embeds2}`);
                try{
                return message.guild.channels.find(c => c.name == `${config.channel.logs}`).send(banEmbed);
                }
                catch(error){
                    if(error){
                        return messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.logs, "ban", config.messages.channelNotFound.embed.footer);
                    }
                }
            }
        } else {
            // If the person has no permission:
                return messages.EmbedInvalidArgsMessages(message, "No Permission", config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer);
        }
    }
};
exports.help = {
    name: "ban",
    aliases: config.moderation.ban.aliases
};
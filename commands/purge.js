const Discord = require("discord.js");
const client = new Discord.Client();
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require("../modules/messages");

exports.run = async (client, message, args) => {
  if (config.moderation.purge.enabled === true) {
    if (message.member.roles.find(r => r.name == `${config.moderation.purge.permissionRole}`)) {
      const deleteCount = parseInt(args[0], 10);

      if (!deleteCount || deleteCount < 2 || deleteCount > `${config.moderation.purge.maxAmount}`) {
        if (config.allMessagesIn_Embeds === true) {
          let embed = new Discord.RichEmbed()
            .setAuthor("Please provide a number!")
            .setColor("#Gv5976")
            .setDescription(`Please provide a number between **2 **and **${config.moderation.purge.maxAmount}** for the number of messages to delete`);

          return message.channel.send(embed);
        } else {
          return message.reply(`Please provide a number between **2 **and **${config.moderation.purge.maxAmount}** for the number of messages to delete`);
        }
      }

      const fetched = await message.channel.fetchMessages({
        limit: deleteCount
      });
      /*
      message.channel.bulkDelete(fetched)
        .catch(error => {
          if (config.allmessagesin_embeds === true) {
            let embed = new Discord.RichEmbed()
              .setAuthor("Error!")
              .setColor("#BB0000")
              .setDescription(`Couldn't delete messages because of an error.\nERROR: ${error}`)

            return message.channel.send(embed)
          } else {
            return returnmessage.reply(`Couldn't delete messages because of: ${error}`);
          }
        })
        */

      try {
        message.channel.bulkDelete(fetched);
      } catch (error) {
        if (error) {
          if (config.core.debug === true) {
            console.log(error);
          }
          if (config.core.embeds === true) {
            let embed = new Discord.RichEmbed()
              .setAuthor("Error!")
              .setColor("#BB0000")
              .setDescription(`Couldn't delete messages because of an error.\nERROR: ${error}`)

            return message.channel.send(embed);
          } else {
            return message.reply(`Couldn't delete messages because of: ${error}`);
          }
        }
      }

      var embeds;
        if(config.messages.embed.override === true) {
            embeds = config.messages.embed.footer;
        } else {
            embeds = config.moderation.purge.messages.log.embed.footer;
        }

      let purgeEmbed = new Discord.RichEmbed()
        .setAuthor(`${config.moderation.purge.messages.log.title}`)
        .setColor(`${config.moderation.purge.messages.log.color}`)
        .addField("Executor", `<@${message.author.id}>`)
        .addField("Deleted", `${deleteCount}`)
        .addField("Channel", `${message.channel}`)
        .setFooter(`${embeds}`);
        try{
          return message.guild.channels.find(c => c.name === config.channel.logs).send(purgeEmbed);
          }
          catch(error){
              if(error){
                  return messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.logs, "Poll", config.messages.channelNotFound.embed.footer);
              }
          }

    } else {
      messages.EmbedInvalidArgsMessages(message, "No Permission", config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer);
    }
  }
};
exports.help = {
  name: "purge",
  aliases: config.moderation.purge.aliases
};
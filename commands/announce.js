const Discord = require("discord.js");
const client = new Discord.Client();
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require("../modules/messages");

exports.run = async (bot, message, args) => {
  let tagauthor = message.author;
  if (config.moderation.announce.enabled === true) {
    if (message.member.roles.find(r => r.name == `${config.moderation.announce.permissionRole}`)) {
      let announcechannel = message.guild.channels.find(c => c.name == `${config.channel.announcements}`);
      let reason = args.join(" ");

      if (!reason) {
        return messages.EmbedInvalidArgsMessages(message, "No Reason Provided", config.messages.noReason.embed.footer, config.messages.noReason.embed.footer, config.messages.noReason.embed.footer);
      }

      var embeds;
      if (config.messages.embed.override === true) {
        embeds = config.messages.embed.footer;
      } else {
        embeds = config.moderation.announce.messages.announce.embed.footer;
      }
      let botEmbed = new Discord.RichEmbed()
        .setColor(`${config.moderation.announce.messages.announce.embed.color}`)
        .setAuthor(`${config.moderation.announce.messages.announce.embed.title}`)
        .setDescription(reason)
        .setFooter(`${embeds}`);
      
      if(!announcechannel) {
        return message.channel.send("There is no announce channel.");
      } else {
        try{
      announcechannel.send(botEmbed);
        }
        catch(error){
          if(error){
            return message.channel.send("There was an error when trying to post this message.");
          }
        }
      }

      message.channel.send(`${config.moderation.announce.messages.announcementSent.message.replace(/{tagauthor}/g, `${message.author}`)}`);

      var embeds2;
      if (config.messages.embed.override === true) {
        embeds2 = config.messages.embed.footer;
      } else {
        embeds2 = config.moderation.announce.messages.log.embed.footer;
      }
      if (config.moderation.announce.log === true) {
        let announceEmbed = new Discord.RichEmbed()
          .setAuthor(`${config.moderation.announce.messages.log.embed.title}`)
          .setColor(`${config.moderation.announce.messages.log.embed.color}`)
          .addField("Executor", `<@${/*sender*/ message.author.id}>`)
          .addField("Announcement", `${/*reason*/reason}`)
          .setFooter(`${embeds2}`);
        try {
          return message.guild.channels.find(c => c.name == `${config.channel.logs}`).send(announceEmbed);
        } catch (error) {
          if (error) {
            return messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.logs, "announce", config.messages.channelNotFound.embed.footer);
          }
        }
      }

      announcechannel.send("@everyone").then(msg => {
        msg.delete(0);
      });
    } else {
      messages.EmbedInvalidArgsMessages(message, "No Permission", config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer);
    }
  }
};
exports.help = {
  name: "announce",
  aliases: config.moderation.announce.aliases
};

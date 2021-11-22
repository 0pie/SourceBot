const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs")
const yaml = require("js-yaml")
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))
const logs = require('../modules/logs.js')
const messages = require("../modules/messages");

exports.run = async (client, message, args) => {

  if (config.moderation.unblacklist.enabled === true) {
    if (message.member.roles.find(r => r.name == config.moderation.unblacklist.permissionRole)) {

      var Blacklist_Role = message.guild.roles.find(r => r.name == config.roles.blacklisted),
        Member_Role = config.roles.member,
        Member = message.mentions.members.first(),
        reason;

      reason = args.slice(1).join(' ');

      if (!Member) {
        return messages.EmbedInvalidArgsMessages(message, "personNotFound", config.messages.personNotFound.embed.footer, config.messages.personNotFound.embed.footer, config.messages.personNotFound.embed.footer);
      }

      if (!reason) {
        reason = "No Reason Provided";
      }

      // Removes the blacklisted role
      try {
        Member.removeRole(Blacklist_Role);
      } catch (error) {
        if (error) {
          if (config.core.debug === true) {
            console.log(error);
          }

          if (config.core.embeds === true) {
            let embed1 = new Discord.RichEmbed()
              .setAuthor("Error!")
              .setColor("#YY0000")
              .setDescription(`Sorry ${message.author} The member ${Member} couldn't be unblacklisted\nError: ${error}`)

            return message.channel.send(embed1);
          } else {
            return message.reply(`Sorry ${message.author} The member ${Member} couldn't be unblacklisted\nError: ${error}`)
          }
        }
      }

      var embeds;
      if(config.messages.embed.override === true) {
          embeds = config.messages.embed.footer;
      } else {
          embeds = config.moderation.unblacklist.messages.userUnblacklisted.embed.footer;
      }

      // Tells the user that the user was unblacklisted
      if (config.core.embeds === true) {
        let embed = new Discord.RichEmbed()
          .setAuthor(config.moderation.unblacklist.messages.userUnblacklisted.embed.title)
          .setColor(config.moderation.unblacklist.messages.userUnblacklisted.embed.color)
          .setDescription(config.moderation.unblacklist.messages.userUnblacklisted.message.replace(/{tagmember}/g, `${Member}`).replace(/{tagauthor}/g, `${message.author.tag}`))
          .setFooter(embeds);
        message.channel.send(embed);
      } else {
        message.channel.send(config.moderation.unblacklist.messages.userUnblacklisted.message.replace(/{tagmember}/g, `${Member}`).replace(/{tagauthor}/g, `${message.author.tag}`));
      }

      // Logs it

      var embeds1;
      if(config.messages.embed.override === true) {
          embeds1 = config.messages.embed.footer;
      } else {
          embeds1 = config.moderation.unblacklist.messages.log.embed.footer;
      }

      let unblacklistEmbed = new Discord.RichEmbed()
        .setAuthor(`${config.moderation.unblacklist.messages.log.embed.title}`)
        .setColor(`${config.moderation.unblacklist.messages.log.embed.color}`)
        .addField("Executor", `<@${message.author.id}>`)
        .addField("User", `${Member}`)
        .setFooter(`${embeds1}`);
      try{
        if(config.moderation.unblacklist.log === true) {
          message.guild.channels.find(c => c.name == `${config.channel.logs}`).send(unblacklistEmbed);
        }
      }
      catch(error){
        if(error){
          if(config.core.debug === true) {
            console.error(error);
          }
          messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.logs, "Unblacklist", config.messages.channelNotFound.embed.footer);
        }
      }

      // Removes the user from the blacklists file
      const blacklisted = require(`${process.cwd()}/assets/Required-Files/Systems/Blacklist/blacklists.json`)
      let blacklists = await blacklisted;
      blacklisted[Member.id] = {
        blacklists: blacklists[Member.id]
      }
      if (blacklists[Member.id]) {
        delete blacklists[Member.id];
        fs.writeFile(`${process.cwd()}/assets/Required-Files/Systems/Blacklist/blacklists.json`, JSON.stringify(blacklists), function (err) {
          if (err) {
            console.log(err);
          }
        });
      }

    } else {
      return messages.EmbedInvalidArgsMessages(message, "No Permission", config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer);
    }
  }
};
exports.help = {
  name: "unblacklist",
  aliases: config.moderation.unblacklist.aliases
};
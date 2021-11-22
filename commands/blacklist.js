const Discord = require("discord.js");
const client = new Discord.Client();
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require("../modules/messages");

exports.run = async (client, message, args) => {
  if (config.moderation.blacklist.enabled === true) {

    if (message.member.roles.find(r => r.name == config.moderation.blacklist.permissionRole)) {
      try{
      var blacklistRole = message.guild.roles.find(r => r.name === config.roles.blacklisted),
        memberRole = message.guild.roles.find(r => r.name === config.roles.member),
        member = message.mentions.members.first(),
        StaffMember = message.author.tag,
        reason = args.slice(1).join(' ');
      }
      catch(error){
        if(error){
          return message.channel.send("There was an error. Maybe a role was not found?");
        }
      }

      // Checks if a member was tagged. If not this is sent.
      if (!member) {
        return messages.EmbedInvalidArgsMessages(message, "No User Tagged", config.messages.noUserTagged.embed.footer, config.messages.noUserTagged.embed.footer, config.messages.noUserTagged.embed.footer);
      }

      // If there is no reason given, default is
      if (!reason) {
        reason = "No Reason Provided";
      }


      // Trys to add the blacklisted role
      try {
        member.addRole(blacklistRole);
      } catch (error) {
        if (error) {
          if (config.core.debug === true) {
            console.log(error);
          }

          let embed = new Discord.RichEmbed()
            .setAuthor("Error!")
            .setColor("#UU0000")
            .setDescription(`Sorry ${message.author.tag} The ban couldn't take place because an error occurred:\nERROR: ${error}`)

          return message.channel.send(embed);
        }
      }

      // Sends the message to say that the user is banned
      if (config.core.embeds === true) {
        let embed = new Discord.RichEmbed()
          .setAuthor(config.moderation.blacklist.messages.userBlacklisted.embed.title)
          .setColor(config.moderation.blacklist.messages.userBlacklisted.embed.color)
          .setDescription(`${config.moderation.blacklist.messages.userBlacklisted.message.replace(/{member}/g, member).replace(/{staffmember}/g, StaffMember).replace(/{reason}/g, reason)}`)

        message.channel.send(embed);
      } else {
        message.reply(`${config.moderation.blacklist.messages.userBlacklisted.message.replace(/{member}/g, member).replace(/{staffmember}/g, StaffMember).replace(/{reason}/g, reason)}`);
      }


      // Adds the user to the blacklisted file
      let blacklistedfile = require(`${process.cwd()}/assets/Required-Files/Systems/Blacklist/blacklists.json`);
      let blacklists = await blacklistedfile;
      blacklists[member.id] = {
        blacklists: blacklists[member.id]
      }
      fs.writeFileSync(`${process.cwd()}/assets/Required-Files/Systems/Blacklist/blacklists.json`, JSON.stringify(blacklists), (err) => {
        if (err) console.log(err);
      });


      // Checks if there is a logs channel to log
      if(config.moderation.blacklist.log === false) { return; }
      try{
      var logsChannel = message.guild.channels.find(c => c.name === config.channel.logs);
      }
      catch(error){
        if(error){
          return;
        }
      }
      if (!logsChannel) {
        return messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.logs, "blacklist", config.messages.channelNotFound.embed.footer);
      }
      var embeds;
        if(config.messages.embed.override === true) {
            embeds = config.messages.embed.footer;
        } else {
            embeds = config.moderation.blacklist.messages.log.embed.footer;
        }

        // Logs it
        let blacklistEmbed = new Discord.RichEmbed()
          .setAuthor(`${config.moderation.blacklist.messages.log.embed.title}`)
          .setColor(`${config.moderation.blacklist.messages.log.embed.color}`)
          .addField("Staff Member", `<@${message.author.id}>`)
          .addField("User Blacklisted", `${member}`)
          .addField("Reason", `${reason}`)
          .setFooter(`${embeds}`);
        return logsChannel.send(blacklistEmbed);

    } else {

      // Sent if the person did not have permission to run the command
      return messages.EmbedInvalidArgsMessages(message, "No Permission", config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer);
    }
  }
};
exports.help = {
  name: "blacklist",
  aliases: config.moderation.blacklist.aliases
};
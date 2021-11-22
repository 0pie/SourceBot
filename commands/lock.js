const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const Discord = require("discord.js");
const client = new Discord.Client();
const logs = require('../modules/logs.js')
const messages = require("../modules/messages");

exports.run = async (client, message, args) => {
  if (config.moderation.lockChannel.enabled === true) {
    if (message.member.roles.find(r => r.name == `${config.moderation.lockChannel.permissionRole}`)) {
      let channel = message.channel;

      let reason = args.slice(1).join(' ');
      if (!reason) reason = `No Reason Provided`;

      channel.overwritePermissions(message.guild.defaultRole, {
        'SEND_MESSAGES': false
      });

      var embeds;
        if(config.messages.embed.override === true) {
            embeds = config.messages.embed.footer;
        } else {
            embeds = config.moderation.lockChannel.messages.lockedChannel.embed.footer;
        }

      let lockEmbed = new Discord.RichEmbed()
        .setAuthor(`${config.moderation.lockChannel.messages.lockedMessage.embed.title}`)
        .setColor(`${config.moderation.lockChannel.messages.lockedMessage.embed.color}`)
        .setDescription(`${config.moderation.lockChannel.messages.lockedMessage.message}`)
        .setFooter(`${embeds}`);

      message.channel.send(lockEmbed);

      let channel1 = (`<#${channel}>`);
      
      if(config.moderation.lockChannel.log === false) { return; }

      let lockEmbed1 = new Discord.RichEmbed()
        .setAuthor(`${config.moderation.lockChannel.messages.log.embed.title}`)
        .setColor(`${config.moderation.lockChannel.messages.log.embed.color}`)
        .addField("Executor", `<@${message.author.id}>`)
        .addField("Channel locked", `${channel}`)
        .addField("Reason", `${reason}`)
        try{
      return message.guild.channels.find(c => c.name == `${config.channel.logs}`).send(lockEmbed1);
    }
    catch(error){
      if(error){
        return;
      }
    }
  } else {
      return messages.EmbedInvalidArgsMessages(message, "No Permission", config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer);
    }
  }
};
exports.help = {
  name: "lock",
  aliases: config.moderation.lockChannel.aliases
};
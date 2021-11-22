const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const Discord = require("discord.js");
const client = new Discord.Client();
const logs = require('../modules/logs.js')
const messages = require("../modules/messages");

exports.run = async (client, message, args) => {
  if(config.moderation.pm.enabled === false) { return; }
    if(!message.member.roles.find(r => r.name == config.moderation.pm.permissionRole)) { return messages.EmbedInvalidArgsMessages(message, "No Permission", config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer); }
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user) { return message.channel.send("Cannot find the desired user."); }
    
    let m = args.slice(1).join(' ');
    if(!m) { return message.channel.send("You did not provide a message to send to the user"); }
    try{
      user.send(`${user} You have been sent a message!\n ${m}`);
    }
    catch(error){
      if(error){
        return message.channel.send("I was unable to send the message to this user. Maybe they have DM's disabled?");
      }
    }
};
exports.help = {
  name: "pm",
  aliases: config.moderation.pm.aliases
};
const Discord = require("discord.js");
const client = new Discord.Client();
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require("../modules/messages");

exports.run = async (client, message, args) => {
    if(config.moderation.channelTopic.enabled === false) return;
    if (message.member.roles.find(r => r.name == config.moderation.channelTopic.permissionRole)) return messages.EmbedInvalidArgsMessages(message, "No Permission", config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer);
    let channel = message.mentions.channels.first();
    if(!channel) { return message.channel.send("You did not mention a channel"); }

    let cTopic = args.slice(1).join(' ');
    if(!cTopic) { return message.channel.send("You did not give a channel topic"); }

    channel.setTopic(cTopic).then(updatedTopic => {
        return message.channel.send(`Channel: ${channel} topic has been set to ${cTopic}`);
    }).catch(error => {
        console.error(error);
        return message.channel.send("There was an unexpected error.");
    });

};
exports.help = {
  name: "topic",
  aliases: []
};
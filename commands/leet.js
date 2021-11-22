const Discord = require("discord.js");
const leet = require('leet');
let cooldown = new Set();
const fs = require("fs");
const cooldownSeconds = 15;
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
var leetspeak;

module.exports.run = async (bot, message, args) => {
  try {
    if(config.fun.leet.enabled === true){
      message.delete();

      if(!cooldown.has(message.author.id)){

        let argument = args.join(" ");

        var embedFooter;
                if(config.messages.embed.override === true) {
                    embedFooter = config.messages.embed.footer;
                } else {
                    embedFooter = config.fun.leet.messages.noMessage.embed.footer;
                }

      if(!args[0]){
        if(config.core.embeds === true){
          let nomsgembed = new Discord.RichEmbed()
          .setAuthor(config.fun.leet.messages.noMessage.embed.title)
          .setColor(config.fun.leet.messages.noMessage.embed.color)
          .setDescription(config.fun.leet.messages.noMessage.message)
          .setFooter(embedFooter);
          message.channel.send(nomsgembed);
        }else{
          return message.reply(`${config.fun.leet.messages.noMessage.message}`); // Returns message if user didn't provide args.
        }
      }else{
        leetspeak = leet.convert(argument);

        let sentembed = new Discord.RichEmbed()  // Embed which will be sent to user when they have successfully gotten a quote.
        .setAuthor(`L33t Hax0r by request from ${message.author.username}`, message.author.displayAvatarURL)
        .setColor(`${config.fun.leet.messages.converted.message.embed.color}`)
        .setDescription(`${leetspeak}`)
        .setFooter(embedFooter);
        message.channel.send(sentembed);

        // Adds the cooldown
        cooldown.add(message.author.id);
        setTimeout(function(){
          cooldown.delete(message.author.id);
        }, config.leetcommand_cooldown * 60)
      }
    } else {
      message.channel.send(`${config.fun.leet.messages.cooldownActive.message.replace(/{tagauthor}/g, `${message.author}`)}`) // Message gets sent informing user of the cooldown they have to wait for to be over until they can execute the command once again..
    }
  }
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};
module.exports.help = {
  name: "leet",
  aliases: config.fun.leet.aliases
};
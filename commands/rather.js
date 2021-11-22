const question = require(`${process.cwd()}/assets/gameFiles/wouldYouRather.json`).wouldYouRather;
const fs = require("fs");
const yaml = require("js-yaml")
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  try{
    if(config.fun.wouldYouRather.enabled == true){
      let num = Math.floor(Math.random() * question.length) - 1;
      let rather = question[num];
  
      if(config.core.embeds === true){
        let embed = new Discord.RichEmbed()
        .setAuthor(config.fun.wouldYouRather.messages.embed.title)
        .setColor(config.fun.wouldYouRather.messages.embed.color)
        .setDescription(rather)
  
        return message.channel.send(embed);
      }else{
        return message.channel.send(rather);
      }
    }
  }
  catch(error){
    if(error){
      console.log(error);
    }
  }
};
module.exports.help = {
    name: "rather",
    aliases: config.fun.wouldYouRather.aliases
};
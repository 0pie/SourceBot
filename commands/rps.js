const fs = require("fs");
const yaml = require("js-yaml")
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))

module.exports.run = async (client, message, args) => {
  if(config.rpscommand_enabled === true){
    let outcomes = [
      'rock',
      'paper',
      'scissor'
    ];
    if(!args[0] || !outcomes.includes(args[0].toLowerCase())){
      if(config.allmessagesin_embeds === true){
        let embed = new Discord.RichEmbed()
        .setAuthor("No Option Selected")
        .setColor("#c10ef7")
        .setDescription("You have to choose either\n**Rock**\n**Paper**\n**Scissor**")
        message.channel.send(embed)
      }else{
        return message.reply("You have to choose either\n**Rock**\n**Paper**\n**Scissor**")
      }
    }else{
      var userOutComeArgs1 = args[0];
      var userOutcome = userOutComeArgs1.toLowerCase();
      let botOutcome = outcomes[Math.floor(Math.random() * outcomes.length) - 1];

      let result = 'I win! :yum:';
      if (userOutcome === botOutcome) {
        result = 'Oh damn! It\'s a draw, dude. :confused:';3
        if(config.allmessagesin_embeds === true){
          let embed = new Discord.RichEmbed()
          .setAuthor("Rock, Paper, Scissors Game")
          .setColor("#098aed")
          .setDescription(result)
          .setTimestamp()
          message.channel.send(embed)
        }else{
          return message.reply(result)
        }
      }
      else if (userOutcome === 'rock') {
        if (botOutcome === 'scissor') {
          result = 'You win. :clap:';
          if(config.allmessagesin_embeds === true){
            let embed = new Discord.RichEmbed()
            .setAuthor("Rock, Paper, Scissors Game")
            .setColor("#098aed")
            .setDescription(result)
            .setTimestamp()
            message.channel.send(embed)
          }else{
            return message.reply(result)
          }
        }
      }
      else if (userOutcome === 'paper') {
        if (botOutcome === 'rock') {
          result = 'You win. :clap:';
          if(config.allmessagesin_embeds === true){
            let embed = new Discord.RichEmbed()
            .setAuthor("Rock, Paper, Scissors Game")
            .setColor("#098aed")
            .setDescription(result)
            .setTimestamp()
            message.channel.send(embed)
          }else{
            return message.reply(result)
          }
        }
      }
      else if (userOutcome === 'scissor') {
        if (botOutcome === 'paper') {
          result = 'You win. :clap:';
          if(config.allmessagesin_embeds === true){
            let embed = new Discord.RichEmbed()
            .setAuthor("Rock, Paper, Scissors Game")
            .setColor("#098aed")
            .setDescription(result)
            .setTimestamp()
            message.channel.send(embed)
          }else{
            return message.reply(result)
          }
        }
      }
        }
      }else{
        return message.channel.send(config.command_disabled_message)
      }
    }
module.exports.help = {
    name: "rps"
}
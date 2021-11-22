const { Client, MessageAttachment } = require("discord.js");
const client = new Client();
const coins = require(`${process.cwd()}/assets/data/coins.json`);
const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require("../modules/messages");

module.exports.run = async (bot, message, args) => {
  try{
    if(config.coinSystem.enabled === false) { return; }
    var
        userCoins = coins[message.author.id].coins,
        hnt = ['heads', 'tails'];
        gambledcoins = parseInt(args.slice(1).join(' '));

        var embedFooter;
        if(config.messages.embed.override === true) {
            embedFooter = config.messages.embed.footer;
        } else {
            embedFooter = config.game.coinflip.messages.invalidOption.embed.footer;
        }
    
    if(config.game.coinflip.enabled === true){
      if(!args[0] || !hnt.includes(args[0].toLowerCase())){
        if(config.core.embeds === true){
          let embed = new Discord.RichEmbed()
          .setAuthor(config.game.coinflip.messages.invalidOption.embed.title)
          .setColor(config.game.coinflip.messages.invalidOption.embed.color)
          .setDescription(config.game.coinflip.messages.invalidOption.message)
          .setFooter(embedFooter);
    
          return message.channel.send(embed);
        }else{
          return message.reply(config.game.coinflip.messages.invalidOption.message);
        }
      }

      if(!gambledcoins){
        return messages.EmbedInvalidArgsMessages(message, "No Coins Specified", hnt, hnt, config.messages.noCoinsAmountProvided.embed.footer);
      }

      if(gambledcoins < config.game.coinflip.minimumAmountOfCoins){
        return message.reply(config.game.coinflip.messages.underMinimumAmount.message.replace(/{minimumcoins}/g, config.game.coinflip.minimumAmountOfCoins));
      }

      if(gambledcoins > userCoins){
        return message.reply(config.game.coinflip.messages.notEnoughCoins.message);
      }

      let userOutcome = args[0].toLowerCase();
      let outcome = hnt[Math.floor(Math.random() * hnt.length)];
      let outcomeINT = parseInt(outcome);
  
      var winamt
      if(userOutcome == outcome){
        winamt = gambledcoins * 2;
      }else{
        winamt = 0;
      }
  
      const embed = new Discord.RichEmbed()
      .setAuthor(`CoinFlip Game`)
      .setColor(`#999999`)
      .setDescription(`You flipped a ${outcome}`)
      .setFooter(`You Gambled: ${gambledcoins} || Winnings: ${winamt}`);
  
      message.channel.send(embed);
  
      coins[message.author.id].coins -= gambledcoins;
      coins[message.author.id].coins += winamt;

    }
  }
  catch(error){
    if(error){
      console.log(error);
    }
  }
};
module.exports.help = {
  name: "coinflip",
  aliases: config.game.coinflip.aliases
};
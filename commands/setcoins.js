const Discord = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync("./config.yml", "utf8"));
const messages = require("../modules/messages");

module.exports.run = async (bot, message, args) => {
  if (config.coinSystem.enabled === false) { return; }
  if (config.economy.coins.setCoins.enabled === false) { return; }
    var coins = await require(`${process.cwd()}/assets/data/coins.json`),
      userargs = message.mentions.members.first(),
      amountINT = parseInt(args.slice(1).join(" ")),
      x;

    if (message.member.roles.find(r => r.name === config.economy.coins.setCoins.permissionRole)) {
      if (!userargs)  return messages.EmbedInvalidArgsMessages(message, "No User Tagged", x, x, config.messages.noUserTagged.embed.footer);
      if (!amountINT) return messages.EmbedInvalidArgsMessages(message, "No Coins Specified");

      try{
      coins[userargs.id].coins = amountINT;
      }
      catch(error){
        if(!coins[userargs.id]) {
          coins[userargs.id] = {
            coins: amountINT
          };
        }
      }

      fs.writeFile(`${process.cwd()}/assets/data/coins.json`, JSON.stringify(coins), (err) => {
        if (err) console.log(err);
    });

      var embedFooter;
            if(config.messages.embed.override === true) {
                embedFooter = config.messages.embed.footer;
            } else {
                embedFooter = config.economy.coins.setCoins.messages.coinsUpdated.embed.footer;
            }

      if (config.core.embeds === true) {
        let embed = new Discord.RichEmbed()
          .setAuthor(`${config.economy.coins.setCoins.messages.coinsUpdated.embed.title.replace(/{author}/g, `${message.author}`).replace(/{username}/g, `${userargs}`).replace(/{newcoins}/g, `${amountINT}`)}`)
          .setColor(`${config.economy.coins.setCoins.messages.coinsUpdated.embed.color}`)
          .setDescription(`${config.economy.coins.setCoins.messages.coinsUpdated.message.replace(/{author}/g, `${message.author}`).replace(/{username}/g, `${userargs}`).replace(/{newcoins}/g, `${amountINT}`)}`)
          .setFooter(embedFooter);

        return message.channel.send(embed);
      } else {
        return message.channel.send(`${config.economy.coins.setCoins.messages.coinsUpdated.message.replace(/{author}/g, `${message.author}`).replace(/{username}/g, `${userargs}`).replace(/{newcoins}/g, `${amountINT}`)}`);
      }
    } else {
        return messages.EmbedInvalidArgsMessages(message, "No Permission", x, x, config.messages.noPermission.embed.footer);
    }
};
module.exports.help = {
  name: "setcoins",
  aliases: config.economy.coins.setCoins.aliases
};
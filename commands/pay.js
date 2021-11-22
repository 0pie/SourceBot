const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require("../modules/messages");

module.exports.run = async (bot, message, args) => {
        const coin = require(`${process.cwd()}/assets/data/coins.json`);
        let coins = await coin;
        if (config.coinSystem.enabled === true) {
            if(config.economy.coins.pay.enabled === true){
                var userCoins = coins[message.author.id].coins,
                    userargs = message.mentions.members.first(),
                    amount = args[1],
                    amountINT = parseInt(amount),
                    minimumAmount = config.Pay_Command_Minimum_Amount_Of_Coins,
                    x;
            if (!userargs) {
                return messages.EmbedInvalidArgsMessages(message, "No User Tagged", x, x, config.messages.noUserTagged.embed.footer);
            }

            if (!amount || args[1].includes("-")) {
                return messages.EmbedInvalidArgsMessages(message, "No Coins Amount Provided", x, x, config.messages.noCoinsAmountProvided.embed.footer);
            }

            if (amountINT < minimumAmount) {
                return messages.EmbedMessages(message, "CoinSystem CoinCommand Another User Coins", x, x, x, config.economy.coins.coins.messages.anotherUserCoins.embed.footer);
            }


            if (amountINT > userCoins) {
                if (config.core.embeds === true) {
                    let embed = new Discord.RichEmbed()
                        .setAuthor(config.economy.coins.pay.messages.notEnoughCoins.embed.title)
                        .setColor(config.economy.coins.pay.messages.notEnoughCoins.embed.color)
                        .setDescription(config.economy.coins.pay.messages.notEnoughCoins.message.replace(/{userCoins}/g, `${userCoins}`))
                        .setFooter(config.embed_footer);
                    return message.channel.send(embed);
                } else {
                    return message.reply(config.economy.coins.pay.messages.notEnoughCoins.message.replace(/{userCoins}/g, `${userCoins}`));
                }
            }

            try{
                coins[message.author.id].coins -= amountINT;
                coins[userargs.id].coins += amountINT;
            }
            catch(error){
                if(error){
                    if(config.debug_mode === true){
                        console.log(error);
                    }
                }
            }

            var embeds;
            if(config.messages.embed.override === true) { 
                embeds = config.messages.embed.footer;
            } else {
                embeds = config.economy.coins.pay.messages.payedCoins.embed.footer;
            }

            if (config.core.embeds === true) {
                let embed = new Discord.RichEmbed()
                    .setAuthor(config.economy.coins.pay.messages.payedCoins.embed.title)
                    .setColor(config.economy.coins.pay.messages.payedCoins.embed.color)
                    .setDescription(config.economy.coins.pay.messages.payedCoins.message.replace(/{coins}/g, `${amountINT}`).replace(/{user}/g, `${userargs}`))
                    .setFooter(embeds);
                    message.channel.send(embed);
            } else {
                message.channel.send(config.economy.coins.pay.messages.payedCoins.message.replace(/{coins}/g, `${amountINT}`).replace(/{user}/g, `${userargs.username}`))
            }
        }
}
};
module.exports.help = {
    name: "pay",
    aliases: config.economy.coins.pay.aliases
};
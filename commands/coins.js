const Discord = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require("../modules/messages");

module.exports.run = async (client, message, args) => {
    var coinFile = require(`${process.cwd()}/assets/data/coins.json`),
        coins = await coinFile,
        x;

    if (config.coinSystem.enabled === true) {
        if (!args[0]) {
            messages.EmbedMessages(message, "CoinSystem CoinCommand User Coins", message.author.username, coins[message.author.id].coins, x, config.economy.coins.coins.messages.userCoins.embed.footer);
        } else {
            user = message.mentions.users.first();
            if (!user) {
                return messages.EmbedInvalidArgsMessages(message, "personNotFound", x, x, config.messages.personNotFound.embed.footer);
            }
            try {
                coins2 = coins[user.id].coins;
            } catch (error) {
                if (error) {
                    coins2 = 0;
                    if (config.core.debug === true) {
                        console.log(error);
                        console.log("This user has no coins!");
                    }
                }
            }
            if (!coins2) {
                messages.EmbedMessages(message, "CoinSystem CoinCommand Another User Coins Is 0", `${user.username}#${user.discriminator}`, user, x, config.economy.coins.coins.messages.user0Coins.embed.footer);
            } else {
                messages.EmbedMessages(message, "CoinSystem CoinCommand Another User Coins", `${user.username}#${user.discriminator}`, user, coins2, config.economy.coins.coins.messages.anotherUserCoins.embed.footer);
            }
        }
    }
};

module.exports.help = {
    name: "coins",
    aliases: config.economy.coins.coins.aliases
};
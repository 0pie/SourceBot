const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const coins = require(`${process.cwd()}/assets/data/coins.json`);

module.exports = async (message) => {

        if (config.coinSystem.enabled === true) {

            if(config.coinSystem.blockChannels.enabled === true) {
                if(config.coinSystem.blockChannels.channels.includes(message.channel.name)) {return;}
            }
            // Vars
            let CoinsAmount = Math.floor(Math.random() * 2.5) + 5;
            let MatchCoinsAmount = Math.floor(Math.random() * 2.5) + 5;
            var coinCooldown = new Set(),
                coinCooldownSeconds = config.coinSystem.cooldown.timer,
                debugMode = config.debug;
            // If the message is from a bot. Return nothing
            if (message.author.bot === true) return;

            // If the message author doesn't have any coins, creates coins for them in the file
            if (!coins[message.author.id]) {
                coins[message.author.id] = {
                    coins: 0,
                    userID: message.author.id
                };
            }

            // Logs the coins to console if debug mode is enabled
            if (debugMode === true) {
                console.log(`DEBUG: Coin System\nDEBUG: USERNAME: ${message.author.username} ID: ${message.author.id}\nDEBUG: Coins Rewarded: ${CoinsAmount}`);
            }

            if (CoinsAmount === MatchCoinsAmount) {
                if (!coinCooldown.has(message.author.id)) {
                    coins[message.author.id] = {
                        coins: coins[message.author.id].coins + CoinsAmount,
                        userID: message.author.id
                    };
                    fs.writeFile(`${process.cwd()}/assets/data/coins.json`, JSON.stringify(coins), (err) => {
                        if (err) console.log(err);
                    });
                    coinCooldown.add(message.author.id);
                    setTimeout(function () {
                        coinCooldown.delete(message.author.id);
                    }, coinCooldownSeconds * 1000);
                }
            }
        }
};

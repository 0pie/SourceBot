const Discord = require("discord.js");
const fs = require("fs");
let coinFile = require(`${process.cwd()}/assets/data/coins.json`);
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

module.exports.run = async (client, message, args) => {
    try {
        let coins = await coinFile;
        if (config.coinSystem.enabled === true) {

            var result, member, total, leaderboardSize, user;
            result = [];
            leaderboard = "";
            total = 0;
            leaderboardSize = config.economy.coins.leaderboard.size;

            for (user in coins) {
                // Grabs the stuff from the file
                result.push({
                    // Assigns the coins format to coins
                    coins: coins[user].coins,
                    // asigns the users ID to id (Format is: coins[user ID].coins)
                    id: user
                });
            }

            // Sorts the file                      // Then flips it around
            result.sort((x, y) => x.coins - y.coins).reverse();

            for (user = 0; user < leaderboardSize; user++) {
                if (result[user]) {
                    member = `<@${result[user].id}>`;
                    leaderboard += `**#${user+1}** - \`\`${result[user].coins}\`\` - ${member}\n`;
                }
            }

            for (user = 0; user < result.length; user++) {
                total += result[user].coins;
            }

            var embedFooter;
            if(config.messages.embed.override === true) {
                embedFooter = config.messages.embed.footer;
            } else {
                embedFooter = config.economy.coins.leaderboard.embed.footer;
            }

            // The embed
            let leaderboardembed = new Discord.RichEmbed()
                .setAuthor(`${config.core.discordName} - Top ${leaderboardSize}`)
                .setColor(`${config.economy.coins.leaderboard.embed.color}`)
                .setDescription(`${leaderboard}  \n\nTotal Coins Collected:   ${total}`)
                .setFooter(`${embedFooter}`);

            message.channel.send(leaderboardembed);

        }
    } catch (error) {
        if (error) {
            console.log(`=====================================================================\n         VodkaBot Diagnostics Tool\n         An Error has occured. Here it is:\n\n${error}\n\nIf you are unsure on how to fix this issue, please contact our support team through our discord: https://discord.gg/BqAWWJN\n=====================================================================`);
            if(config.debug === true){
                console.log(error);
            }
        }
    }

};
module.exports.help = {
    name: "coinsleaderboard",
    aliases: config.economy.coins.leaderboard.aliases
};
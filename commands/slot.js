const Discord = require("discord.js");
const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

module.exports.run = async (bot, message, args) => {
    try {
        const coin = require(`${process.cwd()}/assets/data/coins.json`);
        let coins = await coin;

        if (config.coinSystem.enabled === false) {
            return;
        }
        if (config.game.slots.enabled === false) {
            return;
        }

        let userCoins = coins[message.author.id].coins;

        // Does this if there are no amount of coins given
        if (!args[0]) {
            return message.reply(config.game.slots.messages.noCoins.message);

            // Else do this:
        } else {
            // Makes sure that the amount given is an Int (If any letters are given, it ignores them)

            let gambledCoins = parseInt(args[0]);

            // If the user gave an invalid number
            if (!gambledCoins || message.content.slice(config.bot.prefix.length).includes("-")) {
                return message.reply(`${config.game.slots.messages.invalidNumber.message}`);

            } else {

                // Checks to see if the amount given is less than the minimum defined in the config
                if (gambledCoins < config.game.slots.messages.underMinimumAmount.message) {
                    return message.reply(config.slots_under_minimum_amount_message.replace(/{minimumcoins}/g, `${config.slots_minimum_amount_of_coins}`));
                    // If all clear do this:
                } else {

                    // Checks to see if the amount of coins given is more than the amount of coins the user already has
                    if (gambledCoins > userCoins) {
                        return message.reply(config.game.slots.messages.notEnoughCoins.message.replace(/{userCoins}/g, `${userCoins}`));

                        // If everything passed as ok, it runs the slots command
                    } else {
                        let amt;

                        let randomN = ~~(Math.random() * 20) + 1;

                        // These are the chances:

                        //if the randomN is 1-3, multiply the money by 60-90%
                        if (randomN == "1" || randomN == "2" || randomN == "3") {
                            let randomP = (~~(Math.random() * 30) + 1) + 60;
                            let rand = parseFloat(`0.${randomP}`);
                            amt = gambledCoins + (gambledCoins * rand);

                        }
                        //if the randomN is 4, multiply the money by 2x
                        else if (randomN == "4")
                            amt = gambledCoins * 2;

                        //if the randomN is 5-8 give their money back
                        else if (randomN == "5" || randomN == "6" || randomN == "7")
                            amt = gambledCoins;

                        //if the randomN is 8 or 9 give them 50%-80% of what they gambled back
                        else if (randomN == "8" || randomN == "9") {
                            let randomP = (~~(Math.random() * 30) + 1) + 50;
                            let rand = parseFloat(`0.${randomP}`);
                            amt = gambledCoins * rand;
                        }

                        //if the randomN is 10 give them 10%-40% of what they gambled back
                        else if (randomN == "10") {
                            let randomP = (~~(Math.random() * 30) + 1) + 10;
                            let rand = parseFloat(`0.${randomP}`);
                            amt = gambledCoins * rand;
                        }

                        //Jackpot if the randoN is 11, multiply the money by 5x
                        else if (randomN == "11")
                            amt = gambledCoins * 5;

                        //Super Jackpot if the randoN is 12, multiply the money by 10x
                        else if (randomN == "12")
                            amt = gambledCoins * 10;

                        //if the randomN is 13-20 give them nothing back
                        else amt = 0;

                        let slots = [":apple:", ":banana:", ":cherries:", ":strawberry:", ":melon:"];
                        let result1 = Math.floor((Math.random() * slots.length));
                        let result2 = Math.floor((Math.random() * slots.length));
                        let result3 = Math.floor((Math.random() * slots.length));
                        let result4 = Math.floor((Math.random() * slots.length));
                        let result5 = Math.floor((Math.random() * slots.length));
                        let result6 = Math.floor((Math.random() * slots.length));
                        let result7 = Math.floor((Math.random() * slots.length));
                        let result8 = Math.floor((Math.random() * slots.length));
                        let result9 = Math.floor((Math.random() * slots.length));
                        amt = ~~amt;

                        //send the message

                        let slotembed = new Discord.RichEmbed()
                            .setColor(config.game.slots.messages.slotted.embed.color)
                            .addField("**SLOTS**", `${slots[result1]} ${slots[result2]} ${slots[result3]}\n${slots[result4]} ${slots[result5]} ${slots[result6]}\n${slots[result7]} ${slots[result8]} ${slots[result9]}\n${message.member} you slotted **${gambledCoins}** coins and recieved back **${amt}** coins!`);
                        message.channel.send(slotembed);

                        //set the coins for the user
                        coins[message.author.id].coins -= gambledCoins;
                        coins[message.author.id].coins += amt;
                    }
                }
            }
        }
    } catch (error) {
        if (error) {
            console.log(error);
        }
    }
};

module.exports.help = {
    name: "slot",
    aliases: config.game.slots.aliases
};
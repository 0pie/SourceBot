const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require("../modules/messages.js")

module.exports.run = async (bot, message, args) => {
    var coin = require(`${process.cwd()}/assets/data/coins.json`),
        coins = await coin,

        userargs = message.mentions.members.first() || message.guild.members.get(args[0]),

        amount = args.slice(1).join(' '),
        amountINT = parseInt(amount),

        RolePermission = message.member.roles.find(r => r.name === config.economy.coins.giveCoins.permissionRole);

        if(config.coinSystem.enabled === true){
            if(config.economy.coins.giveCoins.enabled === false) { return; }
            if(RolePermission){
                var x;
                if(!userargs){
                    return messages.EmbedInvalidArgsMessages(message, "No User Tagged", x, x, config.messages.noUserTagged.embed.footer);
                }

                if(!amountINT || args[1].includes("-")){
                    return messages.EmbedInvalidArgsMessages(message, "No Coins Specified");
                }

                if(amountINT > 1000000000) {
                    return message.channel.send("Maybe a lower number?")
                }

                coins[userargs.id].coins += amountINT;
                let newcoins = coins[userargs.id].coins;
                let username = userargs;

                var embedFooter;
                if(config.messages.embed.override === true) {
                    embedFooter = config.messages.embed.footer;
                } else {
                    embedFooter = config.economy.coins.giveCoins.messages.coinsUpdated.embed.footer;
                }

                if(config.core.embeds === true){
                    let embed = new Discord.RichEmbed()
                    .setAuthor(`${config.economy.coins.giveCoins.messages.coinsUpdated.embed.title}`)
                    .setColor(`${config.economy.coins.giveCoins.messages.coinsUpdated.embed.color}`)
                    .setDescription(`${config.economy.coins.giveCoins.messages.coinsUpdated.message
                        .replace(/{author}/g, `${message.author}`)
                        .replace(/{username}/g, `${username}`)
                        .replace(/{newcoins}/g, `${newcoins}`)}`)
                    .setFooter(embedFooter);
    
                    message.channel.send(embed);
                }else{
                    return message.channel.send(`${config.economy.coins.giveCoins.messages.coinsUpdated.message.replace(/{author}/g, `${message.author.tag}`).replace(/{username}/g, `${username}`).replace(/{newcoins}/g, `${newcoins}`)}`);
                }

            }
        }
};
module.exports.help = {
    name: "givecoins",
    aliases: config.economy.coins.giveCoins.aliases
};
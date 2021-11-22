const Discord = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

module.exports.run = async (client, message, args) => {
    var banks = require(`${process.cwd()}/assets/data/bank.json`),
        bank = await banks;

    var coinsFile = require(`${process.cwd()}/assets/data/coins.json`);
    var coins = await coinsFile;


    let amount = parseInt(args[0]);

    if(amount <= 1 || !args[0]) {
        return message.channel.send("Please only input valid integers");
    }

    if(coins[message.author.id] < amount) {
        if(config.core.embeds === false) {
            return message.channel.send(config.economy.banking.deposit.messages.notEnough.message);
        }
        let embed = new Discord.RichEmbed()
        .setAuthor(config.economy.banking.deposit.messages.notEnough.embed.title)
        .setColor(config.economy.banking.deposit.messages.notEnough.embed.color)
        .setDescription(config.economy.banking.deposit.messages.notEnough.message)
        .setFooter(config.economy.banking.deposit.messages.notEnough.embed.footer)
        return message.channel.send(embed);
    }

    if(!bank[message.author.id]) {
        bank[message.author.id] = {
            bank: 0
        };
    }

    bank[message.author.id] = {
        bank: bank[message.author.id].bank + amount
    };

    coins[message.author.id].coins -= amount;

    fs.writeFile(`${process.cwd()}/assets/data/bank.json`, JSON.stringify(bank), (err) => {
        if (err) console.log(err);
    });

    fs.writeFile(`${process.cwd()}/assets/data/coins.json`, JSON.stringify(bank), (err) => {
        if (err) console.log(err);
    });

    if(config.core.embeds === false) {
        return message.channel.send(config.economy.banking.deposit.messages.deposited.message);
    }

    let embed = new Discord.RichEmbed()
    .setAuthor(config.economy.banking.deposit.messages.deposited.embed.title)
    .setColor(config.economy.banking.deposit.messages.deposited.embed.color)
    .setDescription(config.economy.banking.deposit.messages.deposited.message
        .replace(/{amount}/g, amount))
    .setFooter(config.economy.banking.deposit.messages.deposited.embed.footer);
    return message.channel.send(embed);

};

module.exports.help = {
    name: "deposit",
    aliases: []
};
const Discord = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

module.exports.run = async (client, message, args) => {
    var banks = require(`${process.cwd()}/assets/data/bank.json`),
        bank = await banks,
        g, u, user;

    user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    //console.log(user);
    try {
        if (!user) {
            g = bank[message.author.id].bank;
            u = message.author.id;

        } else {
            g = bank[user.id].bank;
            u = user.id;
        }
    } catch (error) {
        g = 0;
        if (!user) {
            u = message.author.id;
        } else {
            u = user.id;
        }
    }

    if (config.core.embeds === false) {
        return message.channel.send(config.economy.banking.balance.messages.bal.message
            .replace(/{amount}/g, g));
    }

    var embeds;
    if (config.messages.embed.override === true) {
        embeds = config.messages.embed.footer;
    } else {
        embeds = config.economy.banking.balance.messages.bal.embed.footer;
    }

    return message.channel.send(new Discord.RichEmbed()
        .setAuthor(config.economy.banking.balance.messages.bal.embed.title)
        .setColor(config.economy.banking.balance.messages.bal.embed.color)
        .setDescription(config.economy.banking.balance.messages.bal.message
            .replace(/{amount}/g, g)
            .replace(/{user}/g, `<@${u}>`))
        .setFooter(embeds));

};

module.exports.help = {
    name: "bankbalance",
    aliases: []
};
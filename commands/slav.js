const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs")
const yaml = require("js-yaml")
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))

exports.run = async (client, message, args) => {
    try {
        if (config.fun.slav.enabled === true) {
            if (config.core.embeds === true) {
                rpm = Math.floor(Math.random() * 28984) + 1
                let spinnerembed = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username} is dancing like a boss!`, message.author.displayAvatarURL)
                    .setColor(`${config.fun.slav.embed.color}`)
                    .setDescription(`${message.author.username} is now dancing like a boss! No one can beat him at the next school disco!`)
                    .setImage("https://media1.tenor.com/images/f777506fa4b1f9a58ffcee6d261c4a7e/tenor.gif?itemid=13032559")
                message.channel.send(spinnerembed)
            } else {
                return message.reply(` is now dancing like a boss! No one can beat him at the next school disco! https://media1.tenor.com/images/f777506fa4b1f9a58ffcee6d261c4a7e/tenor.gif?itemid=13032559`)
            }
        }
    } catch (error) {
        if (error) {
            console.log(error);
        }
    }
};
exports.help = {
    name: "slav",
    aliases: config.fun.slav.aliases
};
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

exports.run = async (client, message, args) => {
    try {
        if (config.fun.vodka.enabled === true) {
            if (config.core.embeds === true) {
                let user = message.mentions.members.first();
                if (user) {

                    let slav_embed = new Discord.RichEmbed()
                        .setAuthor(`${message.author.username} is getting drunk!`, message.author.displayAvatarURL)
                        .setColor(`${config.fun.vodka.embed.color}`)
                        .setDescription(`${message.author} is now drinking some gooood vodka with ${user} and his friends!`)
                        .setImage("https://media0.giphy.com/media/xT9DPldLvmvHRDvhDO/giphy.gif?cid=ecf05e471u19o43nze52lxw2z8thp0h26i4c2qcy41vssw4q")
                    message.channel.send(slav_embed);

                } else {
                    let alone_slav_embed = new Discord.RichEmbed()
                        .setAuthor(`${message.author.username} is getting drunk!`, message.author.displayAvatarURL)
                        .setColor(`${config.fun.vodka.embed.color}`)
                        .setDescription(`${message.author} is now drinking some gooooood vodka by himself!`)
                        .setImage("https://media0.giphy.com/media/26tP21xUQnOCIIoFi/giphy.gif")
                    message.channel.send(alone_slav_embed);
                }

            } else {
                if (message.mentions.members.first().user != message.author) {
                    message.channel.send(`${message.author} is now getting drunk drinking some good old russian vodka with ${user} and their friends! https://media1.tenor.com/images/843dcce2eb17e7b66cbfc8785639666e/tenor.gif`);
                } else {
                    message.channel.send(`${message.author} is now getting drunk drinking some good old russian vodka! https://media1.tenor.com/images/843dcce2eb17e7b66cbfc8785639666e/tenor.gif`);
                }

            }
        }
    } catch (error) {
        if (error) {
            console.log(error);
        }
    }
};
exports.help = {
    name: "vodka",
    aliases: config.fun.vodka.aliases
};
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs")
const yaml = require("js-yaml")
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))

exports.run = async(client, message, args) =>{
    var rpm;
    if(config.fun.fidgetSpinner.enabled === true){
        if(config.core.embeds === true){
            rpm = Math.floor(Math.random() * 28984) + 1 
            let spinnerembed = new Discord.RichEmbed()
            .setAuthor(`Fidget spinner is being spun by ${message.author.username}`, message.author.displayAvatarURL)
            .setColor(`${config.fun.fidgetSpinner.messages.embed.color}`)
            .setDescription(`${message.author.username} is now spinning their fidget spinner at ${rpm} RPM!`)
            .setImage("http://0.media.dorkly.cvcdn.com/20/80/4fcaa14e1215f43b4b791419dca027d9.gif")
            message.channel.send(spinnerembed);
        }else{
            return message.reply(`is now spinning their fidget spinner at ${rpm} RPM!\nhttp://0.media.dorkly.cvcdn.com/20/80/4fcaa14e1215f43b4b791419dca027d9.gif`)
        }
    }
};
exports.help = {
    name: "fidgetspinner",
    aliases: config.fun.fidgetSpinner.aliases
};
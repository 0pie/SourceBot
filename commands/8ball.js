const Discord = require("discord.js")
const question = require(`${process.cwd()}/assets/gameFiles/8ball.json`).eightball;
const fs = require("fs");
const yaml = require("js-yaml")
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))
const messages = require("../modules/messages");

module.exports.run = async (client, message, args) => {
    try{
        if (config.fun.eightBall.enabled === true) {
            let args1 = args[0];
            var x;
            if (!args1) {
                return messages.EmbedInvalidArgsMessages(message, "8Ball No Question Provided", x, x, config.fun.eightBall.messages.noQuestion.embed.footer);
            }else{
                let num = Math.floor(Math.random() * question.length) - 1;
                let rather = question[num];

                if(rather == undefined || rather == null) {
                    rather = question[num];
                }
    
                if (config.core.embeds === true) {
                    let embed = new Discord.RichEmbed()
                    .setAuthor("Magic 8 Ball")
                    .setColor("")
                    .setDescription(`Question: ${args.slice(0).join(' ')}\nResponse: ${rather}`);
    
                    message.channel.send(embed);
                } else {
                    return message.channel.send(rather);
                }
            }
        }
    }
    catch(error){
        if(config.core.debug === true){
            console.log(error);
        }
    }
};
module.exports.help = {
    name: "8ball",
    aliases: config.fun.eightBall.aliases
};

const Discord = require("discord.js");
const client = new Discord.Client();
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
var time;
var prize;
var reactions = [];

exports.run = async (client, message, args) => {
    if (message.member.roles.find(r => r.name == config.giveawaysystem_role_permission)) {
        let channelName = args[0]
        let channel = message.guild.channels.find(c => c.name === channelName)
        if (config.allmessagesin_embeds === true) {
            let provideChannelEmbed = new Discord.RichEmbed()
                .setAuthor("Provide a channel")
                .setColor("#008888")
                .setDescription("Please enter the name of the channel you wish the giveaway to take place in!")
                .setTimestamp()
                 message.channel.send(provideChannelEmbed);
        } else {
            message.channel.send("Please enter the name of the channel you wish the giveaway to take place in!")
        }

        if (!channel) {
            if (config.allmessagesin_embeds === true) {
                let channelNotFoundEmbed = new Discord.RichEmbed()
                    .setAuthor("Channel Not Found")
                    .setColor("#990000")
                    .setDescription(`I was unable to find the channel ${channelName}`)
                    .setTimestamp()
                message.channel.send(channelNotFoundEmbed)
            } else {
                return message.channel.send(`I was unable to find the channel ${channelName}`)
            }
        } else {
            if (config.allmessagesin_embeds === true) {
                let timeEmbed = new Discord.RichEmbed()
                    .setAuthor("Time")
                    .setColor("#019099")
                    .setDescription("Please provide the amount of time you wish for the giveaway to last for\n\nProvide time in seconds!")
                    .setTimestamp()
                    return message.channel.send(timeEmbed)
            } else {
                message.channel.send("Please provide the amount of time you wish for the giveaway to last for\n\nProvide time in seconds!")
            }
            let time1 = args[1]
            let time = parseInt(time1)

            if (time < 10 || !time) {
                if (config.allmessagesin_embeds === true) {
                    let nullTimeEmbed = new Discord.RichEmbed()
                        .setAuthor("Whoops!")
                        .setColor("#121212")
                        .setDescription("You did not provide a time or the amount of time you given is under the minimum which is 10 seconds!")
                        .setTimestamp()
                    message.channel.send(nullTimeEmbed)
                } else {
                    return message.channel.send("You did not provide a time or the amount of time you given is under the minimum which is 10 seconds!")
                }
            }
        }
    }
}
/*
            time = 20;
            prize = "A nuke sent to your home";
            message.channel.send(`React with 🖕 to enter the giveaway to win: ${prize}`).then((msg)=>{
                msg.react("🖕");
            })
            timer = message.channel.send(`Time left: ${time} seconds`).then((msg)=>{
                function countdown(){
                    if(time <= 0){

                        if(reactions.length <= 0) return msg.edit("None won since none entered... :(");
                        if(!msg) return;

                        min = Math.ceil(0);
                        max = Math.floor(reactions.length);
                        var winner = Math.floor(Math.random() * (max - min)) + min;

                        msg.edit(`Congrats ${reactions[winner]} on winning: ${prize}`);
                        clearInterval(countr);
                    }else{
                        time = time-1;
                    }
                }
                var countr = setInterval(countdown, 1000);
                function edit(){
                    if(time <= 0){
                        clearInterval(editr);
                    }else{
                        msg.edit(`Time left: ${time} seconds`);
                    }
                }
                var editr = setInterval(edit, 2500);
            });


            client.on('messageReactionAdd', (reaction, user) => {
                if(reaction.message.author.username == client.user.username && reaction.message.content.includes("enter the giveaway") && !user.bot){
                    reactions.push(user);
                }
            });
        };
        }
    } else {
        message.channel.send("No perms pal!")
    }
}
*/
exports.help = {
    name: "gd",
    aliases: []
}

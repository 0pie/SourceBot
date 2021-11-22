const Discord = require("discord.js");
const client = new Discord.Client();
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
var reactions = [];
const messages = require("../modules/messages");

exports.run = async (client, message, args) => {
    var giveawayChannel, winnersamt, min, max, time2, time, prize;

    if (config.giveawaySystem.enabled === true) {
        if (!message.member.roles.find(r => r.name == config.giveawaySystem.permissionRole)) { return messages.EmbedInvalidArgsMessages(message, "No Permission"); }
        var filter = m => m.author.id === message.author.id;

        message.channel.send(config.giveawaySystem.messages.inputChannel.message);//"🎉 Giveaway Setup!\nSo you want to start a giveaway?\nPlease type the name of the channel you wish the giveaway to take place in.");
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
        }).then(collected => {
            giveawayChannel = collected.first().content;
            if(giveawayChannel === "cancel") return message.channel.send("Cancelling...");
            try{
                giveawayChannel = message.guild.channels.find(c => c.name == giveawayChannel);
            }
            catch(error){
                return message.channel.send(config.giveawaySystem.messages.invalidChannel.message);//"You said an invalid channel.\nAborting Giveaway Setup.")
            }
            if (!giveawayChannel) {
                return message.channel.send(config.giveawaySystem.messages.invalidChannel.message);//"You said an invalid channel.\nAborting Giveaway Setup.")
            }
            message.channel.send(config.giveawaySystem.messages.inputSeconds.message.replace(/{giveawayChannel}/g, `<#${giveawayChannel.id}>`));//🎉 Nice, so the giveaway is going to take place in <#${giveawayChannel.id}>!\nNext, please input the amount of time you wish the giveaway to last for.\nNOTE: INPUT TIME AS SECONDS!`);
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            }).then(collected => {
                time = collected.first().content;
                if(time === "cancel") return message.channel.send("Cancelling...");
                time = parseInt(time);
                message.channel.send(config.giveawaySystem.messages.inputPrize.message.replace(/{giveawayChannel}/g, `<#${giveawayChannel.id}>`).replace(/{time}/g, time));//))//`🎉 Okaly Dokaly, So, the giveaway is taking place in <#${giveawayChannel.id}> and is lasting for **${time}** seconds.\nWhat do you want the giveaway prize to be?`);
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 20000,
                    errors: ['time']
                }).then(collected => {
                    prize = collected.first().content;
                    if(prize === "cancel") return message.channel.send("Cancelling...");

                    prize = prize.substring(0, 150)
                    message.channel.send(config.giveawaySystem.messages.startingGiveaway.message)//`🎉 Starting the giveaway.`)

                    time2 = time;

                    let embed = new Discord.RichEmbed()
                        .setAuthor(config.giveawaySystem.messages.giveawayTime.embed.title)
                        .setDescription(config.giveawaySystem.messages.giveawayTime.message.replace(/{prize}/g, prize))//`React with: 🎉\nTo be entered to win: **${prize}**`)
                        .setFooter(config.giveawaySystem.messages.giveawayTime.embed.footer.replace(/{time}/g, time))//`Time left: ${time2}`)

                    let No1Won = new Discord.RichEmbed()
                        .setAuthor(config.giveawaySystem.messages.noOneWonGiveaway.embed.title)//`🎉 GIVEAWAY 🎉`)
                        .setColor(config.giveawaySystem.messages.noOneWonGiveaway.embed.color)
                        .setDescription(config.giveawaySystem.messages.noOneWonGiveaway.message)//`Nobody won this giveaway. Since nobody entered it!`)

                    let timeEmbed = new Discord.RichEmbed()
                        .setAuthor(`🎉 GIVEAWAY 🎉`)
                        .setDescription(`Time left: ${time}`)

                    timer = giveawayChannel.send(embed).then((msg) => {
                        msg.react("🎉")

                        function countdown() {
                            if (time <= 0) {

                                if (reactions.length <= 0) return msg.edit(No1Won);
                                if (!msg) return;

                                min = Math.ceil(0);
                                max = Math.floor(reactions.length);
                                var winner = Math.floor(Math.random() * (max - min)) + min;

                                let Some1Won = new Discord.RichEmbed()
                                    .setAuthor(config.giveawaySystem.messages.somebodyWon.embed.title)//`🎉 GIVEAWAY 🎉`)
                                    .setColor(config.giveawaySystem.messages.somebodyWon.embed.color)
                                    .setDescription(config.giveawaySystem.messages.somebodyWon.message
                                        .replace(/{winner}/g, reactions[winner])
                                        .replace(/{prize}/g, prize))//`Congrats to ${reactions[winner]} on winning **${prize}**`)

                                msg.edit(Some1Won);
                                //console.log(`${reactions[winner]} has won!`);
                                clearInterval(countr);
                            } else {
                                time = time - 1;
                            }
                        }
                        var countr = setInterval(countdown, 1000);

                        function edit() {
                            if (time <= 0) {
                                clearInterval(editr);
                            } else {

                                time2 = time

                                let embed = new Discord.RichEmbed()
                                    .setAuthor(config.giveawaySystem.messages.giveawayTime.embed.title)//`ITS GIVEAWAY TIME!`)
                                    .setDescription(config.giveawaySystem.messages.giveawayTime.message.replace(/{prize}/g, prize))//`React with: 🎉\nTo be entered to win: **${prize}**`)
                                    .setFooter(config.giveawaySystem.messages.giveawayTime.embed.footer.replace(/{time}/g, time2))//`Time left: ${time2}`)

                                //console.log(`message: ${msg.embeds[0].description}`)
                                msg.edit(embed);
                            }
                        }
                        var editr = setInterval(edit, 2500);

                        client.on('messageReactionAdd', (reaction, user) => {
                            if (!msg.embeds) {
                                return;
                            }
                            if (reaction.message.author.username == client.user.username && reaction.message.embeds[0].description
                                .includes(config.giveawaySystem.messages.giveawayTime.message
                                    .replace(/{prize}/g, prize))/*`To be entered to win`)*/ && !user.bot) {
                                reactions.push(user);
                            }
                        });
                    });
                });
            });
        });
    }
};
exports.help = {
    name: "giveaway",
    aliases: config.giveawaySystem.aliases
};
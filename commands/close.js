const Discord = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require("../modules/messages.js");

module.exports.run = async (bot, message, args) => {
    var reason = args.join(" ");

    if (!reason) {
        reason = "No Reason Provided";
    }
/*
    message.channel.send(`Are you sure you want to close this ticket? Once confirmed, you cannot reverse this action!\nTo confirm, type \`-confirm\`. This will time out in 10 seconds and be cancelled.`)
        .then((m) => {
            message.channel.awaitMessages(response => response.content === '-confirm', {
                    max: 1,
                    time: 10000,
                    errors: ['time'],
                })

                .then((collected) => {
                    */
                    let LOGembed = new Discord.RichEmbed()
                        .setAuthor(config.ticket.close.messages.log.embed.title)
                        .setColor(config.ticket.close.messages.log.embed.color)
                        .addField("Executor:", `<@${message.author.id}>`)
                        .addField("Ticket Closed:", `${message.channel.name}`)
                        .addField("Reason:", `${reason}`);
                        if(config.ticketSystem.logTicketClose === true) {
                            try{
                            let logsChannel = message.guild.channels.find(c => c.name === config.channel.logs);
                            logsChannel.send(LOGembed);
                            }
                            catch(error){
                                if(error){
                                    return messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.logs, "Close Ticket", config.messages.channelNotFound.embed.footer);
                                }
                            }
                        }
                    //let logsChannel = message.guild.channels.find(c => c.name === config.logs_channel);
                    //if(!logsChannel) { message.channel.send("Closing "); } else {logsChannel.send(LOGembed);}
                    //message.channel.delete();

                    // Issue is with LOGEmbed <-- Not able to find channel it breaks
                    if(config.ticketSystem.saveTranscriptsUponClose === false) { return; }
                    try {
                    message.channel.fetchMessages().then(msgs => {
                        for (var i in msgs.array()) {
                            let logs = `${msgs.array()[i].author.username}:${msgs.array()[i].author.discriminator} -> ${msgs.array()[i].content}`;
                            fs.appendFile(`${process.cwd()}/assets/logs/${Date().substring(0,18)}-${message.channel.name}.json`, `[${Date().substring(0,24)}]${msgs.array()[i].author.username}:${msgs.array()[i].author.discriminator} -> ${msgs.array()[i].content}\n`, (err) => {
                                if (err) console.log(err);
                            });
                        }
                    }).then(message.channel.delete());
                }
                catch(error){
                    console.warn(error);
                }

                    /*
                })
        .catch(() => {
            m.edit('Ticket close timed out, the ticket was not closed.');
        });
    });
    */
};
module.exports.help = {
    name: "close",
    aliases: config.ticket.close.aliases
};
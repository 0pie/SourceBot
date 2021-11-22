const Discord = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const embeds = require("../modules/embeds");
const messages = require("../modules/messages");
var size = 0;

module.exports.run = async (bot, message, args) => {
    if (config.moderation.transcripts.enabled === false) { return; }
    if (message.member.roles.find(r => r.name === config.moderation.transcripts.permissionRole)) {
        d = `${Date().substring(0,3)}-${Date().substring(4,7)}-${Date().substring(8,10)}-${Date().substring(11,15)}`;
        let file1 = `/assets/logs/${d}-${message.channel.name}-${Math.floor(Math.random() * 10000000)}.json`;
        let file = fs.writeFileSync(`${process.cwd()}${file1}`);

        createdTime = message.channel.createdAt;
        // Loop the process until size is met, if there is an error, break. Then save to file.
        message.channel.fetchMessages({
            limit: 100
        }).then(msgs => {
            for (i in msgs.array()) {
                //console.log(`${msgs.array()[i].author.username}:${msgs.array()[i].author.id} -> ${msgs.array()[i].content}`);
                fs.appendFile(`${process.cwd()}${file1}`, `[${msgs.array()[i].createdAt}]${msgs.array()[i].author.username}:${msgs.array()[i].author.discriminator} -> ${msgs.array()[i].content}\n`, (err) => {
                    if (err) console.log(err);
                });
            }
            /*
            message.channel.fetchMessages({
                limit: 100
            }).then(m => {
                for (i in m.array()) {
                    fs.appendFile(`${process.cwd()}/assets/logs/${d}-${message.channel.name}.json`, `[${msgs.array()[i].createdAt}]${msgs.array()[i].author.username}:${msgs.array()[i].author.discriminator} -> ${msgs.array()[i].content}\n`, (err) => {
                        if (err) console.log(err);
                    });
                }
            });
            */
        });
        var embeds3;
            if (config.messages.embed.override === true) {
                embeds3 = config.messages.embed.footer;
            } else {
                embeds3 = config.moderation.transcripts.messages.log.embed.footer;
            }
        if(config.moderation.transcripts.log === true){
            let Role_Deleted = new Discord.RichEmbed()
                .setAuthor(config.moderation.transcripts.messages.log.embed.title)
                .setColor(config.moderation.transcripts.messages.log.embed.color)
                .addField("Executor", `<@${message.author.id}>`)
                .setFooter(embeds3);
            try{
            message.guild.channels.find(c => c.name === config.channel.logs).send(Role_Deleted);
            }
            catch(error){
                if(error){
                    messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.logs, "Transcript", config.messages.channelNotFound.embed.footer);
                }
            }
            }
        message.channel.send(`Transcript saved at the following location: ${file1}`);
    } else {
        return messages.EmbedInvalidArgsMessages(message, "No Permission", config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer);
    }
};
module.exports.help = {
    name: "transcript",
    aliases: config.moderation.transcripts.aliases
};
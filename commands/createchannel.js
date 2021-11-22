const Discord = require("discord.js");
const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const logs = require('../modules/logs.js')
const messages = require("../modules/messages");

module.exports.run = async (client, message, args) => {
    if(config.moderation.createChannel.enabled === true){
    if(message.member.roles.find(r => r.name === config.moderation.createChannel.permissionRole)){

        let channeloption = args[0];
        let channelname = args.slice(1).join(' ');
        
        if(!channeloption || channelname.length > 100 || channelname.length < 1){
            return messages.EmbedMessages(message, "Create Channel Command No Option", config.moderation.createChannel.messages.noOption.embed.footer, config.moderation.createChannel.messages.noOption.embed.footer, config.moderation.createChannel.messages.noOption.embed.footer, config.moderation.createChannel.messages.noOption.embed.footer);
        }else{
            if(channeloption.toLowerCase() == "text" || channeloption.toLowerCase() == "voice"){
                if(!channelname){
                    return messages.EmbedMessages(message, "Create Channel Command No Name", config.moderation.createChannel.messages.noName.embed.footer, config.moderation.createChannel.messages.noName.embed.footer, config.moderation.createChannel.messages.noName.embed.footer, config.moderation.createChannel.messages.noName.embed.footer);
                }else{
                    let channeloption1 = channeloption.toLowerCase();
                    message.guild.createChannel(channelname, { type: channeloption1} );
                    messages.EmbedMessages(message, "Create Channel Command Channel Created", config.moderation.createChannel.messages.channelCreated.embed.footer, config.moderation.createChannel.messages.channelCreated.embed.footer, config.moderation.createChannel.messages.channelCreated.embed.footer, config.moderation.createChannel.messages.channelCreated.embed.footer);       

                    var embeds3;
                    if (config.messages.embed.override === true) {
                        embeds3 = config.messages.embed.footer;
                    } else {
                        embeds3 = config.moderation.createChannel.messages.log.embed.footer;
                    }
                    let Channel_Created = new Discord.RichEmbed()
                    .setAuthor(config.moderation.createChannel.messages.log.embed.title)
                    .setColor(config.moderation.createChannel.messages.log.embed.color)
                    .addField("Executor", `<@${message.author.id}>`)
                    .addField("Channel Type", channeloption)
                    .addField("Channel Name", `${channelname}`)
                    .setFooter(embeds3);
                    try{
                    return message.guild.channels.find(c => c.name === config.channel.logs).send(Channel_Created);
                    }
                    catch(error){
                        if(error){
                            return messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.logs, "createChannel", config.messages.channelNotFound.embed.footer);
                        }
                    }
                }
            }else{
                return messages.EmbedInvalidArgsMessages(message, "Invalid Option", config.messages.invalidOption.embed.footer, config.messages.invalidOption.embed.footer, config.messages.invalidOption.embed.footer);
            }
        }
    }else{
        return messages.EmbedInvalidArgsMessages(message, "No Permission", config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer);
    }
}
};
module.exports.help = {
    name: "createchannel",
    aliases: config.moderation.createChannel.aliases
};
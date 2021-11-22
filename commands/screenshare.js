const fs = require("fs")
const yaml = require("js-yaml")
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))
const messages = require("../modules/messages.js");

module.exports.run = async (bot, message, args) => {
  if(config.misc.screenshare.enabled === true){
    if(message.member.voiceChannel != null){  
        let embed = new Discord.RichEmbed()
        .setAuthor(config.misc.screenshare.messages.embed.title)
        .setColor(config.misc.screenshare.messages.embed.color)
        .addField("Enabled", `In **${message.member.voiceChannel.name}**. Click here: [link](https://discordapp.com/channels/${message.guild.id}/${message.member.voiceChannel.id})`)
        message.channel.send(embed);
    }else{
      messages.EmbedInvalidArgsMessages(message, "Member Not In Voice Channel", config.misc.screenshare.messages.embed.footer, config.misc.screenshare.messages.embed.footer, config.misc.screenshare.messages.embed.footer, config.misc.screenshare.messages.embed.footer);
    }
  }
};
module.exports.help = {
  name: "screenshare",
  aliases: config.misc.screenshare.aliases
};
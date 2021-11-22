const fs = require('fs');
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

module.exports = async (reaction, user) => {
    try {
        var denied = reaction.message.guild.members.get(user.id).roles.find(r => r.name === config.roles.staff) && reaction.emoji.name == "🔴" && reaction.message.channel.name == config.channel.suggestions.normal;
        var accepted = reaction.message.guild.members.get(user.id).roles.find(r => r.name === config.roles.staff) && reaction.emoji.name == "🔵" && reaction.message.channel.name == config.channel.suggestions.normal;
        if (denied) {
          let deniedChannel = reaction.message.guild.channels.find(c => c.name === config.channel.suggestions.denied);
          if (!deniedChannel) {
            message.reply(`There is no **${config.channel.suggestions.denied}** Channel.\n\nPlease create one to deny suggestions.`).then(msg => {
              msg.delete(5000);
            });
          } else {
            if (!reaction.message.embeds[0]) {
              let msgEmbed = new Discord.RichEmbed()
                .setAuthor(config.general.suggestions.messages.inSuggestionsChannel.embed.title.replace(/{tagauthor}/g, `${reaction.message.author.username}#${reaction.message.author.discriminator}`))
                .setColor(config.general.suggestions.messages.inSuggestionsChannel.embed.color)
                .setDescription(reaction.message.content);
              deniedChannel.send(msgEmbed);
            } else {
              let msgEmbed = new Discord.RichEmbed()
                .setAuthor(config.general.suggestions.messages.inSuggestionsChannel.embed.title.replace(/{tagauthor}/g, `${reaction.message.embeds[0].author.name.match(/(\S*)#([0-9]{4})/)[1]}#${reaction.message.embeds[0].author.name.match(/(\S*)#([0-9]{4})/)[2]}`))
                .setColor(config.general.suggestions.messages.inSuggestionsChannel.embed.color)
                .setDescription(reaction.message.embeds[0].description);
              deniedChannel.send(msgEmbed);
            }

          }
          reaction.message.delete();
        } else {
          if (accepted) {

            let acceptedChannel = reaction.message.guild.channels.find(c => c.name === config.channel.suggestions.accepted);
            if (!acceptedChannel) {
              message.reply(`There is no **${config.channel.suggestions.accepted}** Channel.\n\nPlease create one to accept suggestions.`).then(msg => {
                msg.delete(5000);
              });
            } else {
              if (!reaction.message.embeds[0]) {
                let msgEmbed = new Discord.RichEmbed()
                  .setAuthor(config.general.suggestions.messages.inSuggestionsChannel.embed.title.replace(/{tagauthor}/g, `${reaction.message.author.username}#${reaction.message.author.discriminator}`))
                  .setColor(config.general.suggestions.messages.inSuggestionsChannel.embed.color)
                  .setDescription(reaction.message.content)
                acceptedChannel.send(msgEmbed);
              } else {
                let msgEmbed = new Discord.RichEmbed()
                  .setAuthor(config.general.suggestions.messages.inSuggestionsChannel.embed.title.replace(/{tagauthor}/g, `${reaction.message.embeds[0].author.name.match(/(\S*)#([0-9]{4})/)[1]}#${reaction.message.embeds[0].author.name.match(/(\S*)#([0-9]{4})/)[2]}`))
                  .setColor(config.general.suggestions.messages.inSuggestionsChannel.embed.color)
                  .setDescription(reaction.message.embeds[0].description)
                acceptedChannel.send(msgEmbed);
              }

            }
            reaction.message.delete();
          }

        }
      }
      catch (error) {
        if (error) {
          console.log(error);
        }
      }
};
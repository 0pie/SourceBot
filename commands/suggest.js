const Discord = require("discord.js");
const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync("./config.yml", "utf8"));
const messages = require("../modules/messages");

module.exports.run = async function(client, message, args) {

  // Variables
  var argument = args.join(" "),
    cooldown2 = new Set();

  if (config.general.suggestions.enabled === false) {
    return;
  }

  message.delete();

  // Cooldown Checker
  if (cooldown2.has(message.author.id)) {
    return message.channel.send(`${config.general.suggestions.messages.cooldownActive.replace(/{tagauthor}/g, `${message.author}`).replace(/{cooldown}/g, `${cooldown2}`)}`);
  }

  if (!argument) {
    return messages.EmbedMessages(message, "Suggestions noSuggestion", message.author.tag);
  }
  var embeds;
        if(config.messages.embed.override === true) {
            embeds = config.messages.embed.footer;
        } else {
            embeds = config.general.suggestions.messages.inSuggestionsChannel.embed.footer;
        }

  let suggestions_inSuggestionsChannel = new Discord.RichEmbed()
    .setAuthor(config.general.suggestions.messages.inSuggestionsChannel.embed.title.replace(/{tagauthor}/g, `${message.author.tag}`))
    .setColor(config.general.suggestions.messages.inSuggestionsChannel.embed.color)
    .setDescription(argument)
    .setFooter(embeds);
  try {
    message.guild.channels.find(c => c.name == `${config.channel.suggestions.normal}`).send(suggestions_inSuggestionsChannel).then(async msg => {
      msg.react(config.general.suggestions.emojis.upvote);
      msg.react(config.general.suggestions.emojis.downvote);
    });
  } catch (error) {
    if (error) {
      return messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.suggestions.normal, "Suggestions", config.messages.channelNotFound.embed.footer);
    }
  }

  messages.EmbedMessages(message, "Suggestions suggestionAdded", message.author.tag);

  // Cooldown adder
  cooldown2.add(message.author.id);
  setTimeout(function () {
    cooldown2.delete(message.author.id);
  }, config.suggestionscommand_cooldown_per_suggestion);

};
module.exports.help = {
  name: "suggest",
  aliases: config.general.suggestions.aliases
};
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
var user_warns = JSON.parse(fs.readFileSync(`${process.cwd()}/assets/Required-Files/Systems/Warnings/warnings.json`));
const Discord = require("discord.js");
const messages = require("./messages.js");

exports.checkWarnings = function (id, message) {
  var warns = user_warns[id];
  var embeds;
  if (config.messages.embed.override === true) {
    embeds = config.messages.embed.footer;
  } else {
    embeds = config.warningSystem.messages.warnings.embed.footer;
  }

  if (!warns) {
    return messages.EmbedMessages(message, "Warning Not Found", config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer);
  }
  if (warns.length >= 1) {
    var embed = new Discord.RichEmbed()
      .setAuthor(config.warningSystem.messages.warnings.embed.title)
      .setColor(config.warningSystem.messages.warnings.embed.color)
      .setFooter(embeds);
    for (let i = 0; i < warns.length; i++) {
      const warn = warns[i];
      if(config.core.debug === true) {
        console.log(warn);
      }
      //message.channel.send(`Reason: ${warn.reason}, Author: <@${warn.authorid}>`);
      embed.addField(`${i+1})`, `**Reason:** ${warn.reason} | **By:** <@${warn.authorid}>`);
    }

    message.channel.send(embed);

    //message.channel.send(`Reason ${g.reason}  AUTHOR: <@${g.authorid}>`);
    return;
  } else {
    return messages.EmbedMessages(message, "Warning Not Found", config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer);
  }
};

exports.addWarning = function (id, reason, author, message) {
  if (!user_warns[id]) {
    var user = (user_warns[id] = []);
  } else {
    var user = user_warns[id];
  }

  user.push({
    reason: reason,
    authorid: author
  });

  fs.writeFileSync(`${process.cwd()}/assets/Required-Files/Systems/Warnings/warnings.json`, JSON.stringify(user_warns));
  return;
};

exports.removeWarning = function (id, num, message) {
  var warns = user_warns[id];
  if (!warns) {
    return messages.EmbedMessages(message, "Warning Not Found", config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer);
  }
  if (warns.length >= num - 1) {
    warns.splice(0, num - 1);
    fs.writeFileSync(`${process.cwd()}/assets/Required-Files/Systems/Warnings/warnings.json`, JSON.stringify(user_warns));
    return messages.EmbedMessages(message, "Warning Removed", config.warningSystem.messages.warningRemoved.embed.footer, config.warningSystem.messages.warningRemoved.embed.footer, config.warningSystem.messages.warningRemoved.embed.footer, config.warningSystem.messages.warningRemoved.embed.footer)
  } else {
    return messages.EmbedMessages(message, "Warning Not Found", config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer);
  }
};

exports.staffRollback = function (id, author, message) {
  var warns = user_warns[id];
  if (!warns) {
    return messages.EmbedMessages(message, "Warning Not Found", config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer);
  }
  if (warns.length >= 1) {
    for (let i = 0; i < warns.length; i++) {
      if (warns[i].authorid == author) {
        warns.splice(i, 1);
      }
    }
    fs.writeFileSync(`${process.cwd()}/assets/Required-Files/Systems/Warnings/warnings.json`, JSON.stringify(user_warns));
    return;
  } else {
    return messages.EmbedMessages(message, "Warning Not Found", config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer);
  }
};

exports.removeLatest = function (id, message) {
  var warns = user_warns[id];
  if (!warns) {
    return messages.EmbedMessages(message, "Warning Not Found", config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer);
  }
  if (warns.length >= 1) {
    warns.pop();
    fs.writeFileSync(`${process.cwd()}/assets/Required-Files/Systems/Warnings/warnings.json`, JSON.stringify(user_warns));
    return messages.EmbedMessages(message, "Warning Removed", config.warningSystem.messages.warningRemoved.embed.footer, config.warningSystem.messages.warningRemoved.embed.footer, config.warningSystem.messages.warningRemoved.embed.footer, config.warningSystem.messages.warningRemoved.embed.footer)
  } else {
    return messages.EmbedMessages(message, "Warning Not Found", config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer, config.warningSystem.messages.userHasNoWarnings.embed.footer);
  }

};
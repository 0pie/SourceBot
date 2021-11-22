const Discord = require("discord.js");
const fs = require("fs")
let yaml = require("js-yaml")
let xp = require(`${process.cwd()}/assets/data/xp.json`);
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))

module.exports.run = async (bot, message, args) => {
  if (config.xpSystem.enabled === true) {
    try {
      var curxp, curlvl, nxtLvlXp, difference;
      curxp = xp[message.author.id].xp;
      curlvl = xp[message.author.id].level;
      nxtLvlXp = curlvl * 5000;
      difference = nxtLvlXp - curxp;
        if (!xp[message.author.id]) {
          xp[message.author.id] = {
            xp: 0,
            level: 1
          };
        }
    } catch (error) {
      if (error) {
        curxp = 0;
        curlvl = 0;
        if (config.core.debug === true) {
          console.log(error);
        }
      }
    }
    if(config.core.embeds === true) {
    let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}'s Level`)
      .setColor("#FF56aB")
      .addField("Current Level", curlvl, true)
      .addField("Current XP", curxp, true)
      .setFooter(`You need ${difference} XP required to level up!`, message.author.displayAvatarURL);

    message.channel.send(embed);
  } else {
    return message.reply(`@${message.author} Your current level is: ${curlvl}. Your current XP is: ${curxp}. You need ${difference} XP required to level up!`)
  }
}
};

module.exports.help = {
  name: "level",
  aliases: config.economy.xp.level.aliases
};
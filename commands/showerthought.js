const request = require('superagent');
const chalk = require('chalk');
let cooldown = new Set();
const fs = require("fs")
const yaml = require("js-yaml")
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))

module.exports.run = async (bot, message, args) => {
  var results = 75;

  if (config.fun.showerThoughts.enabled === false) {
    return;
  }
  try{

  request
    .get('https://www.reddit.com/r/showerthoughts/top.json')
    .query({
      limit: results
    })
    .set('User-Agent', 'Liam')
    .end(function (err, res) {
      if (!err && res.ok) {
        var random = randomIntFromInterval(2, results);
        var showerthought = res.body.data.children[random].data.title;
        let embed = new Discord.RichEmbed()
          .setAuthor(showerthought)
          .setColor(config.fun.showerThoughts.embed.color)
        message.channel.send(embed);
      }
    });
  }
  catch(error){
    return message.channel.send("An error occured. Please try again.");
  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};
module.exports.help = {
  name: "showerthought",
  aliases: config.fun.showerThoughts.aliases
};
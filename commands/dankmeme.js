const request = require('superagent');
const chalk = require('chalk');
let cooldown = new Set();
const fs = require("fs")
const yaml = require("js-yaml")
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))

module.exports.run = async (bot, message, args) => {
  var results = 75;
  if (config.fun.dankMemes.enabled === false) {
    return;
  }
  try{
  request
    .get('https://www.reddit.com/r/dankmemes/top.json')
    .query({
      limit: results
    })
    .set('User-Agent', 'Liam')
    .end(function (err, res) {
      if (!err && res.ok) {
        var random = randomIntFromInterval(2, results);
        var memeTitle = res.body.data.children[random].data.title;
        var memeURL = res.body.data.children[random].data.url;
        let embed = new Discord.RichEmbed()
          .setAuthor(memeTitle)
          .setColor(config.fun.dankMemes.embed.color)
          .setImage(memeURL);
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
  name: "dankmeme",
  aliases: config.fun.dankMemes.aliases
};
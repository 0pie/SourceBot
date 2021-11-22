const Discord = require("discord.js");
const client = new Discord.Client();
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require("../modules/messages");
const words = require(`${process.cwd()}/assets/data/scrambledWords.json`).notScrambled;
let counter = require(`${process.cwd()}/assets/data/counter.json`).counter;
const coins = require(`${process.cwd()}/assets/data/coins.json`);

exports.run = async (client, message, args) => {
    if(config.game.scrambleWord.enabled === false) return;

    var originalAuthor = message.author.id;
    let word2 = await words;
    let word1 = Math.floor(Math.random() * word2.length) - 1;
    let amountToWin = Math.floor(Math.random() * 100);
    let str = words[word1];
    let activeChannels = [];

    if(str === undefined) {
        str = "los angeles";
    }
    var embeds;
        if(config.messages.embed.override === true) {
            embeds = config.messages.embed.footer;
        } else {
            embeds = config.game.scrambleWord.messages.jumbledWord.embed.footer;
        }

        var embeds1;
        if(config.messages.embed.override === true) {
            embeds1 = config.messages.embed.footer;
        } else {
            embeds1 = config.game.scrambleWord.messages.notDoneInTime.embed.footer;
        }
        var embeds2;
        if(config.messages.embed.override === true) {
            embeds2 = config.messages.embed.footer;
        } else {
            embeds2 = config.game.scrambleWord.messages.Correct.embed.footer;
        }

    if(activeChannels.includes(message.channel.id)) {
        return message.channel.send("There is already a game in progress.");
    } else {
        activeChannels.push(message.channel.id);
    }
    try{
        function scramble (word) {
    
            var unique = {};
            var newWord = "";
            var wordLength = word.length;
        
            word = word.toLowerCase();
        
            while(wordLength != newWord.length) {
        
                var random = ~~(Math.random() * wordLength);
        
                if(
        
                  unique[random]
                  ||
                  random == newWord.length && random != (wordLength - 1)
        
                ) continue;
        
                unique[random] = true;
                newWord += word[random];
        
            };
        
            return newWord;
        
        }
        let i = scramble(str);
        let embed = new Discord.RichEmbed()
        .setAuthor(config.game.scrambleWord.messages.jumbledWord.embed.title)
        .setColor(config.game.scrambleWord.messages.jumbledWord.embed.color)
        .setDescription(config.game.scrambleWord.messages.jumbledWord.message
            .replace(/{word}/g, i)
            .replace(/{coins}/g, amountToWin))
        .setFooter(embeds);

    let question = await message.channel.send(embed);
    const wordsCollector = message.channel.createMessageCollector(
        msg => !msg.author.bot && msg.author.id && msg.content.trim().toLowerCase() === str.toLowerCase() && originalAuthor,
        { maxMatches: 1, time: 5 * 60 * 1000 }
      );
    
    wordsCollector.on('end', (answers, reason) => {
        activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
        if(reason === 'time') {
            if(config.core.embeds === false) return message.channel.send(config.game.scrambleWord.messages.notDoneInTime.message
                .replace(/{word}/g, str));
            let embed = new Discord.RichEmbed()
            .setAuthor(config.game.scrambledWord.messages.notDoneInTime.embed.tile)
            .setColor(config.game.scrambleWord.messages.notDoneInTime.embed.color)
            .setDescription(config.game.scrambleWord.messages.notDoneInTime.message
                .replace(/{word}/g, str))
            .setFooter(embeds1);
            return message.channel.send(embed);
        }
        else if (reason === 'matchesLimit') {
            let answer = answers.first();

            coins[answer.author.id].coins += amountToWin;
            if(config.core.embeds === false) return message.channel.send(config.game.scrambleWord.messages.Correct.message
                .replace(/{user}/g, answer.author)
                .replace(/{coins}/g, amountToWin));
            let embed = new Discord.RichEmbed()
            .setAuthor(config.game.scrambleWord.messages.Correct.embed.title)
            .setColor(config.game.scrambleWord.messages.Correct.embed.color)
            .setDescription(config.game.scrambleWord.messages.Correct.message
                .replace(/{user}/g, answer.author)
                .replace(/{coins}/g, amountToWin))
            .setFooter(embeds2);
            return message.channel.send(embed);
        }
    });
    }
    catch(error){
        scramble(str);
        let embed = new Discord.RichEmbed()
        .setAuthor(config.game.scrambleWord.messages.jumbledWord.embed.title)
        .setColor(config.game.scrambleWord.messages.jumbledWord.embed.color)
        .setDescription(config.game.scrambleWord.messages.jumbledWord.message
            .replace(/{word}/g, i)
            .replace(/{coins}/g, amountToWin))
        .setFooter(embeds);
        let question = await message.channel.send(embed);
        const wordsCollector = message.channel.createMessageCollector(
            msg => !msg.author.bot && msg.author.id && msg.content.trim().toLowerCase() === str.toLowerCase() && originalAuthor,
            { maxMatches: 1, time: 5 * 60 * 1000 }
          );
        
        wordsCollector.on('end', (answers, reason) => {
            activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
            if(reason === 'time') {
                let embed = new Discord.RichEmbed()
            .setAuthor(config.game.scrambledWord.messages.notDoneInTime.embed.tile)
            .setColor(config.game.scrambleWord.messages.notDoneInTime.embed.color)
            .setDescription(config.game.scrambleWord.messages.notDoneInTime.message
                .replace(/{word}/g, str))
            .setFooter(embeds1)
            return message.channel.send(embed);
            }
            else if (reason === 'matchesLimit') {
                let answer = answers.first();
    
                coins[answer.author.id].coins += amountToWin;
                if(config.core.embeds === false) return message.channel.send(config.game.scrambleWord.messages.Correct.message
                    .replace(/{user}/g, answer.author)
                    .replace(/{coins}/g, amountToWin));
                let embed = new Discord.RichEmbed()
                .setAuthor(config.game.scrambleWord.messages.Correct.embed.title)
                .setColor(config.game.scrambleWord.messages.Correct.embed.color)
                .setDescription(config.game.scrambleWord.messages.Correct.message
                    .replace(/{user}/g, answer.author)
                    .replace(/{coins}/g, amountToWin))
                .setFooter(embeds2);
                return message.channel.send(embed);
            }
        });
    }
};
exports.help = {
  name: "scramble",
  aliases: config.game.scrambleWord.aliases
};
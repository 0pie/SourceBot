const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs')
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const xp = require(`${process.cwd()}/assets/data/xp.json`);
const messages = require("../modules/messages");

module.exports = async (message) => {
    // Var

    try{


        if(config.xpSystem.enabled === true){
            if(config.xpSystem.blockChannels.enabled === true) {
                if(config.xpSystem.blockChannels.channels.includes(message.channel.name)) {return;}
            }

            // Checks if the message is from a bot. If not, return nothing.
            if(message.author.bot === true) return;

            let addXP = Math.floor(Math.random() * 10) + 50;

            let xpCooldownSeconds = config.xpSystem.cooldown.timer;
            let xpCooldown = new Set();

            let debugMode = config.core.debug;

            // If the message author doesn't have any xp nor a level, creates xp and levels for them in the file
            if(!xp[message.author.id]) {
                xp[message.author.id] = {
                    xp: 0,
                    level: 1
                };
            }

            let currentXP = xp[message.author.id].xp;
            let currentLevel = xp[message.author.id].level;
            let nextLevel = xp[message.author.id].level * 5000;

            xp[message.author.id].xp = currentXP + addXP;

            if(debugMode === true){
                console.log(`DEBUG: XP System\nDEBUG: UserXP: ${currentXP}, UserLevel: ${currentLevel}, UserNextLevel: ${nextLevel}, UserXPAdded: ${addXP}, CooldownTime: ${xpCooldown}`);
            }

            if(nextLevel <= xp[message.author.id].xp) {
                xp[message.author.id].level = currentLevel + 1;

                if(config.core.embeds === true){
                    let lvlup = new Discord.RichEmbed()
                    .setAuthor(`${config.xpSystem.messages.levelUp.embed.title.replace(/{username}/g, `${message.author.username}`)}`, message.author.displayAvatarURL)
                    .setColor(`${config.xpSystem.messages.levelUp.embed.color}`)
                    .addField("New Level", currentLevel + 1, true)
                    .addField("Previous Level", currentLevel, true);
                    message.channel.send(lvlup);
                }else{
                    message.channel.send(`Well done <@${message.author.id}>! You've levelled up.\n\nNew Level: ${curlvl + 1}\nPrevious Level: ${curlvl}`);
                }
            }
            fs.writeFile(`${process.cwd()}/assets/data/xp.json`, JSON.stringify(xp), (err) => {
                if (err) console.log(err);
            });
            xpCooldown.add(message.author.id);
            setTimeout(function () {
                xpCooldown.delete(message.author.id);
            }, xpCooldownSeconds * 1000);
        }
    }
    catch(Error){
        if(Error){
            console.log(Error);
        }
    }
};
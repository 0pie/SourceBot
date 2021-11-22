const Discord = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
//const gangs = require("../../../systems/gang.js");

module.exports.run = async (bot, message, args) => {
    if (config.info.userInfo.enabled === true) {
        let coin = require(`${process.cwd()}/assets/data/coins.json`);
        let coins = await coin;

        let xp = require(`${process.cwd()}/assets/data/xp.json`);
        /*
        let curxp = xp[message.author.id].xp;
        let curlvl = xp[message.author.id].level;
        let nxtLvl = curlvl + 1
        let nxtLvlXp = curlvl * 5000;
        let difference = nxtLvlXp - curxp;
        */

        var curxp, curlvl, nextLvl, nxtLvlXp, difference, Authorcoins;
/*
        let gang = gangs.getUserInfo(message.author.id);
        if(gang == null || gang == undefined) {
            gang = "Not in a gang";
        }*/
        //message.channel.send(gang);
        
        try{
            if (!coins[message.author.id].coins) {
                Authorcoins = 0;
            } else {
                Authorcoins = coins[message.author.id].coins;
            }
        }
        catch(error){
            if(error){
                usercoins = 0;

                if(config.core.debug === true){
                    console.log(error);
                }
            }
        }

        // Checks if the user has any XP
        try{
            if(!xp[message.author.id].xp){
                curxp = 0;
            } else {
                curxp = xp[message.author.id].xp;
            }
        }
        catch(error){
            if(error){
                curxp = 0;

                if(config.core.debug === true){
                    console.log(error);
                }
            }
        }

        // Checks if the user has a level
        try{
            if(!xp[message.author.id].level){
                curlvl = 1;
            } else{
                curlvl = xp[message.author.id].level;
                
            }
        }
        catch(error){
            if(error){
                curlvl = 0;

                if(config.core.debug === true){
                    console.log(error);
                }
            }
        }

        nxtLvl = curlvl + 1;
        nxtLvlXp = curlvl * 5000;
        difference = nxtLvlXp - curxp;

        let user = message.mentions.users.first();
        var usercoins;

        if (!user) {
            var embed = new Discord.RichEmbed()
                .setAuthor(`${message.author.username}'s Information!`)
                .setThumbnail(message.author.avatarURL)
                .setColor("#42f4f4")
                .addField("Full Username:", `${message.author.username}#${message.author.discriminator}`, true)
                .addField("ID:", `${message.author.id}`, true)
                .addField("Account Created At:", `${message.author.createdAt}`, true)
                .addField("Coins:", Authorcoins, true)
                .addField("Total XP:", curxp, true)
                .addField("Current Level:", curlvl, true)
                .addField("Next level:", nxtLvl, true)
                .addField("Next Level XP Needed:", nxtLvlXp, true)
                .addField("XP away from Next Level:", difference, true)
                /*
                if(config.gangs.enabled === true) {
                    embed.addField("Gang:", gang, true);
                }
                */
            message.channel.send(embed);
        } else {
            var ucurxp, ucurlvl, unxtLvl, unxtLvlXp, udifference;
            // Checks if the user has any coins

            try{
                if (!coins[user.id]) {
                    usercoins = 0;
                } else {
                    usercoins = coins[user.id].coins;
                }
            }
            catch(error){
                if(error){
                    usercoins = 0;

                    if(config.core.debug === true){
                        console.log(error);
                    }
                }
            }

            // Checks if the user has any XP
            try{
                if(!xp[user.id].xp){
                    ucurxp = 0;
                } else {
                    ucurxp = xp[user.id].xp;
                }
            }
            catch(error){
                if(error){
                    ucurxp = 0;

                    if(config.core.debug === true){
                        console.log(error);
                    }
                }
            }

            // Checks if the user has a level
            try{
                if(!xp[user.id].level){
                    ucurlvl = 1;
                } else{
                    ucurlvl = xp[user.id].xp;
                    
                }
            }
            catch(error){
                if(error){
                    ucurlvl = 0;

                    if(config.core.debug === true){
                        console.log(error);
                    }
                }
            }

            unxtLvl = ucurlvl + 1;
            unxtLvlXp = ucurlvl * 5000;
            udifference = unxtLvlXp - ucurxp;

            /*
            let ucurxp = xp[user.id].xp;
            let ucurlvl = xp[user.id].level;
            let unxtLvl = ucurlvl + 1
            let unxtLvlXp = ucurlvl * 5000;
            let udifference = unxtLvlXp - ucurxp;
            */

            let embed = new Discord.RichEmbed()
                .setAuthor(`${user.username}'s Information!`)
                .setThumbnail(user.avatarURL)
                .setColor("#42f4f4")
                .addField("Full Username:", `${user.username}#${user.discriminator}`, true)
                .addField("ID:", `${user.id}`, true)
                .addField("Account Created At:", `${user.createdAt}`, true)
                .addField("Coins:", usercoins, true)
                .addField("Total XP:", ucurxp, true)
                .addField("Current Level:", ucurlvl, true)
                .addField("Next level:", unxtLvl, true)
                .addField("Next Level XP Needed:", unxtLvlXp, true)
                .addField("XP away from Next Level:", udifference, true)
            message.channel.send(embed);
        }
    }
};
module.exports.help = {
    name: "info",
    aliases: config.info.userInfo.aliases
};
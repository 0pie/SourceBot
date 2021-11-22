const Discord = require("discord.js");
const fs = require('fs');
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const randomLeaveMessageFile = require(`${process.cwd()}/assets/Required-Files/Systems/Welcome-Leave/leave-messages.json`).randomleavemessages;
const coins = require(`${process.cwd()}/assets/data/coins.json`);
const xp = require(`${process.cwd()}/assets/data/xp.json`);
const messages = require("../modules/messages");

module.exports = async (member) => {
    try{
    var welcomeChannel = member.guild.channels.find(c => c.name == `${config.channel.joinLeave}`);
    }
    catch(error){
        if(error){
            console.log("The joinLeave channel defined in the config was not found.");
            return;
        }
    }
    var userIcon = member.user.displayAvatarURL,
        newMember = member.user.username,

        // Message Gen
        randomLeaveMessage = await randomLeaveMessageFile,
        randomLeaveMessageGen = Math.floor(Math.random() * randomLeaveMessage.length) - 1,
        randomLeaveMessageMessage = randomLeaveMessage[randomLeaveMessageGen],

        // Other Vars
        leaveMessageOption = config.leave.message.message,
        embeds,
        footer,
        resetCoins = config.core.resetCoinsAndLevelsOnLeave,
        sendLeaveMessage = config.leave.enabled;


        // Resets the users coins and XP upon leave
        if (resetCoins === true) {

            // Coins
            if (coins[member.id]) {
                delete coins[member.id];
                fs.writeFile(`${process.cwd()}/assets/data/coins.json`, JSON.stringify(coins), function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }

            // XP
            if (xp[member.id]) {
                delete xp[member.id];
                fs.writeFile(`${process.cwd()}/assets/data/xp.json`, JSON.stringify(xp), function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }

        // VC Server Stats
        if (config.VoiceChannels.serverStats.enabled.memberCount === true) {
            let uC = member.guild.channels.find(c => c.id == `${config.VoiceChannels.serverStats.channels.memberCount}`);
            uC.setName(`Total Members: ${member.guild.memberCount}`);
        }

        // Message Gen
        if (leaveMessageOption === "RANDOM") {
            leaveMessageOption = randomLeaveMessageMessage;

            if(leaveMessageOption == undefined) {
                leaveMessageOption = ":'(";
            }
        } else {
            leaveMessageOption = config.leave.message.message.replace(/{newmember}/g, `${newMember}`);
        }

        if(config.leave.message.sendInEmbed === false) {
            embeds = false;
          } else if(config.core.embeds === true) {
            embeds = true;
          }

          if(config.messages.embed.override === false) {
              footer = config.leave.message.embed.footer;
          } else {
              footer = config.messages.embed.footer;
          }

        if (sendLeaveMessage === true) {
            if (embeds === true) {
                let leaveEmbed = new Discord.RichEmbed()
                    .setColor(`${config.leave.message.embed.color}`)
                    .setThumbnail(userIcon)
                    .setAuthor(config.leave.message.embed.title.replace(/{newmember}/g, `${newMember}`))
                    .setDescription(leaveMessageOption)
                    .setFooter(footer);
                    try{
                    welcomeChannel.send(leaveEmbed);
                    }
                    catch(error){
                        if(error){
                            console.log("The joinLeave channel defined in the config was not found.");
                            return;
                        }
                    }
            } else {
                try{
                return welcomeChannel.send(leaveMessageOption);
                }
                catch(error){
                    if(error){
                        console.log("The joinLeave channel defined in the config was not found.");
                        return;
                    }
                }
            }
        }
};
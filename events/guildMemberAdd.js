const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const randomWelcomeMessageFile = require(`${process.cwd()}/assets/Required-Files/Systems/Welcome-Leave/welcome-messages.json`).randomwelcomemessages;
const blacklisted = require(`${process.cwd()}/assets/Required-Files/Systems/Blacklist/blacklists.json`);

module.exports = async (member) => {
  try {
    var welcomeChannel = member.guild.channels.find(c => c.name == `${config.channel.joinLeave}`);
  } catch (error) {
    if (error) {
      console.log("The joinLeave channel defined in the config was not found.");
      return;
    }
  }
  var userIcon = member.user.displayAvatarURL,
    newMemberName = member.user.username,
    newmember = member.user.username,

    // Roles
    blacklistedRole = member.guild.roles.find(r => r.name === config.roles.blacklisted),
    memberRole = member.guild.roles.find(r => r.name === config.roles.member),

    // Random Message Generator
    randomWelcomeMessage = await randomWelcomeMessageFile,
    randomWelcomeMessageGenerator = Math.floor(Math.random() * randomWelcomeMessage.length) - 1,
    randomWelcomeMessageMessage = randomWelcomeMessage[randomWelcomeMessageGenerator],

    // Other Vars
    joinMessageOption = config.join.message.message.replace(/{newmember}/g, `${newmember}`);

  // Random Message Checker
  if (joinMessageOption === "RANDOM") {
    joinMessageOption = randomWelcomeMessageMessage;

    if (joinMessageOption == undefined) {
      joinMessageOption = "Hola Amigo!";
    }

  } else {
    joinMessageOption = config.join.message.message.replace(/{newmember}/g, `${newmember}`);
  }
  // Checks if the user is blacklisted
  if (blacklisted[member.user.id]){
    member.addRole(blacklistedRole);
  }

  if(config.join.addRoleOnJoin === true) {
    var role = config.join.addRoleOnJoin.role;

    if(role === "NONE") { return sendMessages(); }
    if(role === "MEMBER") { role = member.guild.roles.find(r => r.name === config.roles.member); }
    role = member.guild.roles.find(r => r.name === config.join.addRoleOnJoin.role);

    try{
      member.addRole(role);
    }
    catch(error){
      if(error){
        if(config.core.debug === true) { console.warn(error); }
      }
    }
    //sendMessages();

    //if(config.VoiceChannels.serverStats.enabled.memberCount === true) {
    //  client.channels.get(config.VoiceChannels.serverStats.channels.memberCount).setName(`Total Members: ${member.guild.memberCount}`);
    //}
  }

  // VC Server Stats
  if (config.VoiceChannels.serverStats.enabled.memberCount === true) {
    let uC = member.guild.channels.find(c => c.id == `${config.VoiceChannels.serverStats.channels.memberCount}`);
    uC.setName(`Total Members: ${member.guild.memberCount}`)
  }

  var footer;
    if (config.messages.embed.override === true) {
      footer = config.messages.embed.footer;
    } else {
      footer = config.join.message.embed.footer;
    }
    var embeds;
    if (config.join.message.sendInEmbed === false) {
      embeds = false;
    } else if (config.core.embeds === true) {
      embeds = true;
    }

    if (embeds === true) {
      let joinEmbed = new Discord.RichEmbed()
        .setColor(`${config.join.message.embed.color}`)
        .setThumbnail(userIcon)
        .setAuthor(config.join.message.embed.title.replace(/{newmember}/g, `${newMemberName}`))
        .setDescription(joinMessageOption)
        .setFooter(footer);
      try {
        welcomeChannel.send(joinEmbed);
      } catch (error) {
        if (error) {
        }
      }
    } else {
      try {
        welcomeChannel.send(config.join.message.message.replace(/{newmember}/g, `${newmember}`));
      } catch (error) {
        if (error) {
        }
      }
    }

  function sendMessages() {
    var footer;
    if (config.messages.embed.override === true) {
      footer = config.messages.embed.footer;
    } else {
      footer = config.join.message.embed.footer;
    }
    var embeds;
    if (config.join.message.sendInEmbed === false) {
      embeds = false;
    } else if (config.core.embeds === true) {
      embeds = true;
    }

    if (embeds === true) {
      let joinEmbed = new Discord.RichEmbed()
        .setColor(`${config.join.message.embed.color}`)
        .setThumbnail(userIcon)
        .setAuthor(config.join.message.embed.title.replace(/{newmember}/g, `${newMemberName}`))
        .setDescription(joinMessageOption)
        .setFooter(footer);
      try {
        welcomeChannel.send(joinEmbed);
      } catch (error) {
        if (error) {
          console.log("The joinLeave channel defined in the config was not found.");
        }
      }
    } else {
      try {
        welcomeChannel.send(config.join.message.message.replace(/{newmember}/g, `${newmember}`));
      } catch (error) {
        if (error) {
          console.log("The joinLeave channel defined in the config was not found.");
        }
      }
    }
  }
};

const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync("./config.yml", "utf8"));
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const chalk = require("chalk");

let coinSystem = require(`../systems/coinSystem.js`);
let xpSystem = require(`../systems/xpSystem.js`);
let filterSystem = require(`../systems/filterSystem.js`);
let ticketCategories = require(`../systems/ticketCategories.js`);
//let christianMode = require(`../systems/christianMode.js`);
let guildMemberAdd = require(`../events/guildMemberAdd.js`);
let guildMemberRemove = require("../events/guildMemberRemove.js");
let suggestionReactions = require("../events/suggestionReactions.js");

module.exports = {
  start: function () {
    console.log("VodkaBot is starting... Please wait.");
    console.log("VodkaBot is attempting to load commands. Please wait");
    const { promisify } = require("util");
    const { join, extname } = require("path");
    const { readdir, lstat } = require("fs");
    const readdirPromise = promisify(readdir);
    const lstatPromise = promisify(lstat);
    const COMMANDS_FOLDER_PATH = join(__dirname, "../commands");

    const readAllCommands = async (startPath = COMMANDS_FOLDER_PATH) => {
      const files = await readdirPromise(startPath);
      for (const f of files) {
        const path = join(startPath, f);
        if (extname(f) === ".js") {
          let props = require(path);
          // Commands
          if (config.debug_mode === true) { console.log(`Command: ${f} -> Loaded.`); }
          client.commands.set(props.help.name, props);
          // Aliases
          props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
          });
        } else {
          const stats = await lstatPromise(path);
          if (stats.isDirectory() && !stats.isSymbolicLink()) await readAllCommands(path);
        }
      }
    };
    readAllCommands().then(console.log("Vodka Launch: Commands Loaded."));

    

    client.on("ready", async () => {
      console.log(`=====================================================================`);
      console.log(chalk.cyan(`         VodkaBot ` + chalk.yellow(config.bot.version)  + ` || `+chalk.green.bold(`Started Successfully!`)));
      console.log(` If you are in need of support please join our support discord:`);
      console.log(chalk.magenta(`                  https://discord.gg/BqAWWJN\n`));
      console.log(chalk.blue(`    Thank you for choosing VodkaBot! We appreciate it a lot!  `));
      console.log(chalk.blue(`Copyright Liam#0716 & Ufo#8033 -- Ufero Team. All rights reserved`));
      console.log(`=====================================================================`);
      client.user.setActivity(config.bot.bot_activity);

      // Systems
      
      client.on("message", coinSystem);
      client.on("message", xpSystem);
      client.on("message", filterSystem);
      client.on("message", ticketCategories);

      // Message Logger
      if (config.messageLogger.enabled === true) {
        var channel;
        client.on("message", async message => {
          if (message.channel.type === "dm") return;
          let content = await message.content;
          try {
            channel = message.guild.channels.find(c => c.id === config.messageLogger.channelID);
          } catch (error) {
            //channel = message.guild.channels.find(c => c.id === config.messageLogger.channelID);
            return; // console.log("MessageLogger Channel was not found.");
          }

          try {
            let embed = new Discord.RichEmbed()
              .setAuthor(`${message.author.username} Sent a message`)
              .setColor("RANDOM")
              .addField("Message Content:", `${content}`, true)
              .addField("Sent in channel:", `<#${message.channel.id}>`)
              .addField("Sent At:", message.createdAt, true)
              .addField("Author ID:", message.author.id, true)
              .addField("Author Username & Discriminator:", `${message.author.username}#${message.author.discriminator}`)
              .setThumbnail(message.author.avatarURL);
            return channel.send(embed);
          } catch (error) {}
        });

        client.on("messageUpdate", async (oldMessage, newMessage) => {
          if (newMessage.channel.type === "dm" || oldMessage.channel.type === "dm") return;
          if (oldMessage === newMessage) return;
          let oContent = await oldMessage.content;
          let nContent = await newMessage.content;

          try {
            channel = message.guild.channels.find(c => c.id === config.messageLogger.channelID);
          } catch (error) {
            //channel = message.guild.channels.find(c => c.id === config.messageLogger.channelID);
            return; //console.log("MessageLogger Channel was not found.");
          }

          try {
            let embed = new Discord.RichEmbed()
              .setAuthor(`${newMessage.author.username} Sent a message`)
              .setColor("RANDOM")
              .addField("Original Message Content:", oContent)
              .addField("New Message Content:", nContent)
              .addField("Sent in channel:", `<#${newMessage.channel.id}>`)
              .addField("Sent At: ", oldMessage.createdAt, true)
              .addField("Edited At: ", newMessage.editedAt, true)
              .addField("Author ID: ", newMessage.author.id, true)
              .addField("Author Username & Discriminator: ", `${newMessage.author.username}#${newMessage.author.discriminator}`)
              .setThumbnail(newMessage.author.avatarURL);
            return channel.send(embed);
          } catch (error) {}
        });
      }
      

      //client.on("message", christianMode);

      // Events
      client.on("guildMemberAdd", guildMemberAdd);
      client.on("guildMemberRemove", guildMemberRemove);
      client.on("messageReactionAdd", suggestionReactions);
      client.on('warn', console.warn);
	    client.on('error', console.error);
      client.on('disconnect', () => console.log('VodkaBot has lost connection to the Discord API! This is unlikely an error with VodkaBot.\nHas your internet gone down?\n\nA message will be logged when VodkaBot is reconnecting.'));
      client.on('reconnecting', () => console.log('VodkaBot is attempting to recconect to the Discord API.'));

      // Moved to here to fix an error.
      client.on("raw", packet => {
        if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
        const channel = client.channels.get(packet.d.channel_id);
        if (channel.messages.has(packet.d.message_id)) return;
        channel.fetchMessage(packet.d.message_id).then(message => {
          const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
          const reaction = message.reactions.get(emoji);
          if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
          if (packet.t === 'MESSAGE_REACTION_ADD') {
            client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
          }
          if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
          }
        });
      });
      

      
      var embeds;
        if(config.messages.embed.override === true) {
            embeds = config.messages.embed.footer;
        } else {
            embeds = config.messages.commandNotFound.embed.footer;
        }

      // Command Finder
      
      client.on("message", async message => {
        if(config.channel.commands.blockedChannels.includes(message.channel.name)) { return; }
        if (message.content.indexOf(config.bot.prefix) !== 0) return;
        const args = message.content.slice(config.bot.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        let commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        let Command = `${config.bot.prefix}${command}`;
        if (!commandfile) {
          //if(command.toLowerCase().includes("play") || command.toLowerCase().includes("skip") || command.toLowerCase().includes("stop") || command.toLowerCase().includes("volume") || command.toLowerCase().includes("search") || command.toLowerCase().includes("queue") || command.toLowerCase().includes("pause") || command.toLowerCase().includes("resume") || command.toLowerCase().includes(config.PREFIX)) { return; }
          if (config.core.announceCommandNotFound === false) { return; }
          var characters = config.commandAnalysis.characters;
          if(config.commandAnalysis.ignoreSpecials === true) {
            if(command.toLowerCase().includes(characters)) {
              return;
            }
          }
          if (config.core.embeds === false) { return message.channel.send(`Unknown Command ${Command}`); }
          let embed = new Discord.RichEmbed()
            .setAuthor(config.messages.commandNotFound.embed.title)
            .setColor(config.messages.commandNotFound.embed.color)
            .setDescription(config.messages.commandNotFound.message.replace(/{command}/g, `${Command}`))
            .setFooter(embeds);
          return message.channel.send(embed);
        }
        if (commandfile) commandfile.run(client, message, args);
      });
      
    });
    client.login(config.bot.token);
  }
};
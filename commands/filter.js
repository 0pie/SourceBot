const Discord = require("discord.js");
const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const logs = require("../modules/logs");
const messages = require("../modules/messages");

module.exports.run = async (client, message, args) => {
    let filterFile = require(`${process.cwd()}/assets/Required-Files/Systems/Filter/filter.json`);
    let filter = await filterFile;

    let filterArray = filter.BLACKLISTED_WORDS;

    if (config.filterSystem.enabled === true) {

        if (config.moderation.filter.enabled === true) {
            if (message.member.roles.find(r => r.name == config.moderation.filter.permissionRole)) {
                if (!args[0] || args[0].toLowerCase() == "help") {
                    let embed = new Discord.RichEmbed()
                        .setAuthor("Filter System Help")
                        .setColor("#009900")
                        .addField("Add Word:", `-filter add <word>\nAdds a word to the filter`, true)
                        .addField("Remove Word:", `-filter remove <word>\nRemoves a word from the filter`, true)
                        .addField("List Words:", `-filter list\nLists all the words within the filter`, true)
                    return message.channel.send(embed);
                } else if (args[0].toLowerCase() == "add") {
                    if (!args[1]) {
                        if (config.embeds === true) {
                            let filterSystemnoWordProvided = new Discord.RichEmbed()
                                .setAuthor("No Word Provided!")
                                .setColor("#ff2323")
                                .setDescription("You did not provide a word to add to the filter")
                                .setTimestamp();
                            return message.channel.send(filterSystemnoWordProvided)
                        } else {
                            return message.reply("Please provide a word to add to the filter!");
                        }
                    }
                    for (let i = 0; i < filter.length; i++)
                        if (filter[i].toLowerCase() == args[1].toLowerCase) {
                            if (config.embeds === true) {
                                let filterSystemwordAlreadyInFilter = new Discord.RichEmbed()
                                    .setAuthor("Word Already Blacklisted")
                                    .setColor("#fa1212")
                                    .setDescription("The word you provided was already in the filter")
                                    .setTimestamp()
                                return message.channel.send(filterSystemwordAlreadyInFilter);
                            } else {
                                return message.reply("That word is already in the filter!");
                            }
                        }
                    filter.BLACKLISTED_WORDS.push(args[1]);

                    fs.writeFile("assets/Required-Files/Systems/Filter/filter.json", JSON.stringify(filter), function (err) {
                        if (err) {
                            console.log(err);
                            message.channel.send(`There has been an error whilst trying to add ${args[1]} to the filter!\n${err}`);
                        }
                    });

                    if (config.embeds === true) {
                        let filterSystemwordAdded = new Discord.RichEmbed()
                            .setAuthor("Word Added To Filter!")
                            .setColor("#00d812")
                            .setDescription(`The word **${args[1]}** has been added to the filter!`)
                            .setTimestamp()
                        message.channel.send(filterSystemwordAdded)
                    } else {
                        message.channel.send(`${args[1]} has been added to the filter!`);
                    }
                    let Filter_System_Word_Added = new Discord.RichEmbed()
                    .setAuthor("Action | Word Added To Filter")
                    .setColor("#089ade")
                    .addField("Executor", `<@${message.author.id}>`)
                    .addField("Word", `${args[1]}`);
                    try{
                    return message.guild.channels.find(c => c.name === config.channel.logs).send(Filter_System_Word_Added);
                    }
                    catch(error){
                        if(error){
                            return messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.logs, "Filter", config.messages.channelNotFound.embed.footer);
                        }
                    }

                } else if (args[0].toLowerCase() == "remove") {
                    if (!args[1]) {
                        if (config.embeds === true) {
                            let filterSystemnoWordProvidedtoRemove = new Discord.RichEmbed()
                                .setAuthor("No Word Provided!")
                                .setColor("#ff2323")
                                .setDescription("You did not provide a word to remove from the filter")
                                .setTimestamp()
                            return message.channel.send(filterSystemnoWordProvidedtoRemove)
                        } else {
                            return message.channel.send("Please provide a word to remove from the filter!");
                        }
                    }
                    let filterSystemwordRemoved = new Discord.RichEmbed()
                        .setAuthor("Word Removed From Filter!")
                        .setColor("#009900")
                        .setDescription(`The word **${args[1]}** has been removed from the filter`)
                        .setTimestamp()
                    message.channel.send(filterSystemwordRemoved);

                    let LOGS_filterWordRemoved = new Discord.RichEmbed()
                        .setAuthor("Filter System Word Removed")
                        .setColor("#099990")
                        .addField("Executor:", `<@${message.author.id}>`)
                        .addField("Word:", args[1])
                        .setTimestamp()
                        try{
                            return message.guild.channels.find(c => c.name === config.channel.logs).send(LOGS_filterWordRemoved);
                            }
                            catch(error){
                                if(error){
                                    return messages.EmbedInvalidArgsMessages(message, "channelNotFound", config.channel.logs, "Filter2", config.messages.channelNotFound.embed.footer);
                                }
                            }





                    filter.BLACKLISTED_WORDS = filter.BLACKLISTED_WORDS.filter(function (w) {
                        return w !== args[1];
                    })

                    if (filter.BLACKLISTED_WORDS) {
                        fs.writeFile("assets/Required-Files/Systems/Filter/filter.json", JSON.stringify(filter), function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }





                } else if (args[0].toLowerCase() == "list") {
                    let embed = new Discord.RichEmbed()
                        .setAuthor("Filtered Words")
                        .setColor("#098aed")
                        .setTimestamp()
                        .setThumbnail(client.user.avatarURL)
                        .setFooter("Blacklisted Words")
                        .setDescription(filter.BLACKLISTED_WORDS.join("\n").length == 0 ? "None" : filter.BLACKLISTED_WORDS.join("\n"));
                    message.channel.send(embed);
                } else {
                    return message.channel.send("Use **-filter help** for help!");
                }
            } else {
                return messages.EmbedInvalidArgsMessages(message, "No Permission", config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer, config.messages.noPermission.embed.footer);
            }
        }
    }
};
module.exports.help = {
    name: "filter",
    aliases: config.moderation.filter.aliases
};
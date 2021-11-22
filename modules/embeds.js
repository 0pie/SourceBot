const Discord = require("discord.js");
const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

module.exports = {
    basicMsgAction: async function (message, action, sender, reason) {
        if (config.allmessagesin_embeds === true) {
            switch (action) {
                case "noPermission":
                    let noPermissionEmbed = new Discord.RichEmbed()
                        .setAuthor(config.noperm_embed_title)
                        .setColor(config.noperm_embed_color)
                        .setDescription(config.no_permission)
                        .setFooter(config.noperm_embed_footer);
                    return message.channel.send(noPermissionEmbed);
                case "noReason":
                    let noReasonEmbed = new Discord.RichEmbed()
                        .setAuthor(config.noreason_embed_title)
                        .setColor(config.noreason_embed_color)
                        .setDescription(config.no_reason)
                        .setFooter(config.noreason_embed_footer);
                    return message.channel.send(noReasonEmbed);
                case "cmdDisabled":
                    let cmdDisabled = new Discord.RichEmbed()
                        .setAuthor(config.commanddisabled_embed_title)
                        .setColor(config.commanddisabled_embed_color)
                        .setDescription(config.command_disabled_message)
                        .setFooter(config.commanddisabled_embed_footer);
                    return message.channel.send(cmdDisabled);
                case "noTaggedMember":
                    let noTaggedMember = new Discord.RichEmbed()
                        .setAuthor(config.nomembertagged_embed_title)
                        .setColor(config.nomembertagged_embed_color)
                        .setDescription(config.no_member_tagged)
                        .setFooter(config.nomembertagged_embed_footer);
                    return message.channel.send(noTaggedMember);
                case "invalidMember":
                    let invalidMember = new Discord.RichEmbed()
                        .setAuthor(config.personisinvalid_embed_title)
                        .setColor(config.personisinvalid_embed_color)
                        .setDescription(config.person_is_invalid)
                        .setFooter(config.personisinvalid_embed_footer);
                    return message.channel.send(invalidMember);
                case "channelCreated":
                    let channelCreated = new Discord.RichEmbed()
                        .setAuthor(config.createChannelCommand_embed_channelCreated_title)
                        .setColor(config.createChannelCommand_embed_channelCreated_color)
                        .setDescription(config.createChannelCommand_channelCreated_message)
                        .setFooter(config.createChannelCommand_embed_channelCreated_footer);
                    return message.channel.send(channelCreated);
                case "invalidOption":
                    let invalidOption = new Discord.RichEmbed()
                        .setAuthor(config.invalidOption_embed_title)
                        .setColor(config.invalidOption_embed_color)
                        .setDescription(config.invalidOption_message)
                        .setFooter(config.invalidOption_embed_footer)
                    return message.channel.send(invalidOption)
                case "noColor":
                    let noColor = new Discord.RichEmbed()
                    .setAuthor(config.noColor_embed_title)
                    .setColor(config.noColor_embed_color)
                    .setDescription(config.no_color)
                    .setFooter(config.noColor_embed_footer)
                    return message.channel.send(noColor)
                case "noName":
                    let noName = new Discord.RichEmbed()
                    .setAuthor(config.noName_embed_title)
                    .setColor(config.noName_embed_color)
                    .setDescription(config.no_name)
                    .setFooter(config.noName_embed_footer)
                    return message.channel.send(noName)
            }
        }
    },
    errorAction: function (message, action, sender, reason) {
        if (config.allmessagesin_embeds === true) {
            switch (action) {
                case "noLogsChannel":
                    let noLogsChannel = new Discord.RichEmbed()
                        .setAuthor(config.nologschannel_embed_title)
                        .setColor(config.nologschannel_embed_color)
                        .setDescription(config.no_logs_channel)
                        .setFooter(config.nologschannel_embed_footer);
                    return message.channel.send(noLogsChannel);
                case "noReportsChannel":
                    let noReportsChannel = new Discord.RichEmbed()
                        .setAuthor(config.noreportschannel_embed_title)
                        .setColor(config.noreportschannel_embed_color)
                        .setDescription(config.no_reports_channel)
                        .setFooter(config.noreportschannel_embed_footer);
                    return message.channel.send(noReportsChannel);
                case "coinSystem Disabled":
                    let coinSystemDisabled = new Discord.RichEmbed()
                        .setAuthor(config.coinsystem_embed_disabled_title)
                        .setColor(config.coinsystem_embed_disabled_color)
                        .setDescription(config.coinsystem_disabled_message)
                        .setFooter(config.coinsystem_embed_disabled_footer)
                    return message.channel.send(coinSystemDisabled)
                case "xpSystem Disabled":
                    let xpSystemDisabled = new Discord.RichEmbed()
                        .setAuthor(config.xpsystem_embed_disabled_title)
                        .setColor(config.xpsystem_embed_disabled_color)
                        .setDescription(config.xpsystem_disabled_message)
                        .setTimestamp(`Requested By ${sender}`)
                    return message.channel.send(xpSystemDisabled)
            }
        }
    },
    cmdMessages: function (message, action, sender, reason) {
        if (config.allmessagesin_embeds === true) {
            switch (action) {

                // Define Command
                case "definecommand noword provided":
                    let definecommandnowordprovided = new Discord.RichEmbed()
                        .setAuthor(config.definecommand_embed_noword_title)
                        .setColor(config.definecommand_embed_noword_color)
                        .setDescription(config.definecommand_noword_message)
                        .setFooter(config.definecommand_embed_noword_footer);
                    return message.channel.send(definecommandnowordprovided);
                case "definecommand wordfound":
                    let definecommandwordfound = new Discord.RichEmbed()
                        .setAuthor(config.definecommand_embed_wordfound_title)
                        .setColor(config.definecommand_embed_wordfound_color)
                        .setDescription(reason)
                        .setFooter(config.definecommand_embed_wordfound_footer);
                    return message.channel.send(definecommandwordfound);


                    // Create Channel Command
                case "createChannelCommand_noOption":
                    let createChannelCommandnoOption = new Discord.RichEmbed()
                        .setAuthor(config.createChannelCommand_embed_noOption_title)
                        .setColor(config.createChannelCommand_embed_noOption_color)
                        .setDescription(config.createChannelCommand_noOption_message)
                        .setFooter(config.createChannelCommand_embed_noOption_footer)
                    return message.channel.send(createChannelCommandnoOption)

                case "createChannelCommand_noName":
                    let createChannelCommandnoName = new Discord.RichEmbed()
                        .setAuthor(config.createChannelCommand_embed_noName_title)
                        .setColor(config.createChannelCommand_embed_noName_color)
                        .setDescription(config.createChannelCommand_noName_message)
                        .setFooter(config.createChannelCommand_embed_noName_footer)
                    return message.channel.send(createChannelCommandnoName)

                    // Delete Channel Command
                case "deleteChannelCommand channelDoesNotExist":
                    let deleteChannelCommandChannelDoesNotExist = new Discord.RichEmbed()
                        .setAuthor(config.deleteChannelCommand_embed_channelDoesNotExist_title)
                        .setColor(config.deleteChannelCommand_embed_channelDoesNotExist_color)
                        .setDescription(config.deleteChannelCommand_channelDoesNotExist_message)
                        .setFooter(config.deleteChannelCommand_embed_channelDoesNotExistfooter)
                    return message.channel.send(deleteChannelCommandChannelDoesNotExist)
                
                case "deleteChannelCommand channelDeleted":
                    let deleteChannelCommandChannelDeleted = new Discord.RichEmbed()
                    .setAuthor(config.deleteChannelCommand_embed_channelDeleted_title)
                    .setColor(config.deleteChannelCommand_embed_channelDeleted_color)
                    .setDescription(config.deleteChannelCommand_channelDeleted_message)
                    .setFooter(config.deleteChannelCommand_embed_channelDeleted_footer)
                    return message.channel.send(deleteChannelCommandChannelDeleted)

                    // Filter System
                case "filterSystem help":
                    let filterSystemHelp = new Discord.RichEmbed()
                    .setAuthor("Filter System -> Help Menu")
                    .setColor("#0A0AA0")
                    .setDescription("**Filter System**\n**-filter add <word>** - To add a word to the filter\n**-filter remove <word>** - Removes a word from the filter\n**-filter list** - Lists all the words in the filter\n**-filter help** - Brings up the menu!")
                    .setTimestamp()
                    return message.channel.send(filterSystemHelp)
                case "filterSystem noWordProvided":
                    let filterSystemnoWordProvided = new Discord.RichEmbed()
                    .setAuthor("No Word Provided!")
                    .setColor("#ff2323")
                    .setDescription("You did not provide a word to add to the filter")
                    .setTimestamp()
                    return message.channel.send(filterSystemnoWordProvided)
                case "filterSystem noWordProvidedtoRemove":
                    let filterSystemnoWordProvidedtoRemove = new Discord.RichEmbed()
                    .setAuthor("No Word Provided!")
                    .setColor("#ff2323")
                    .setDescription("You did not provide a word to remove from the filter")
                    .setTimestamp()
                    return message.channel.send(filterSystemnoWordProvidedtoRemove)
                case "filterSystem wordAlreadyInFilter":
                    let filterSystemwordAlreadyInFilter = new Discord.RichEmbed()
                    .setAuthor("Word Already Blacklisted")
                    .setColor("#fa1212")
                    .setDescription("The word you provided was already in the filter")
                    .setTimestamp()
                    return message.channel.send(filterSystemwordAlreadyInFilter)
                case "filterSystem wordAdded":
                    let filterSystemwordAdded = new Discord.RichEmbed()
                    .setAuthor("Word Added To Filter!")
                    .setColor("#00d812")
                    .setDescription(`The word **${reason}** has been added to the filter!`)
                    .setTimestamp()
                    return message.channel.send(filterSystemwordAdded)
                case "filterSystem wordRemoved":
                    let filterSystemwordRemoved = new Discord.RichEmbed()
                    .setAuthor("Word Removed From Filter!")
                    .setColor("#009900")
                    .setDescription(`The word **${reason}** has been removed from the filter`)
                    .setTimestamp()
                    return message.channel.send(filterSystemwordRemoved)

                    // Create Role Command
                case "createRoleCommand roleCreated":
                    let createRoleCommandroleCreated = new Discord.RichEmbed()
                    .setAuthor("Role Created!")
                    .setColor("#00AA00")
                    .setDescription(`The role **${reason}** has been created!\n\nYou can now go and set up the permissions!`)
                    .setTimestamp()
                    return message.channel.send(createRoleCommandroleCreated)

                    // Delete Role Command
                case "deleteRoleCommand roleDeleted":
                    let deleteRoleCommandroleDeleted = new Discord.RichEmbed()
                    .setAuthor("Role Deleted!")
                    .setColor("#0AAA00")
                    .setDescription(`The role ${reason} has been deleted!`)
                    .setTimestamp()
                    return message.channel.send(deleteRoleCommandroleDeleted)

                    // Ticket System
                case "ticketSystem disabled":
                    let ticketSystemdisabled = new Discord.RichEmbed()
                    .setAuthor(config.ticketsystem_embed_disabled_title)
                    .setColor(config.ticketsystem_embed_disabled_color)
                    .setDescription(config.ticketsystem_disabled_message)
                    .setFooter(config.ticketsystem_embed_disabled_footer)
                    return message.channel.send(ticketSystemdisabled)
            }
        }
    }
};

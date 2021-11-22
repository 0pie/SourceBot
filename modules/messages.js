const Discord = require("discord.js");
const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

module.exports = {

    EmbedInvalidArgsMessages: function (message, action, sender, reason, embedFooter) {
        var embeds;
        if(config.messages.embed.override === true) {
            embeds = config.messages.embed.footer;
        } else {
            embeds = embedFooter;
        }
        if (config.core.embeds === true) {
            switch (action) {

                case "channelNotFound":
                    let channelNotFound = new Discord.RichEmbed()
                    .setAuthor(config.messages.channelNotFound.embed.title)
                    .setColor(config.messages.channelNotFound.embed.color)
                    .setDescription(config.messages.channelNotFound.message.replace(/{channel}/g, sender).replace(/{command}/g, reason))
                    .setFooter(embeds);
                    return message.channel.send(channelNotFound);

                case "personNotFound":
                    let Invalid_User = new Discord.RichEmbed()
                        .setAuthor(config.messages.personNotFound.embed.title)
                        .setColor(config.messages.personNotFound.embed.color)
                        .setDescription(config.messages.personNotFound.message)
                        .setFooter(embeds);
                    return message.channel.send(Invalid_User);

                case "No User Tagged":
                    let No_Member_Tagged = new Discord.RichEmbed()
                        .setAuthor(config.messages.noUserTagged.embed.title)
                        .setColor(config.messages.noUserTagged.embed.color)
                        .setDescription(config.messages.noUserTagged.message)
                        .setFooter(embeds);
                    return message.channel.send(No_Member_Tagged);

                case "No Coins Amount Provided":
                    let No_Coins_Specified = new Discord.RichEmbed()
                        .setAuthor(config.messages.noCoinsAmountProvided.embed.title)
                        .setColor(config.messages.noCoinsAmountProvided.embed.color)
                        .setDescription(config.messages.noCoinsAmountProvided.message)
                        .setFooter(embeds);
                    return message.channel.send(No_Coins_Specified);

                case "No Permission":
                    let No_Permission = new Discord.RichEmbed()
                        .setAuthor(config.messages.noPermission.embed.title)
                        .setColor(config.messages.noPermission.embed.color)
                        .setDescription(config.messages.noPermission.message)
                        .setFooter(embeds);
                    return message.channel.send(No_Permission);

                case "8Ball No Question Provided":
                    let EightBall_No_Question_Provided = new Discord.RichEmbed()
                        .setAuthor(config.fun.eightBall.messages.noQuestion.embed.title)
                        .setColor(config.fun.eightBall.messages.noQuestion.embed.color)
                        .setDescription(config.fun.eightBall.messages.noQuestion.message)
                        .setFooter(embeds);
                    return message.channel.send(EightBall_No_Question_Provided);

                case "NoWord Provided":
                    let noWord_Provided = new Discord.RichEmbed()
                        .setAuthor(config.messages.noWordProvided.embed.title)
                        .setColor(config.messages.noWordProvided.embed.color)
                        .setDescription(config.messages.noWordProvided.message)
                        .setFooter(embeds);
                    return message.channel.send(noWord_Provided);

                // Music System
                case "Member Not In Voice Channel":
                    let Member_Not_In_Voice_Channel = new Discord.RichEmbed()
                        .setAuthor(config.misc.screenshare.messages.embed.title)
                        .setColor(config.misc.screenshare.messages.embed.color)
                        .setDescription("You are not in a voice channel")
                        .setFooter(embeds);
                    return message.channel.send(Member_Not_In_Voice_Channel);

                case "No Reason Provided":
                    let No_Reason_Provided = new Discord.RichEmbed()
                        .setAuthor(config.messages.noReason.embed.title)
                        .setColor(config.messages.noReason.embed.color)
                        .setDescription(config.messages.noReason.message)
                        .setFooter(embeds);
                    return message.channel.send(No_Reason_Provided);

                case "No Logs Channel":
                    let No_Logs_Channel = new Discord.RichEmbed()
                        .setAuthor(config.No_Logs_Channel_Embed_Title)
                        .setColor(config.No_Logs_Channel_Embed_Color)
                        .setDescription(config.No_Logs_Channel)
                        .setFooter(embeds);
                    return message.channel.send(No_Logs_Channel);

                case "Invalid Option":
                    let Invalid_Option = new Discord.RichEmbed()
                        .setAuthor(config.messages.invalidOption.embed.title)
                        .setColor(config.messages.invalidOption.embed.color)
                        .setDescription(config.messages.invalidOption.message)
                        .setFooter(embeds);
                    return message.channel.send(Invalid_Option);

                case "No Name":
                    let No_Name = new Discord.RichEmbed()
                        .setAuthor(config.messages.noName.embed.title)
                        .setColor(config.messages.noName.embed.color)
                        .setDescription(config.messages.noName.message)
                        .setFooter(embeds);
                    return message.channel.send(No_Name);

                case "No Color":
                    let No_Color = new Discord.RichEmbed()
                        .setAuthor(config.messages.noColor.embed.title)
                        .setColor(config.messages.noColor.embed.color)
                        .setDescription(config.messages.noColor.message)
                        .setFooter(embeds);
                    return message.channel.send(No_Color);

                case "No Message":
                    let noMessage = new Discord.RichEmbed()
                        .setAuthor(config.messages.noMessage.embed.title)
                        .setColor(config.messages.noMessage.embed.color)
                        .setDescription(config.messages.noMessage.message)
                        .setFooter(embeds);
                    return message.channel.send(noMessage);
            }
        } else {
            switch (action) {

                case "channelNotFound":
                    return message.channel.send(config.messages.channelNotFound.message.replace(/{channel}/g, sender));

                case "personNotFound":
                    return message.channel.send(config.messages.personNotFound.message);

                case "No User Tagged":
                    return message.channel.send(config.messages.noUserTagged.message);

                case "No Coins Amount Provided":
                    return message.channel.send(config.messages.noCoinsAmountProvided.message);

                case "No Permission":
                    return message.channel.send(config.messages.noPermission.message);

                case "8Ball No Question Provided":
                    return message.channel.send(config.fun.eightBall.messages.noQuestion.message);

                case "NoWord Provided":
                    return message.channel.send(config.messages.noWordProvided.message);

                case "Member Not In Voice Channel":
                    return message.channel.send(config.musicSystem.messages.memberNotInVoiceChannel.message)

                case "Invalid Option":
                    return message.channel.send(config.messages.invalidOption.message);

                case "No Name":
                    return message.channel.send(config.messages.noName.message);

                case "No Color":
                    return message.channel.send(config.messages.noColor.message);

                case "No Message":
                    return message.channel.send(config.messages.noMessage.message);
            }
        }
    },

    EmbedMessages: function (message, action, sender, reason, reason2, embedFooter) {
        var embeds;
        if(config.messages.embed.override === true) {
            embeds = config.messages.embed.footer;
        } else {
            embeds = embedFooter;
        }
        if (config.core.embeds === true) {
            switch (action) {

                // Warnings
                case "Warning Not Found":
                    let warningNotFound = new Discord.RichEmbed()
                    .setAuthor(config.warningSystem.messages.userHasNoWarnings.embed.title)
                    .setColor(config.warningSystem.messages.userHasNoWarnings.embed.color)
                    .setDescription(config.warningSystem.messages.userHasNoWarnings.message)
                    .setFooter(embeds);
                    return message.channel.send(warningNotFound);

                case "Warning Rollback":
                    let warningRollback = new Discord.RichEmbed()
                    .setAuthor(config.warningSystem.messages.rollback.embed.title)
                    .setColor(config.warningSystem.messages.rollback.embed.color)
                    .setDescription(config.warningSystem.messages.rollback.message.replace(/{staff}/g, sender))
                    .setFooter(embeds);
                    return message.channel.send(warningRollback);

                case "Warning Removed":
                    let warningRemoved = new Discord.RichEmbed()
                    .setAuthor(config.warningSystem.messages.warningRemoved.embed.title)
                    .setColor(config.warningSystem.messages.warningRemoved.embed.color)
                    .setDescription(config.warningSystem.messages.warningRemoved.message)
                    .setFooter(embeds);
                    return message.channel.send(warningRemoved);

                case "Warning Added":
                    let warningAdded = new Discord.RichEmbed()
                    .setAuthor(config.warningSystem.messages.warningAdded.embed.title)
                    .setColor(config.warningSystem.messages.warningAdded.embed.color)
                    .setDescription(config.warningSystem.messages.warningAdded.message
                        .replace(/{user}/g, sender)
                        .replace(/{reason}/g, reason)
                        .replace(/{staff}/g, reason2))
                    .setFooter(embeds);
                    return message.channel.send(warningAdded);

                case "Suggestions noSuggestion":
                    let suggestions_noSuggestion = new Discord.RichEmbed()
                    .setAuthor(config.general.suggestions.messages.noSuggestionProvided.embed.title)
                    .setColor(config.general.suggestions.messages.noSuggestionProvided.embed.color)
                    .setDescription(config.general.suggestions.messages.noSuggestionProvided.message.replace(/{tagauthor}/g, `${sender}`))
                    .setFooter(embeds);
                    return message.channel.send(suggestions_noSuggestion);

                case "Suggestions suggestionAdded":
                    let suggestions_suggestionAdded = new Discord.RichEmbed()
                    .setAuthor(config.general.suggestions.messages.suggestionAdded.embed.title.replace(/{tagauthor}/g, `${sender}`))
                    .setColor(config.general.suggestions.messages.suggestionAdded.embed.color)
                    .setDescription(config.general.suggestions.messages.suggestionAdded.message.replace(/{tagauthor}/g, `${sender}`))
                    .setFooter(embeds);
                    return message.channel.send(suggestions_suggestionAdded);

                // Filter System
                case "Filter Message Removed":
                    let Filter_Message_Removed = new Discord.RichEmbed()
                        .setAuthor(config.filterSystem.messages.wordIsBlacklisted.embed.title)
                        .setColor(config.filterSystem.messages.wordIsBlacklisted.embed.color)
                        .setDescription(config.filterSystem.messages.wordIsBlacklisted.message.replace(/{tagauthor}/g, `<@${sender}>`))
                        .setFooter(embeds);
                    return message.channel.send(Filter_Message_Removed);

                    // XP System:

                    // Coin System
                case "CoinSystem CoinCommand User Coins":
                    let CoinSystem_CoinCommand_User_Coins = new Discord.RichEmbed()
                        .setAuthor(config.economy.coins.coins.messages.userCoins.embed.title.replace(/{users}/g, sender))
                        .setColor(config.economy.coins.coins.messages.userCoins.embed.color)
                        .setDescription(config.economy.coins.coins.messages.userCoins.message.replace(/{coins}/g, reason))
                        .setFooter(embeds);
                    return message.channel.send(CoinSystem_CoinCommand_User_Coins);

                case "CoinSystem CoinCommand Another User Coins Is 0":
                    let CoinSystem_CoinCommand_Another_User_Coins_Is_0 = new Discord.RichEmbed()
                        .setAuthor(config.economy.coins.coins.messages.user0Coins.embed.title.replace(/{users}/g, sender))
                        .setColor(config.economy.coins.coins.messages.user0Coins.embed.color)
                        .setDescription(config.economy.coins.coins.messages.user0Coins.message.replace(/{user}/g, reason))
                        .setFooter(embeds);
                    return message.channel.send(CoinSystem_CoinCommand_Another_User_Coins_Is_0)

                case "CoinSystem CoinCommand Another User Coins":
                    let CoinSystem_CoinCommand_Another_User_Coins = new Discord.RichEmbed()
                        .setAuthor(config.economy.coins.coins.messages.anotherUserCoins.embed.title.replace(/{users}/g, sender))
                        .setColor(config.economy.coins.coins.messages.anotherUserCoins.embed.color)
                        .setDescription(config.economy.coins.coins.messages.anotherUserCoins.message.replace(/{user}/g, reason).replace(/{coins}/g, reason2))
                        .setFooter(embeds);
                    return message.channel.send(CoinSystem_CoinCommand_Another_User_Coins);

                case "CoinSystem PayCommand UnderMinimum AmountOf Coins":
                    let CoinSystem_PayCommand_UnderMinimum_AmountOf_Coins = new Discord.RichEmbed()
                        .setAuthor("Under Minimum Amount")
                        .setColor("#999900")
                        .setDescription(`You must pay a minimum of ${config.Pay_Command_Minimum_Amount_Of_Coins} coins`)
                        .setFooter(embeds)
                    return message.channel.send(CoinSystem_PayCommand_UnderMinimum_AmountOf_Coins)

                    // Ticket System:
                case "Ticket Already Open":
                    let Ticket_Already_Open = new Discord.RichEmbed()
                        .setAuthor(config.ticket.new.messages.ticketAlreadyOpen.embed.title)
                        .setColor(config.ticket.new.messages.ticketAlreadyOpen.embed.color)
                        .setDescription(config.ticket.new.messages.ticketAlreadyOpen.message
                            .replace(/{ticket}/g, `<#${reason}>`)
                            .replace(/{user}/g, `@${sender}`))
                    return message.channel.send(Ticket_Already_Open);

                case "Closing Ticket But Not In Ticket":
                    let Closing_Ticket_But_Not_In_Ticket = new Discord.RichEmbed()
                        .setAuthor(config.ticket.close.messages.closeTicketButNotInTicket.embed.title)
                        .setColor(config.ticket.close.messages.closeTicketButNotInTicket.embed.color)
                        .setDescription(config.ticket.close.messages.closeTicketButNotInTicket.message)
                    return message.channel.send(Closing_Ticket_But_Not_In_Ticket);

                case "Ticket Created":
                    let Ticket_Created = new Discord.RichEmbed()
                        .setAuthor(config.ticket.new.messages.ticketCreated.embed.title)
                        .setColor(config.ticket.new.messages.ticketCreated.embed.color)
                        .setDescription(config.ticket.new.messages.ticketCreated.message.replace(/{ticket}/g, `<#${sender.id}>`))
                    return message.channel.send(Ticket_Created);

                case "HowGay Command User":
                    let HowGay_Command_User = new Discord.RichEmbed()
                        .setAuthor("Gay Meter")
                        .setDescription(`You are ${sender}% gay`)
                    return message.channel.send(HowGay_Command_User);

                case "HowGay Command Another User":
                    let HowGay_Command_Another_User = new Discord.RichEmbed()
                        .setAuthor("Gay Meter")
                        .setDescription(`${sender} is ${reason}% gay`)
                    return message.channel.send(HowGay_Command_Another_User)

                case "IP Command Message":
                    let IP_Command_Message = new Discord.RichEmbed()
                        .setAuthor(`${config.general.ip.messages.embed.title}`)
                        .setDescription(`${config.general.ip.messages.message}`)
                        .setColor(`${config.general.ip.messages.embed.color}`)
                        .setFooter(`${embeds}`)

                    return message.channel.send(IP_Command_Message)

                case "Links Command Message":
                    let Links_Command_Message = new Discord.RichEmbed()
                        .setAuthor(config.general.links.messages.embed.title)
                        .setColor(config.general.links.messages.embed.color)
                        .setDescription(config.general.links.messages.message)
                        .setFooter(embeds)
                    return message.channel.send(Links_Command_Message)

                case "Store Command Message":
                    let Store_Command_Message = new Discord.RichEmbed()
                        .setAuthor(config.general.store.messages.embed.title)
                        .setColor(config.general.store.messages.embed.color)
                        .setDescription(config.general.store.messages.message)
                        .setFooter(embeds)

                    return message.channel.send(Store_Command_Message)

                case "Website Command Message":
                    let Website_Command_Message = new Discord.RichEmbed()
                        .setAuthor(config.general.website.messages.embed.title)
                        .setColor(config.general.website.messages.embed.color)
                        .setDescription(config.general.website.messages.message)
                        .setFooter(embeds)

                    return message.channel.send(Website_Command_Message)

                case "Define Command WordFound":
                    let Define_Command_WordFound = new Discord.RichEmbed()
                        .setAuthor(config.Define_Command_Embed_Title)
                        .setColor(config.Define_command_Embed_color)
                        .setDescription(reason)
                        .setFooter(embeds)

                    return message.channel.send(Define_Command_WordFound);

                case "Create Channel Command No Option":
                    let Create_Channel_Command_No_Option = new Discord.RichEmbed()
                        .setAuthor(config.moderation.createChannel.messages.noOption.embed.title)
                        .setColor(config.moderation.createChannel.messages.noOption.embed.color)
                        .setDescription(config.moderation.createChannel.messages.noOption.message)
                        .setFooter(embeds)
                    return message.channel.send(Create_Channel_Command_No_Option)

                case "Create Channel Command No Name":
                    let Create_Channel_Command_No_Name = new Discord.RichEmbed()
                        .setAuthor(config.moderation.createChannel.messages.noName.embed.title)
                        .setColor(config.moderation.createChannel.messages.noName.embed.color)
                        .setDescription(config.moderation.createChannel.messages.noName.message)
                        .setFooter(embeds);
                    return message.channel.send(Create_Channel_Command_No_Name);

                case "Create Channel Command Channel Created":
                    let Create_Channel_Command_Channel_Created = new Discord.RichEmbed()
                        .setAuthor(config.moderation.createChannel.messages.channelCreated.embed.title)
                        .setColor(config.moderation.createChannel.messages.channelCreated.embed.color)
                        .setDescription(config.moderation.createChannel.messages.channelCreated.message)
                        .setFooter(embeds);
                    return message.channel.send(Create_Channel_Command_Channel_Created);

                case "Create Role Command Role Created":
                    let Create_Role_Command_Role_Created = new Discord.RichEmbed()
                        .setAuthor(config.moderation.createRole.messages.roleCreated.embed.title)
                        .setColor(config.moderation.createRole.messages.roleCreated.embed.color)
                        .setDescription(config.moderation.createRole.messages.roleCreated.message.replace(/{role}/g, reason))
                        .setFooter(embeds);
                    return message.channel.send(Create_Role_Command_Role_Created);

                case "Delete Role Command Role Deleted":
                    let Delete_Role_Command_Role_Delted = new Discord.RichEmbed()
                        .setAuthor(config.moderation.deleteRole.messages.roleDeleted.embed.title)
                        .setColor(config.moderation.deleteRole.messages.roleDeleted.embed.color)
                        .setDescription(config.moderation.deleteRole.messages.roleDeleted.message.replace(/{role}/g, sender))
                        .setFooter(embeds);
                    return message.channel.send(Delete_Role_Command_Role_Delted);
            }
        } else {
            switch (action) {
                case "Suggestions inSuggestionsChannel":
                    return message.guild.channels.find(c => c.name == `${config.channel.suggestions.normal}`).send(reason);
                
                case "Suggestions noSuggestion":
                    return message.channel.send(config.general.suggestions.messages.noSuggestionProvided.message.replace(/{tagauthor}/g, `${sender}`));

                case "Suggestions suggestionAdded":
                    return message.channel.send(config.suggestionsCommand_message_suggestionAdded.replace(/{tagauthor}/g, `${sender}`));
                
                case "Filter Message Removed":
                    return message.channel.send(config.filterSystem.messages.wordIsBlacklisted.message.replace(/{tagauthor}/g, `${sender}`));

                case "CoinSystem CoinCommand User Coins":
                    return message.channel.send(config.economy.coins.coins.messages.userCoins.message.replace(/{coins}/g, reason));

                case "CoinSystem CoinCommand Another User Coins Is 0":
                    return message.channel.send(config.economy.coins.coins.messages.user0Coins.message.replace(/{user}/g, reason));

                case "CoinSystem CoinCommand Another User Coins":
                    return message.channel.send(config.economy.coins.coins.messages.anotherUserCoins.message.replace(/{user}/g, reason).replace(/{coins}/g, reason2));

                case "CoinSystem PayCommand UnderMinimum AmountOf Coins":
                    return message.channel.send(`You must pay a minimum of ${config.Pay_Command_Minimum_Amount_Of_Coins} coins`);

                case "Ticket Already Open":
                    return message.channel.send(config.ticket.new.messages.ticketAlreadyOpen.message
                        .replace(/{ticket}/g, `<#${reason}>`)
                        .replace(/{user}/g, `@${sender}`));

                case "Closing Ticket But Not In Ticket":
                    return message.channel.send(config.ticket.close.messages.closeTicketButNotInTicket.message);

                case "Ticket Created":
                    return message.channel.send(config.ticket.new.messages.ticketCreated.message.replace(/{ticket}/g, `<#${sender.id}>`));

                case "HowGay Command User":
                    return message.channel.send(`You are ${sender}% gay`);

                case "HowGay Command Another User":
                    return message.channel.send(`${sender} is ${reason}% gay`);

                case "IP Command Message":
                    return message.channel.send(config.general.ip.messages.message);

                case "Links Command Message":
                    return message.channel.send(config.general.links.messages.message);

                case "Store Command Message":
                    return message.channel.send(config.general.store.messages.message);

                case "Website Command Message":
                    return message.channel.send(config.general.website.messages.message);

                case "Define Command WordFound":
                    return message.channel.send(reason);

                case "Create Channel Command No Option":
                    return message.channel.send(config.moderation.createChannel.messages.noOption.message);

                case "Create Channel Command No Name":
                    return message.channel.send(config.moderation.createChannel.messages.noName.message);

                case "Create Channel Command Channel Created":
                    return message.channel.send(config.moderation.createCHannel.messages.channelCreated.message);

                case "Create Role Command Role Created":
                    return message.channel.send(config.moderation.createRole.messages.roleCreated.message.replace(/{role}/g, reason));

                case "Delete Role Command Role Deleted":
                    return message.channel.send(config.moderation.deleteRole.messages.roleDeleted.message.replace(/{role}/g, sender));
            }
        }
    },

    musicMessages: function (msg, action, sender, embedFooter) {
        var embeds;
        if(config.messages.embed.override === true) {
            embeds = config.messages.embed.footer;
        } else {
            embeds = embedFooter;
        }
        switch (action) {

            case "Music Incorrect Permissions":
                let Music_Incorrect_Permissions = new Discord.RichEmbed()
                .setAuthor("Music System")
                .setColor("#FF00000")
                .setDescription("I do not have the correct permissions.\nMake sure I am able to speak and connect!")
                return msg.channel.send(Music_Incorrect_Permissions);

            case "Music Left VC":
                let Music_Left_VC = new Discord.RichEmbed()
                    .setAuthor("Music System")
                    .setColor("#00AAA0")
                    .setDescription(`Successfully left the voice channel.`)
                return msg.channel.send(Music_Left_VC);

            case "Music Error":
                let Music_Error = new Discord.RichEmbed()
                    .setAuthor("Music System")
                    .setColor("#990000")
                    .setDescription(`❗ Sorry, you\'re not allowed to do that!`)
                return msg.channel.send(Music_Error);

            case "Music Error - User Not in a VC":
                let Music_Error_User_Not_In_a_VC = new Discord.RichEmbed()
                    .setAuthor(config.musicSystem.messages.memberNotInVoiceChannel.embed.title)
                    .setColor(config.musicSystem.messages.memberNotInVoiceChannel.embed.color)
                    .setDescription(config.musicSystem.messages.memberNotInVoiceChannel.message)
                    .setFooter(embeds);
                return msg.channel.send(Music_Error_User_Not_In_a_VC);

            case "Music Error - Bot Not in a VC":
                let Music_Error_Bot_Not_In_a_VC = new Discord.RichEmbed()
                    .setAuthor(config.musicSystem.messages.botNotInVoiceChannel.embed.title)
                    .setColor(config.musicSystem.messages.botNotInVoiceChannel.embed.color)
                    .setDescription(config.musicSystem.messages.botNotInVoiceChannel.message)
                    .setFooter(embeds);
                return msg.channel.send(Music_Error_Bot_Not_In_a_VC);

            case "Music Error - Not in the same VC as Bot":
                let Music_Error_Not_In_The_Same_VC_As_Bot = new Discord.RichEmbed()
                    .setAuthor(config.musicSystem.messages.notInSameVoiceChannelAsBot.embed.title)
                    .setColor(config.musicSystem.messages.notInSameVoiceChannelAsBot.embed.color)
                    .setDescription(config.musicSystem.messages.notInSameVoiceChannelAsBot.message)
                    .setFooter(embeds);
                return msg.channel.send(Music_Error_Not_In_The_Same_VC_As_Bot);

            case "Music Playback Resumed":
                let Music_Playback_Resumed = new Discord.RichEmbed()
                    .setAuthor(config.musicSystem.messages.musicPlaybackResumed.embed.title)
                    .setColor(config.musicSystem.messages.musicPlaybackResumed.embed.color)
                    .setDescription(config.musicSystem.messages.musicPlaybackResumed.message)
                    .setFooter(embeds);
                return msg.channel.send(Music_Playback_Resumed);

            case "No Music Being Played":
                let No_Music_Being_Played = new Discord.RichEmbed()
                    .setAuthor(config.musicSystem.messages.noMusicBeingPlayed.embed.title)
                    .setColor(config.musicSystem.messages.noMusicBeingPlayed.embed.color)
                    .setDescription(config.musicSystem.messages.noMusicBeingPlayed.message)
                    .setFooter(embeds);
                return msg.channel.send(No_Music_Being_Played);

            case "Only DJ or Admin can do this":
                let Only_DJ_or_Admin_has_rights = new Discord.RichEmbed()
                    .setAuthor(config.musicSystem.messages.onlyDJorAdminCanDoThis.embed.title)
                    .setColor(config.musicSystem.messages.onlyDJorAdminCanDoThis.embed.color)
                    .setDescription(config.musicSystem.messages.onlyDJorAdminCanDoThis.message)
                    .setFooter(embeds);
                return msg.channel.send(Only_DJ_or_Admin_has_rights);

            case "Music Cooldown":
                let Music_Cooldown = new Discord.RichEmbed()
                .setAuthor("Music System")
                .setColor("#990000")
                .setDescription("❗ You must wait to use this command again")
                .setFooter(embeds);
                return msg.channel.send(Music_Cooldown);

            case "No Video Specified":
                let No_Video_Specified = new Discord.RichEmbed()
                .setAuthor(config.musicSystem.messages.noVideoSpecified.embed.title)
                .setColor(config.musicSystem.messages.noVideoSpecified.embed.color)
                .setDescription(config.musicSystem.messages.noVideoSpecified.message)
                .setFooter(embeds);
                return msg.channel.send(No_Video_Specified);

            case "Queue Limit Reached":
                let Queue_Limit_Reached = new Discord.RichEmbed()
                .setAuthor("Music System")
                .setColor("#995511")
                .setDescription(`❗ I cannot add any more songs to the queue, the limit has been reached`)
                .setFooter(embeds);
                return msg.channel.send(Queue_Limit_Reached);

            case "Searching":
                let Searching = new Discord.RichEmbed()
                .setAuthor(config.musicSystem.messages.searching.embed.title)
                .setColor(config.musicSystem.messages.searching.embed.color)
                .setDescription(config.musicSystem.messages.searching.message)
                .setFooter(embeds);
                return msg.channel.send(Searching);

            case "Error - Fetching Playlist":
                let Error_Fetching_Playlist = new Discord.RichEmbed()
                .setAuthor(config.musicSystem.messages.errorFetchingPlaylist.embed.title)
                .setColor(config.musicSystem.messages.errorFetchingPlaylist.embed.color)
                .setDescription(config.musicSystem.messages.errorFetchingPlaylist.message)
                .setFooter(embeds);
                return msg.channel.send(Error_Fetching_Playlist);

            case "Could not find video":
                let Could_Not_Find_Video = new Discord.RichEmbed()
                .setAuthor(config.musicSystem.messages.errorFindingVideo.embed.title)
                .setColor(config.musicSystem.messages.errorFindingVideo.embed.color)
                .setDescription(config.musicSystem.messages.errorFindingVideo.message)
                .setFooter(embeds);
                return msg.channel.send(Could_Not_Find_Video);

            case "Error - Too many songs to queue":
                let Error_Too_many_songs_to_queue = new Discord.RichEmbed()
                .setAuthor("Music System")
                .setColor("#990000")
                .setDescription(`❗ There are too many videos to queue. The max limit for the queue is 50 videos at once.`)
                .setFooter(embeds);
                return msg.channel.send(Error_Too_many_songs_to_queue);

            case "Queued Multiple Songs":
                let Queued_One_Song = new Discord.RichEmbed()
                .setAuthor(config.musicSystem.messages.queuedMultipleSongs.embed.title)
                .setColor(config.musicSystem.messages.queuedMultipleSongs.embed.color)
                .setDescription(config.musicSystem.messages.queuedMultipleSongs.message.replace(/{amount}/g, sender))
                .setFooter(embeds);
                return msg.channel.send(Queued_One_Song);

            case "Queued 1 song":
                let Queued_Multiple_Songs = new Discord.RichEmbed()
                .setAuthor(config.musicSystem.messages.queuedOneSong.embed.title)
                .setColor(config.musicSystem.messages.queuedOneSong.embed.color)
                .setDescription(config.musicSystem.messages.queuedOneSong.message.replace(/{amount}/g, sender))
                .setFooter(embeds);
                return msg.channel.send(Queued_Multiple_Songs);

            case "Playlist Queued":
                let Playlist_Queued = new Discord.RichEmbed()
                .setAuthor(config.musicSystem.messages.playlistQueued.embed.title)
                .setColor(config.musicSystem.messages.playlistQueued.embed.color)
                .setDescription(config.musicSystem.messages.playlistQueued.message.replace(/{playlist}/g, sender))
                .setFooter(embeds);
                return msg.channel.send(Playlist_Queued);
                
            case "Queue Empty":
                let Queue_Empty = new Discord.RichEmbed()
                .setAuthor(config.musicSystem.messages.queueEmpty.embed.title)
                .setColor(config.musicSystem.messages.queueEmpty.embed.color)
                .setDescription(config.musicSystem.messages.queueEmpty.message)
                .setFooter(embeds);
                return msg.channel.send(Queue_Empty);
            
            case "Queue Not Found":
                let Queue_Not_Found = new Discord.RichEmbed()
                .setAuthor(config.musicSystem.messages.queueNotFound.embed.title)
                .setColor(config.musicSystem.messages.queueNotFound.embed.color)
                .setDescription(config.musicSystem.messages.queueNotFound.message)
                .setFooter(embeds);
                return msg.channel.send(Queue_Not_Found);
        }
    }
};
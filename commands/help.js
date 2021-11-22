const Discord = require("discord.js");
const { Client, MessageAttachment } = require("discord.js");
const client = new Client();
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
let prefix = config.bot.prefix;
const helpMenu = yaml.safeLoad(fs.readFileSync('./assets/Required-Files/Systems/Core/help.yml', 'utf8'));

module.exports.run = async (client, message, args) => {
    let botName = client.user.username;
    if(!args[0]){
        let helpembed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setAuthor(`${botName} Help Menu, Choose a category! I wont bite!`)
    .setDescription(" \n")
    .setThumbnail(client.DisplayAvatarURL)
    .addField(":hammer: Moderation", `${prefix}help moderation`, true)
    .addField(':joystick: Games', `${prefix}help games`, true)
    .addField(':laughing: Fun', `${prefix}help fun`, true)
    .addField(':moneybag: Economy', `${prefix}help economy`, true)
    .addField(':newspaper: General', `${prefix}help general`, true)
    .addField(':tickets: Misc', `${prefix}help misc`, true)
    .setTimestamp()
    .setFooter(`Requested by ${message.author.username}`, message.author.DisplayAvatarURL);
    message.channel.send(helpembed);
    }

    /*
    if(args[0] == "moderation"){
        let modembed = new Discord.RichEmbed()
        .setAuthor(`${botName} Moderation Help Menu`)
        .setColor('#0099ff')
        .addField(':mega: Announce', `${prefix}announce <announcement>\nThis will announce what you want in the announcements channel`, true)
        .addField(':no_entry_sign: Ban', `${prefix}ban <member> <reason>\nThis will ban the person from the Discord`, true)
        .addField(':grinning: UnBan', `${prefix}unban <member> <reason>\nThis will unban the person from the Discord!\nNOTE: This feature is in beta`, true)
        .addField(':x: Blacklist', `${prefix}blacklist <member> <reason>\nRestricts user access to only two channels, The blacklist channel and the ticket`, true)
        .addField(':yum: Unblacklist', `${prefix}unblacklist <member>\nGives back user full access to the default channels`, true)
        .addField(':envelope: LockChannel', `${prefix}lock\nLocks the current channel so only staff can speak`, true)
        .addField(':incoming_envelope: Unlock Channel', `${prefix}unlock\nGives the members access to speak in the channel again`, true)
        .addField(':family_mmgg: Poll', `${prefix}poll <poll>\nSends a poll in the polls channel for people to vote`, true)
        .addField(':loudspeaker: Say', `${prefix}say <message>\nTurns your message into an embed! and sends it to the current channel`, true)
        .addField(':red_circle: Purge', `${prefix}purge <amount>\nRemoves x amount of messages`, true)
        .addField(':passport_control: Create Role', `${prefix}createrole <rolename> <role color>\nCreates a role`, true)
        .addField(':space_invader: Delete Role', `${prefix}deleterole <rolename>\nDeletes the role`, true)
        .addField('🙌🏻: Create Channel', `${prefix}createchannel <type> <name>\nCreates a channel`, true)
        .addField('✏️: Delete Channel', `${prefix}deletechannel\nDeletes the current channel you are in`, true)
        .addField(':love_letter: Transcripts', `${prefix}script\nGets the messages in a current channel and logs them`, true)
        .addField('📣 Giveaway', `${prefix}giveaway\nStarts the setup process for creating a giveaway`, true);

        message.channel.send(modembed);
    }
    

    if(args[0] == "games"){
        let gamesembed = new Discord.RichEmbed()
        .setAuthor(`${botName} Games Help Menu`)
        .setColor("#0099ff")
        .addField(':moneybag: Heads or Tails', `${prefix}coinflip <heads or tails> <steak>\nGamble x amount of coins on heads or tails and possibly double your steak!`, true)
        .addField(':shark: Would You Rather', `${prefix}rather\nGives you a question relating to the game would you rather!`)
        .addField(':slot_machine: Slots', `${prefix}slot <amount>\nTake a hit at the slot machine`);
        message.channel.send(gamesembed);
    }

    if(args[0] == "fun"){
        let funembed = new Discord.RichEmbed()
        .setAuthor(`${botName} Fun Help Menu`)
        .setColor("#0099ff")
        .addField(':8ball: Magic 8 ball', `${prefix}8ball <question>\nThe magic 8ball will decide your fate from your question`, true)
        .addField(':dog2: Dog', `${prefix}dog\nGets you a random picture of a cute dog`, true)
        .addField(':cat: Cat', `${prefix}cat\nGets you a random picture of a cute cat`, true)
        .addField(':bird: Bird', `${prefix}bird\nGets you a random picture of a bird`, true)
        .addField('߷ Fidget Spinner', `${prefix}fidgetspinner\nSpins your fidget spinner`, true)
        .addField('(╯◕_◕)╯ Leet', `${prefix}leet <message>\nTurns your message in leet`, true)
        .addField(':rofl: Trump Quote', `${prefix}trump\nGets a quote from Donald J Trump`, true)
        .addField(':champagne: Vodka', `${prefix}vodka\nGives you a nice gif of you drinking vodka!`, true)
        .addField(':man_dancing: Slav Dance', `${prefix}slav\nGives you a brilliant gif of an amazing dancer`, true)
        .addField('Comics', `${prefix}comics\nGets you a random post from r/comics`, true)
        .addField('Dank Meme', `${prefix}dankmeme\nGets you a random post from r/dankmemes`, true)
        .addField('Meme', `${prefix}meme\nGets you a random post from r/memes`, true)
        .addField('ShowerThought', `${prefix}showerthought\nGets you a random post from r/showerthoughts`, true)
        .addField('Tinder', `${prefix}tinder\nGets you a random post from r/tinder`, true)
        .addField('Well That Sucks', `${prefix}wellthatsucks\nGets you a random post from r/wellthatsucks`, true)
        .addField('Wholesome Meme', `${prefix}wholesome\nGets you a random post from r/wholesomememes`, true);
        message.channel.send(funembed);
    }

    if(args[0] == "economy"){
        let funembed = new Discord.RichEmbed()
        .setAuthor(`${botName} Economy Help Menu`)
        .setColor("#0099ff")
        .addField(':first_place: Coins Leaderboard', `${prefix}coinsleaderboard\nGets the top 15 people with the most coins on the server`, true)
        .addField(':second_place: XP leaderboard', `${prefix}xpleaderboard\nGets you the top 15 people with the most levels!`, true)
        .addField(':rocket: Level', `${prefix}level\nShows you your current level and how much xp you need to level up`, true)
        .addField(':money_with_wings: Coins', `${prefix}coins\nShows you your balance`, true)
        .addField(':confused: Set Coins', `${prefix}setcoins <member> <amount>\nSets the members coins to x amount`, true)
        .addField(':writing_hand: Pay', `${prefix}pay <user> <amount>\nPay someone a bit of your wealth`, true)
        .addField(':moneybag: Give Coins', `${prefix}givecoins <user> <amount>\nSets someones balance to x and adds their balance on top`, true);
        message.channel.send(funembed);
    }

    if(args[0] == "misc"){
        let miscembed = new Discord.RichEmbed()
        .setAuthor(`${botName} Misc Help Menu`)
        .setColor("#0099ff")
        .addField(':desktop: Screenshare', `${prefix}screenshare\nAllows you to screenshare right from the voice channel you are in!`)
        .addField(':books: Define', `${prefix}define <word>\nAllows you to look up the meaning of a word`)
        .addField(':family_wwgg: Member Count', `${prefix}membercount\nGives you the total members in the discord`)
        .addField(':frame_photo: Avatar', `${prefix}avatar <tag user>\nGets you the pfp of the mentioned user`)
        .addField(':key2: Server ID', `${prefix}serverid\nGets you the ID of the entire guild`)
        .addField(':busts_in_silhouette: User ID', `${prefix}userid <tag user>\nGets you the ID of the desired user`)
        .addField(':dark_sunglasses: User Information', `${prefix}info <tag user>\nGives you the stats of the desired user`)
        .addField('🆔 Channel ID', `${prefix}channelid <channel>\nGets the ID of a desired channel`, true)
        .addField(':ping_pong: Ping', `${prefix}ping\nPong! Good for testing the latency of the bot`)
        .addField('🇮🇩 Role ID', `${prefix}roleid <role>\nGets the ID of a role`, true);

        message.channel.send(miscembed);
    }

    if(args[0] == "general"){
        let generalembed = new Discord.RichEmbed()
        .setAuthor(`${botName} General Help Menu`)
        .setColor("#0099ff")
        .addField(':clipboard: Report', `${prefix}report <type> <reason>\nReport something`)
        .addField(':bowling: IP', `${prefix}ip\nGives you the IP to the server`)
        .addField(':stopwatch: Latency', `${prefix}latency\nShows you the ping of the bot to the Discord API`)
        .addField(':page_with_curl: Links', `${prefix}links\nShows you the links of the server`)
        .addField(':mega: Suggest', `${prefix}suggest <suggestion>\nGive in your suggestion and make your voice heard!`)
        .addField(':link: Website', `${prefix}website\nGives you the link to the website`)
        .addField(':shopping_cart: Store', `${prefix}store\nGives you the link to the webstore`)
        .addField(':card_index: New Ticket', `${prefix}new\nOpens a support ticket`)
        .addField('🤝 Add', `${prefix}add <user> <ticket>\nAdd\'s another user to a ticket`)
        .addField(':wave: Remove', `${prefix}remove <user> <ticket>\nRemoves a user from a ticket`)
        .addField(':x: Close Ticket', `${prefix}close\nCloses your support ticket`);
        message.channel.send(generalembed);
    }
    */

    // Moderation
    var t;
    t = Object.values(helpMenu.help.menu.moderation)
            .map(startingPoint => `**${startingPoint.commandTitle}**\n${config.bot.prefix}${startingPoint.commandUsage}\n${startingPoint.commandDescription}`)
            .join("\n\n");
    if(args[0] == "moderation") {
        let testEmbed = new Discord.RichEmbed()
        .setAuthor(config.general.help.moderation.title)
        .setColor(config.general.help.moderation.color)
        .setDescription(t);
        message.channel.send(testEmbed);
    }

    // Games
    var g;
    g = Object.values(helpMenu.help.menu.games)
            .map(startingPoint => `**${startingPoint.commandTitle}**\n${config.bot.prefix}${startingPoint.commandUsage}\n${startingPoint.commandDescription}`)
            .join("\n\n");
    if(args[0] == "games") {
        let testEmbed = new Discord.RichEmbed()
        .setAuthor(config.general.help.games.title)
        .setColor(config.general.help.games.color)
        .setDescription(g);
        message.channel.send(testEmbed);
    }

    // Fun
    var f;
    f = Object.values(helpMenu.help.menu.fun)
            .map(startingPoint => `**${startingPoint.commandTitle}**\n${config.bot.prefix}${startingPoint.commandUsage}\n${startingPoint.commandDescription}`)
            .join("\n\n");
    if(args[0] == "fun") {
        let testEmbed = new Discord.RichEmbed()
        .setAuthor(config.general.help.fun.title)
        .setColor(config.general.help.fun.color)
        .setDescription(f);
        message.channel.send(testEmbed);
    }

    // Economy
    var e;
    e = Object.values(helpMenu.help.menu.economy)
            .map(startingPoint => `**${startingPoint.commandTitle}**\n${config.bot.prefix}${startingPoint.commandUsage}\n${startingPoint.commandDescription}`)
            .join("\n\n");
    if(args[0] == "economy") {
        let testEmbed = new Discord.RichEmbed()
        .setAuthor(config.general.help.economy.title)
        .setColor(config.general.help.economy.color)
        .setDescription(e);
        message.channel.send(testEmbed);
    }

    // Misc
    var m;
    m = Object.values(helpMenu.help.menu.misc)
            .map(startingPoint => `**${startingPoint.commandTitle}**\n${config.bot.prefix}${startingPoint.commandUsage}\n${startingPoint.commandDescription}`)
            .join("\n\n");
    if(args[0] == "misc") {
        let testEmbed = new Discord.RichEmbed()
        .setAuthor(config.general.help.misc.title)
        .setColor(config.general.help.misc.color)
        .setDescription(m);
        message.channel.send(testEmbed);
    }

    // General
    var ge;
    ge = Object.values(helpMenu.help.menu.general)
            .map(startingPoint => `**${startingPoint.commandTitle}**\n${config.bot.prefix}${startingPoint.commandUsage}\n${startingPoint.commandDescription}`)
            .join("\n\n");
    if(args[0] == "general") {
        let testEmbed = new Discord.RichEmbed()
        .setAuthor(config.general.help.general.title)
        .setColor(config.general.help.general.color)
        .setDescription(ge);
        message.channel.send(testEmbed);
    }
};
module.exports.help = {
  name: "help",
  aliases: []
};
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

exports.run = async (client, message, args) => {
    //roles
    const owner = config.roles.owner;
    const memberrole = config.roles.member;
    const bannedrole = config.roles.blacklisted;
    const staffrole = config.roles.staff;
    const supportteamrole = config.roles.supportTeam;

    //channels
    const logschannel = config.channel.logs;
    const suggestionschannel = config.channel.suggestions.normal;
    const reportschannel = config.channel.reports;
    const welcomengoodbyechannel = config.channel.joinLeave;
    const pollschannel = config.channel.polls;
    const announcementschannel = config.channel.announcements;


    if (message.guild.owner) {
        let embed1 = new Discord.RichEmbed()
            .setAuthor("VodkaBot Setup")
            .setColor([0, 255, 255])
            .setDescription("initiating Setup Process... Please wait.")
            .setFooter("Vodkabot -- Ufero Team 2019");
        message.channel.send(embed1).then((msg) => {
            let embed2 = new Discord.RichEmbed()
                .setAuthor("VodkaBot Setup")
                .setColor([0, 255, 255])
                .setDescription("Welcome to the VodkaBot Setup Process.\n\nTo start the setup process please enter **Y**\nTo stop the setup process please enter **N**")
                .setFooter("VodkaBot -- Ufero Team 2019");
            setTimeout(function () {
                msg.edit(embed2);
            }, 2000);
        });
        const Tfilter = m => m.content === 'Y';
        message.channel.awaitMessages(Tfilter, {
            max: 1,
            time: 15000
        }).then(collect => {
            let embed5 = new Discord.RichEmbed()
                .setAuthor("VodkaBot Setup")
                .setColor([0, 255, 255])
                .setDescription("Setup Started!\nPlease Wait...")
                .setFooter("VodkaBot -- Ufero Team 2019");
            message.channel.send(embed5);

            let embed6 = new Discord.RichEmbed()
                .setAuthor("VodkaBot Setup")
                .setColor([0, 255, 255])
                .setDescription("Phase 1 -- Has Now Started!\nStatus: Creating Channels")
                .setFooter("VodkaBot -- Ufero Team 2019");
            message.channel.send(embed6);

            //Creates Channels
            /*
            try {
                message.guild.createChannel(logschannel),
                    message.guild.createChannel(suggestionschannel),
                    message.guild.createChannel(reportschannel),
                    message.guild.createChannel(welcomengoodbyechannel),
                    message.guild.createChannel(pollschannel),
                    message.guild.createChannel(announcementschannel);
            } catch (error) {
                if (error) {
                    return message.channel.send("VodkaBot Diagnostics\n\nThere was an error when attempting to do an action.\nMaybe I do not have the correct permissions?");
                }
            }
            */
           message.guild.createChannel(logschannel, {type: "text"});
           message.guild.createChannel(suggestionschannel, {type: "text"});
           message.guild.createChannel(reportschannel, {type: "text"});
           message.guild.createChannel(welcomengoodbyechannel, {type: "text"});
           message.guild.createChannel(pollschannel, {type: "text"});
           message.guild.createChannel(announcementschannel, {type: "text"});

            //Sends once channels have been created
            let embed7 = new Discord.RichEmbed()
                .setAuthor("VodkaBot Setup")
                .setColor([0, 255, 255])
                .setDescription("Phase 1\nStatus: COMPLETE\n\nMoving on to next phase...")
                .setFooter("VodkaBot -- Ufero Team 2019");
            message.channel.send(embed7);

            let embed8 = new Discord.RichEmbed()
                .setAuthor("VodkaBot Setup")
                .setColor([0, 255, 255])
                .setDescription("Phase 2 -- Has Now Started!\nStatus: Creating Roles")
                .setFooter("VodkaBot -- Ufero Team 2019");
            message.channel.send(embed8);

            //Creates Roles
            message.guild.createRole({
                    name: owner,
                    color: [0, 250, 255],
                    permissions: []
                }),
                message.guild.createRole({
                    name: memberrole,
                    color: [250, 254, 251],
                    permissions: []
                }),
                message.guild.createRole({
                    name: staffrole,
                    color: [175, 88, 163],
                    permissions: []
                }),
                message.guild.createRole({
                    name: bannedrole,
                    color: [240, 160, 0],
                    permissions: []
                }),
                message.guild.createRole({
                    name: supportteamrole,
                    color: [255, 0, 0],
                    permissions: []
                });

            let embed9 = new Discord.RichEmbed()
                .setAuthor("VodkaBot Setup")
                .setColor([0, 255, 255])
                .setDescription("Phase 2\nStatus: COMPLETE\n\nAll roles have now been created. Please configure the roles permissions to your liking.")
                .setFooter("VodkaBot -- Ufero Team 2019");
            message.channel.send(embed9);

            let embed10 = new Discord.RichEmbed()
                .setAuthor("VodkaBot Setup")
                .setColor([0, 255, 255])
                .setDescription(`VodkaBot Setup Is Now Complete!\n\nPhases passed: 1, 2\nStatus: DONE\n\nThank you for choosing VodkaBot, If you have any issues feel free to contact us on our Discord.\nVodkabot -- Ufero Team.\n\nBot Information:\nVersion: ${config.bot.version}\n\nSetup Process Closing...`)
                .setFooter("VodkaBot -- Ufero Team 2019");
            return message.channel.send(embed10);
        });

        const Ffilter = m => m.content === 'N';
        message.channel.awaitMessages(Ffilter, {
            max: 1,
            time: 15000
        }).then(collect => {
            const msg = collect.first();
            let embed3 = new Discord.RichEmbed()
                .setAuthor("VodkaBot Setup")
                .setColor([0, 255, 255])
                .setDescription("Setup is now closing.")
                .setFooter("VodkaBot -- Ufero Team 2019");
            return message.reply(embed3);
        });
    } else {
        let embed4 = new Discord.RichEmbed()
            .setAuthor("No Permission")
            .setColor([255, 0, 0])
            .setDescription("Error! You do not have permission to run this command.\nOnly the guild owner can run this command.")
            .setFooter("VodkaBot -- Ufero Team 2019");
        return message.reply(embed4);
    }
};
exports.help = {
    name: "setup",
    aliases: []
};
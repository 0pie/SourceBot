const yaml = require("js-yaml")
const fs = require("fs")
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))
const messages = require("../modules/messages");

module.exports.run = async (client, message, args) => {
    var coinFile = require(`${process.cwd()}/assets/data/coins.json`),
        coins = await coinFile;

        
    if(!args[0]) {
        let embed = new Discord.RichEmbed()
        .setAuthor("Shop")
        .setDescription("You can buy an item by doing -shop buy <lineNumber>")
        .addField("Coin Boost", "Cost: 250", true)
        .addField("Donation Credits", "Cost: 7500", true)
        .addField("Role VIP", "Cost: 50000", true)
        .setFooter("VodkaBot by Liam and Ufo");

    return message.channel.send(embed);
    }

    if(args[0] === "buy") {
        if(!args[1]) {
            return message.channel.send("What would you like to buy?");
        } else {
            v = Object.values(config.general.shop.items)
                .map(start => start.usage);
            if(args[1] === start.usage){
                if(args[1] === "1") {
                    return message.channel.send("Okay so Coinbooster it is");
                }
            }
        }
    }

};

module.exports.help = {
    name: "shop",
    aliases: []
};
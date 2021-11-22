const Discord = require("discord.js");
const client = new Discord.Client();
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require("../modules/messages");

exports.run = async (client, message, args) => {
    if(config.misc.randomNumberGen.enabled === false) { return; }
    let numOption = args[0];

    if(!numOption) { return message.channel.send("You did not provide me a max number."); }

    let num = Math.floor(Math.random() * numOption);

    if(config.core.embeds === false) { return message.channel.send(`The random number is: ${num}`); }
    let embed = new Discord.RichEmbed()
    .setAuthor("Random Number Generator")
    .setColor("#95aa22")
    .setDescription(`The random number is: ${num}`)
    return message.channel.send(embed);
};
exports.help = {
    name: "randomnumber",
    aliases: config.misc.randomNumberGen.aliases
};
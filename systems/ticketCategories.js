const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const yaml = require("js-yaml");
const config = yaml.safeLoad(fs.readFileSync("./config.yml", "utf8"));

module.exports = async (message) => {
    if(message.channel.type === "dm") { return; }
    if(config.ticketSystem.categories.enabled === false) { return; }
    if (message.channel.name.includes("ticket-")) {
        if (!message.member.roles.find(r => r.name == config.roles.supportTeam)) {
            // awaitng response
            try {
                message.channel.setParent(`${config.ticketSystem.categories.awaitingResponseID}`);
            }
            catch(error){
                if(error){
                    return;
                }
            }
        } else {
            // responded by staff
            try {
                message.channel.setParent(`${config.ticketSystem.categories.respondedID}`);
            }
            catch(error){
                if(error){
                    return;
                }
            }
        }
    }
};
const Discord = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const ud = require('urban-dictionary');
const messages = require("../modules/messages");

module.exports.run = async (bot, message, args) => {
  if (config.misc.define.enabled === true) {

    // All the commented shit, is broken afaik.
    // still same error of app_id is undefined
    // even though it is

    /*
    var dictconf = {
      app_id : "70c0a2f2",
      app_key : "ea4b48773f9080e65aff5c96882bd8dd",
      source_lang : "en"
    };
    
    var dict = new Dictionary(dictconf);

    let args1 = args[0];
    if(!args1){
      messages.EmbedInvalidArgsMessages(message, "NoWord Provided");
    }

    if(args1){
      var lookup = dict.pronunciations(args1);

        lookup.then(function(res) {
          body = JSON.stringify(res, null, 4);
          var myObject = JSON.parse(body);
          var definition = myObject.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
          
          if(config.allMessagesIn_Embeds === true){
            messages.EmbedMessages(message, "Define Command WordFound", message.author.id, definition)
          }
      },
      function(err) {
          console.log(err);
          message.reply(err);
      });
    }
    */

    // Shit that works, taken from their actual docs
    // needs to be formatted JSON wise.
    /*
   let args1 = args[0];
    if(!args1){
      return messages.EmbedInvalidArgsMessages(message, "NoWord Provided");
    }
    const http = require("https");

    const app_id = "70c0a2f2"; // insert your APP Id
    const app_key = "ea4b48773f9080e65aff5c96882bd8dd"; // insert your APP Key
    const wordId = args1;
    const fields = "definitions";
    const strictMatch = "false";

    const options = {
      host: 'od-api.oxforddictionaries.com',
      port: '443',
      path: '/api/v2/entries/en-gb/' + wordId + '?fields=' + fields + '&strictMatch=' + strictMatch,
      method: "GET",
      headers: {
        'app_id': app_id,
        'app_key': app_key
      }
    };

    http.get(options, (resp) => {
      let body = '';
      resp.on('data', (d) => {
        body += d;
      });
      resp.on('end', () => {
        let parsed = JSON.stringify(body);

        // Logs the shit
        console.log(parsed);
        console.log(parsed.definitions);
      });
    });
    */


    // Urban Dictionary
    let word = args[0];
    if(!word){
      return messages.EmbedInvalidArgsMessages(message, "NoWord Provided", config.misc.define.messages.embed.footer, config.misc.define.messages.embed.footer, config.misc.define.messages.embed.footer, config.misc.define.messages.embed.footer);
    }

    ud.term(word, (error, entries, tags, sounds) => {
      if(error){
        console.error(error.message);
      } else {
        let definition = String(entries[0].definition).substring(0,1020);
        let embed = new Discord.RichEmbed()
        .setAuthor(`Definition for ${word}`)
        .setColor(`#420360`)
        .addField(`Definitions:`, `${definition}`, true);
        return message.channel.send(embed);

      }
    });

  }
};
module.exports.help = {
  name: "define",
  aliases: config.misc.define.aliases
};
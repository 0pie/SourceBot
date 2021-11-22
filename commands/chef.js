const axios = require("axios").default;
const chalk = require('chalk');
let cooldown = new Set();
const fs = require("fs")
const yaml = require("js-yaml")
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))

module.exports.run = async (bot, message, args) => {
  var results = 75;

  axios({
    method: "post",
    url: "https://api.imgflip.com/caption_image",
    /*data: [
        {
            "text": "One does not simply",
            "x": 10,
            "y": 10,
            "width": 548,
            "height": 100,
            "color": "#ffffff",
            "outline_color": "#000000"
        },
        {
            "text": "Make custom memes on the web via imgflip API",
            "x": 10,
            "y": 225,
            "width": 548,
            "height": 100,
            "color": "#ffffff",
            "outline_color": "#000000"
        }
    ]*/
    params: {
        template_id: 112126428,
        username: "ImNotAuzero",
        password: "samsungrobot23",
        text0: "ooga booga",
        text1: ""
    }
}).then(function (response) {
    if (response.status !== 200) {
        console.log("Error");
    } else {
        console.log(response);
        message.channel.send(response.data.data.url);
    }
        //console.log(response.data);
});
};
module.exports.help = {
  name: "chef",
  aliases: []
};
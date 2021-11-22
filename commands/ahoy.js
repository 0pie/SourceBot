const Discord = require("discord.js");
const client = new Discord.Client();
const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const messages = require("../modules/messages");
const Canvas = require('canvas');

exports.run = async (client, message, args) => {
    if(config.meme.ahoy.enabled === false) { return; }

    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
        let fontSize = 70;

        do {
            ctx.font = `${fontSize -= 10}px sans-serif`;
        } while (ctx.measureText(text).width > canvas.width - 300);

        return ctx.font;
    };


    const canvas = Canvas.createCanvas(680, 680);
	const ctx = canvas.getContext('2d');

	// Since the image takes time to load, you should await it
	const background = await Canvas.loadImage('./assets/img/ahoytemp.jpg');
	// This uses the canvas dimensions to stretch the image onto the entire canvas
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = applyText(canvas, `${args.slice(0).join(' ')}`);
    ctx.fillStyle = '#000000';
    ctx.fillText(args.slice(0).join(' '), canvas.width / 3.5, canvas.height / 1.8);

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'ahoy.png');
	message.channel.send(attachment);
};
exports.help = {
    name: "ahoy",
    aliases: [],
};

const yaml = require("js-yaml");
const fs = require("fs");
const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
var gangs = JSON.parse(fs.readFileSync(`${process.cwd()}/assets/data/gangs.json`));
const Discord = require("discord.js");

exports.gangCreate = function(id, name) {
    let ga = "gangs";
    if (!gangs[name]) {
        var gang = (gangs[name] = []);
      } else {
        return config.gangs.messages.gAlreadyExists;
      }

    var objectos = [".", ",", "'", "\"", "|", "/", "#", "@", ":", ";", "%", "(", ")", "{", "}", "[", "]", "&", "^"];
    if(name.toLowerCase().includes(objectos)) {
        return "Invalid character found";
    }

    let g = getGangLeader(id);
    if(g === true) {
        return config.gangs.messages.uInAnotherGang;
    }
    
      gang.push({
        members: {
            leader: id,
            users: []
        },
        bank: 0,
        name: name
      });
    
      fs.writeFileSync(`${process.cwd()}/assets/data/gangs.json`, JSON.stringify(gangs));
      return config.gangs.messages.gCreated;
};

exports.getInfo = function(user) {
    let name = getGangName(user);
    
    var g = gangs[name];
    if(!gangs[name]) {
        return config.gangs.messages.gNotFound;
    }

    if(g.length >= 1) {
        var embed = new Discord.RichEmbed()
            .setAuthor("Gang info")
            .setColor(config.warningSystem.messages.warnings.embed.color);
            //.addField(`1) **Leader:** ${g[members.leader]}`)

        for(let i = 0; i < g.length; i++) {
            const gang = g[i];
            embed.addField(`${i+1}) Leader:`, `<@${gang.members.leader}>`);
        }

        for(let a = 0; a < g.length; a++) {
            const ga = g[a];
            if(ga.members.users == 0 || ga.members.users === undefined) {
                embed.addField(`Users`, `Nobody`);
            } else {
                //embed.addField(`${a+1}) Member:`, `<@${ga.members.users}>`);
                var h = 1;
                ga.members.users.forEach(function(value) {
                    h = h + 1
                    embed.addField(`${h}) Member:`, `<@${value}>`, true);
                });
            }

        }
    }
    return embed;

};

exports.join = function(name, id) {
    if(!gangs[name]) {
        return config.gangs.messages.gNotFound;
    } else {
        var gang = gangs[name];
    }

    for(let i = 0; i < gang.length; i++) {
        const g = gang[i];
        if(g.members.users.includes(id)) { return config.gangs.messages.uInAnotherGang; }
        if(g.members.leader === id) { return config.gangs.messages.uIsAlreadyInThisGang; }
        g.members.users.push(id);
    }

    fs.writeFileSync(`${process.cwd()}/assets/data/gangs.json`, JSON.stringify(gangs));
      return config.gangs.messages.uJoinedGang;
};

exports.leave = function(name, id) {
    if(!gangs[name]) {
        return config.gangs.messages.gNotFound;
    } else {
        var gang = gangs[name];
    }

    for(let i = 0; i < gang.length; i++) {
        const g = gang[i];
        //g.members.users.splice(g.members.users.indexOf(id), 0);
        for(let b = 0; b < g.members.users.length; b++) {
            if(g.members.users[b].includes(id)) {
                g.members.users.splice(b, 1);
            } else {
                return config.gangs.messages.uNotInGang;
            }
        }
        //console.log(g.members.users);
    }

    fs.writeFileSync(`${process.cwd()}/assets/data/gangs.json`, JSON.stringify(gangs));
      return config.gangs.messages.uLeftGang;
};

exports.kick = function(author, name, id) {
    let leader = getGangLeader(author);
    let gName = getGangName(leader);

    if(leader == false) {
        return config.gangs.messages.notGangLeader;
    }
    if(gName == false) {
        return config.gangs.messages.gNameNotFound;
    }

    gang = gangs[gName];

    for(let i = 0; i < gang.length; i++) {
        const g = gang[i];
        //g.members.users.splice(g.members.users.indexOf(id), 0);
        for(let b = 0; b < g.members.users.length; b++) {
            if(g.members.users[b] == name) {
                g.members.users.splice(b, 1);
            } else {
                return config.gangs.messages.uNotInGang;
            }
        }
        //console.log(g.members.users);
    }

    fs.writeFileSync(`${process.cwd()}/assets/data/gangs.json`, JSON.stringify(gangs));
      return config.gangs.messages.uKickedFromGang;
};

exports.disband = function(name, id) {
    if(!gangs[name]) {
        return config.gangs.messages.gNotFound;
    } else {
        var gang = gangs[name];
    }

    for(let i = 0; i < gang.length; i++) {
        const g = gang[i];
        console.log(g);
        //g.members.users.splice(g.members.users.indexOf(id), 0);
        if(g.members.leader === id) {
            delete gangs[name];
        } else {
             return config.gangs.messages.gNotFound;
        }
        console.log(g);
    }

    fs.writeFileSync(`${process.cwd()}/assets/data/gangs.json`, JSON.stringify(gangs));
      return config.gangs.messages.gDisbanded;
};

exports.getUserInfo = function (id) {
    /*
    var g = gangs;
    for(let i = 0; i < g.length; i++) {
        console.log(g[i].members.leader);
    }
    */
   for(let gang in gangs) {
       //console.log(gangs[gang]);
       const g = gangs[gang];
       for(let i = 0; i < g.length; i++) {
           const j = g[i];
           //console.log(j.members.users);
           //console.log(j.members.leader);
           if(j.members.leader === id || j.members.users.includes(id)) {
               return j.name;
           } else {
               return config.gangs.messages.uNotInGang;
           }
       }
   }
/*
   // Ignore this useless broken stuff for now.
        var embed = new Discord.RichEmbed()
            .setAuthor("Gang info")
            .setColor(config.warningSystem.messages.warnings.embed.color)
        //.addField(`1) **Leader:** ${g[members.leader]}`)

        for (let i = 0; i < g.length; i++) {
            const gang = g[i];
            embed.addField(`${i+1}) Leader:`, `<@${gang.members.leader}>`);
            console.log(`leader: ${gang.members.leader}`);
        }

        for (let a = 0; a < g.length; a++) {
            const ga = g[a];
            if (ga.members.users == 0 || ga.members.users === undefined) {
                embed.addField(`UsersD`, `Nobody`);
            } else {
                //embed.addField(`${a+1}) Member:`, `<@${ga.members.users}>`);
                var h = 1;
                ga.members.users.forEach(function (value) {
                    h = h + 1
                    embed.addField(`${h}) Member:`, `<@${value}>`, true);
                });
            }
        }
    return embed;
    */
};

function getGangName (id) {
    for(let gang in gangs) {
        //console.log(gangs[gang]);
        const g = gangs[gang];
        for(let i = 0; i < g.length; i++) {
            const j = g[i];
            //console.log(j.members.users);
            //console.log(j.members.leader);
            if(j.members.leader === id || j.members.users.includes(id)) {
                return `${j.name}`;
            } else {
                return false;
            }
        }
    }
}

function getGangLeader (id) {
    for(let gang in gangs) {
        //console.log(gangs[gang]);
        const g = gangs[gang];
        for(let i = 0; i < g.length; i++) {
            const j = g[i];
            //console.log(j.members.users);
            //console.log(j.members.leader);
            if(j.members.leader === id) {
                return true;
            } else {
                return false;
            }
        }
    }
}
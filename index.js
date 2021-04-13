const { Client, MessageEmbed, MessageAttachment} = require('discord.js');
const Database = require("@replit/database");
const db = new Database();
const config = require('./config');
const commands = require('./help');

var counter = 0;
var people = ["Ashish", "Maryo", "Luigi"];

let bot = new Client({
  fetchAllMembers: true,
  presence: {
    status: 'online',
    activity: {
      name: `${config.prefix}help`,
      type: 'LISTENING'
    }
  }
});

bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`));

bot.on('message', async message => {
  if(message.content.includes("maryo")) {
    message.react(message.guild.emojis.cache.get('821472125616390174')).catch(console.error); 
  }

  if(message.content.includes("maryo") && message.content.includes("plant")) {
    message.react(message.guild.emojis.cache.get('824040453786697758')).catch(console.error); 
  }

  if(message.content.includes("stonks")) {
    message.channel.send(new MessageAttachment('https://i.imgur.com/EFqRbev.png'));
  }

  if((message.content.includes("suggestion") || message.content.includes("suggest") || message.content.includes("think") || message.content.includes("suggest") || message.content.includes("Suggestion") || message.content.includes("Suggest") || message.content.includes("what if") || message.content.includes("What if")) && message.author.username != "baycsc") {
    message.reply('Do you have a suggestion? Consider opening a new topic in ' + message.guild.channels.cache.get('817135583314182195').toString() + " by going to " + message.guild.channels.cache.get('729539362831859715').toString() + " and typing in `maryo open <subject>`")
  }
  
  if (message.content.startsWith(config.prefix)) {
    let args = message.content.slice(config.prefix.length).split(' ');
    let command = args.shift().toLowerCase();

    switch (command) {
      case 'lead':
        message.reply(people[counter]);
        counter += 1;
        break;

      case 'rip':
        const attachment = new MessageAttachment('https://i.imgur.com/w3duR07.png');
        message.channel.send(attachment);
        break

      case 'ping':
        let msg = await message.reply('Pinging...');
        await msg.edit(`PONG! Message round-trip took ${Date.now() - msg.createdTimestamp}ms.`)
        break;

      case 'open':
        const open_embed = new MessageEmbed()
              .setTitle('New Open Topic')
              .setDescription(args.join(' '))
              .setColor(0xff0000)
              .setFooter(`Opened by: ${message.member ?  message.member.displayName : message.author.username}`, message.author.displayAvatarURL());
        if (args.length > 0)
          bot.channels.cache.get('817135583314182195').send(open_embed);
        else
          message.reply('You did not send a message to open, cancelling command.')
        break
      
      case 'say':
      case 'repeat':
      case 'says':
        if (args.length > 0)
          //message.channel.send(args.join(' '));
          message.channel.send(args.join(' '));
        else
          message.reply('You did not send a message to repeat, cancelling command.')
        break

      case 'help':
        let embed =  new MessageEmbed()
          .setTitle('HELP MENU')
          .setColor('GREEN')
          .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
          .setThumbnail(bot.user.displayAvatarURL());
        if (!args[0])
          embed
            .setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'));
        else {
          if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
            let command = Object.keys(commands).includes(args[0].toLowerCase())? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
            embed
              .setTitle(`COMMAND - ${command}`)

            if (commands[command].aliases)
              embed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
            embed
              .addField('DESCRIPTION', commands[command].description)
              .addField('FORMAT', `\`\`\`${config.prefix}${commands[command].format}\`\`\``);
          } else {
            embed
              .setColor('RED')
              .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
          }
        }
        message.channel.send(embed);
        break;
    }
  }
});

require('./server')();
bot.login(config.token);
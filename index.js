const { Client } = require('discord.js');
const msgLogger = Client();
const config = require('./config.json')
const token = config.Token;
const opn = require('opn');
const chalk = require('cli-color');

function login() {
    msgLogger.login(token)
}
    
msgLogger.on('ready', () => {
    
    opn('https://github.com/ifrost1337')

    console.clear()

    console.log(chalk.blueBright(`Logged In Successfully, Gathering Information and Fetching Messages..\nUser Information: \nUsername: ${msgLogger.user.username}\nDiscriminator: ${msgLogger.user.discriminator}\nEmail: ${msgLogger.user.email}\nNote: ${msgLogger.user.note}\nLast Message: ${msgLogger.user.lastMessage}\nFriends Count: ${msgLogger.user.friends.size}\nServers Count: ${msgLogger.guilds.size}\nID: ${msgLogger.user.id}\nLast Message ID: ${msgLogger.user.lastMessageID}`));
    
    msgLogger.on('messageDelete', (m) => {
    

        if (config.MessageLogger === false) return; 

            if (m.author.id === msgLogger.user.id) return;
    
            
            m.channel.fetchMessages(console.log(chalk.greenBright(`\nMessage Deletion Spotted.\nMessage Content Includes: ${m.content}\nMessage ID: ${m.id}\nMessage Author Tag: ${m.author.tag}\nMessage Author ID: ${m.author.id}\nMessage Deleted In: ${m.channel.name} in ${m.guild}`)))
        
    })

    msgLogger.on('messageDelete', (m) => {
    
        if (config.MessageLogger === false) return;

            if (m.author.id === msgLogger.user.id) return;
            
            m.channel.fetchMessages(console.log(chalk.greenBright(`\nMessage Bulk Deletion Spotted.\nMessage Content Includes: ${m.content}\nMessage ID: ${m.id}\nMessage Author Tag: ${m.author.tag}\nMessage Author ID: ${m.author.id}\nMessage Deleted In: ${m.channel.name} in ${m.guild}`)))
        
    })
    
    msgLogger.on('messageDelete', async (msg) => {
        if (config.DMSOnly === false) return;

        if (msg.channel.type === 'text') return;

        if (msg.author.id === msgLogger.user.id) return;

        if (msg.channel.type === 'category') return;

        if (msg.channel.type === 'dm' || 'group'){

            await msg.channel.fetchMessages(console.log(chalk.greenBright(`\nMessage Deletion Spotted.\nMessage Content Includes: ${msg.content}\nMessage ID: ${msg.id}\nMessage Author Tag: ${msg.author.tag}\nMessage Author ID: ${msg.author.id}\nMessage Deleted In: Direct Messages with ${msg.author.username}`)))

       }
    })
 })

 
 login()
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js'); 
const { config } = require('dotenv'); config();

const { BOT_TOKEN, CLIENT_ID, GUILD_ID, MONGODB_URL } = process.env;
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;



const client = new Client({
    intents: [
        Guilds,
        GuildMembers,
        GuildMessages
    ],
    partials: [
        User,
        Message,
        GuildMember,
        ThreadMember
    ]
});

client.commands    = new Collection();
client.subCommands = new Collection();
client.events      = new Collection();
client.guildConfig = new Collection();



const { connect } = require('mongoose');
connect(MONGODB_URL, {})
.then(() => console.log("The client is now connected to the database"))
.catch((err) => console.log(err));



const { loadEvents } = require('./Handlers/eventHandler.js'); 
loadEvents(client);

const { loadConfig } = require('./Functions/configLoader.js');
loadConfig(client);



client.login(BOT_TOKEN);
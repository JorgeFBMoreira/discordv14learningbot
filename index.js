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

const { loadEvents } = require('./Handlers/eventHandler.js'); 
client.events = new Collection();
client.commands = new Collection();

const { connect } = require('mongoose');
connect(MONGODB_URL, {
}).then(() => console.log("The client is now connected to the database"));

loadEvents(client);



client.login(BOT_TOKEN);
//import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
//import { config } from 'dotenv'; config(); 
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js'); 
const { config } = require('dotenv'); config();

const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
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
loadEvents(client);



client.login(BOT_TOKEN);
import { config } from 'dotenv';
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import orderCommand from './commands/order.js';
import rolesCommand from './commands/roles.js';
import usersCommand from './commands/users.js';
import channelsCommand from './commands/channel.js';
import banCommand from './commands/ban.js';
import { ActionRowBuilder, SelectMenuBuilder } from '@discordjs/builders';
config();

const TOKEN = process.env.BOT_TOKEN;;
const CLIENT_ID = process.env.BOT_CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const rest = new REST({ version: '10' }).setToken(TOKEN);   

client.on('ready', () => {
    console.log(`${client.user.username} has logged in.`);
})

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        if(interaction.commandName === 'order') {
            const actionRowComponent = new ActionRowBuilder()
                .setComponents(
                    new SelectMenuBuilder()
                        .setCustomId('food_options')
                        .setOptions(
                            { label: 'Cake', value: 'cake'},
                            { label: 'Pizza', value: 'pizza'},
                            { label: 'Sushi', value: 'sushi'},
                        )
                );

            interaction.reply({
                components: [actionRowComponent.toJSON()],
            });
            /*console.log(interaction.options)

            interaction.reply({
                content: `You ordered \`${interaction.options.get('food').value}\` and \`${interaction.options.get('drink').value}\``
            })*/
        };

        
    };


})

async function main() {

    const commands = [
        orderCommand, 
        rolesCommand, 
        usersCommand, 
        channelsCommand,
        banCommand
    ]

    try{
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), { 
            body: commands, 
        });

        console.log('Successfully reloaded application (/) commands.');
        client.login(TOKEN)
    } catch (err) {
        console.log(err);
    }
}

main()
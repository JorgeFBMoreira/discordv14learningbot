import { config } from 'dotenv';
import { ButtonStyle, Client, GatewayIntentBits, InteractionType, REST, Routes, TextInputStyle } from 'discord.js';
import { ActionRowBuilder, ButtonBuilder, ModalBuilder, SelectMenuBuilder, TextInputBuilder } from '@discordjs/builders';

import orderCommand from './commands/order.js';
import rolesCommand from './commands/roles.js';
import usersCommand from './commands/users.js';
import channelsCommand from './commands/channel.js';
import banCommand from './commands/ban.js';
import registerCommand from './commands/register.js';
import buttonCommand from './commands/button.js';
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
});

client.on('messageCreate', (m) => {
    if(m.author.bot) return;

    m.channel.send({
        content: 'Hello, World!',
        components: [
            new ActionRowBuilder().setComponents(
                new ButtonBuilder()
                    .setCustomId('button3')
                    .setLabel('Button 3')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('button4')
                    .setLabel('Button 4')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setLabel('Link Button')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://osu.ppy.sh/users/12599585'),
            )
        ]
    })
});

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
            const actionRowComponent2 = new ActionRowBuilder()
                .setComponents(
                    new SelectMenuBuilder()
                        .setCustomId('drink_options')
                        .setOptions(
                            { label: 'Water', value: 'water'},
                            { label: 'Coca-Cola', value: 'coca-cola'},
                        )
                );

            interaction.reply({
                components: [actionRowComponent.toJSON(), actionRowComponent2.toJSON()],
            });
        }
        else if(interaction.commandName === 'register') {
            const modal = new ModalBuilder()
                .setTitle('Register new Form')
                .setCustomId('registerUserModal')
                .setComponents(
                    new ActionRowBuilder()
                        .setComponents(
                            new TextInputBuilder()
                                .setLabel('Username')
                                .setCustomId('username')
                                .setStyle(TextInputStyle.Short)
                    ),
                    
                    new ActionRowBuilder()
                        .setComponents(
                            new TextInputBuilder()
                                .setLabel('E-mail')
                                .setCustomId('email')
                                .setStyle(TextInputStyle.Short)
                    ),
                    
                    new ActionRowBuilder()
                        .setComponents(
                            new TextInputBuilder()
                                .setLabel('Comment')
                                .setCustomId('comment')
                                .setStyle(TextInputStyle.Paragraph)
                    )
                );
          
            interaction.showModal(modal)
        }
        else if(interaction.commandName === 'button') {
            interaction.reply({
                content: 'Button!',
                components: [
                    new ActionRowBuilder().setComponents(
                        new ButtonBuilder()
                            .setCustomId('button1')
                            .setLabel('Button 1')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('button2')
                            .setLabel('Button 2')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('Link Button')
                            .setStyle(ButtonStyle.Link)
                            .setURL('https://osu.ppy.sh/users/12599585'),
                    )
                ]
            })
        };
    }

    else if(interaction.isStringSelectMenu()) {
        console.log('Select Menu');
        interaction.reply({
            content: 'Hello'
        });
    }

    else if(interaction.type === InteractionType.ModalSubmit) {
        console.log('Modal submitted...');
        console.log(interaction);

        if(interaction.customId === 'registerUserModal') {
            interaction.reply({
                content: `Username: ${interaction.fields.fields.get('username').value}\nUsername: ${interaction.fields.getTextInputValue('username')}`
            })
        }
    }

    else if(interaction.isButton()){
        console.log('Button Interaction');
        console.log(interaction);
        
        interaction.reply({
            content: 'Thanks for clicking on the Button.'
        });
    };
});

async function main() {

    const commands = [
        orderCommand, 
        rolesCommand, 
        usersCommand, 
        channelsCommand,
        banCommand,
        registerCommand,
        buttonCommand
    ];

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
};

main();
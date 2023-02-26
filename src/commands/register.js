import { SlashCommandBuilder } from '@discordjs/builders';

const registerCommand = new SlashCommandBuilder()
    .setName('register')
    .setDescription('Register the user the the server officially.')
    

export default registerCommand.toJSON();
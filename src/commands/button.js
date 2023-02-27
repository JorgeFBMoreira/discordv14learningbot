import { SlashCommandBuilder } from '@discordjs/builders';

const buttonCommand = new SlashCommandBuilder()
    .setName('button')
    .setDescription('Button CMD')

export default buttonCommand.toJSON();
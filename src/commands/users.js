import { SlashCommandBuilder } from '@discordjs/builders';

const usersCommand = new SlashCommandBuilder()
    .setName('users')
    .setDescription('User CMD')
    .addUserOption((option) => 
        option
            .setName('user')
            .setDescription('User')
    )

export default usersCommand.toJSON();
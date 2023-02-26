import { SlashCommandBuilder } from '@discordjs/builders';

const banCommand = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a User from the guild.')
    .addSubcommand((subcommand) => 
        subcommand
            .setName('temp')
            .setDescription('Temporary bans a User')
            .addUserOption((option) => 
                option
                    .setName('user')
                    .setDescription('User to be Banned')
            )
    )
    .addSubcommandGroup((group) => 
        group
            .setName('group_a')
            .setDescription('Group A of ban Command')
            .addSubcommand((subcommand) => 
                subcommand
                    .setName('perma')
                    .setDescription('Permanently bans a User')
                    .addUserOption((option) => 
                        option
                            .setName('user')
                            .setDescription('User to be Banned')
                    )
            )
            .addSubcommand((subcommand) => 
                subcommand
                    .setName('soft')
                    .setDescription('Soft ban a User')
                    .addUserOption((option) => 
                        option
                            .setName('user')
                            .setDescription('User to be Banned')
                    )
            )
    )
    .addSubcommandGroup((group) => 
        group
            .setName('group_b')
            .setDescription('Group B of ban Command')
            .addSubcommand((subcommand) => 
                subcommand
                    .setName('perma')
                    .setDescription('Permanently bans a User')
                    .addUserOption((option) => 
                        option
                            .setName('user')
                            .setDescription('User to be Banned')
                    )
            )
            .addSubcommand((subcommand) => 
                subcommand
                    .setName('soft')
                    .setDescription('Soft ban a User')
                    .addUserOption((option) => 
                        option
                            .setName('user')
                            .setDescription('User to be Banned')
                    )
            )
    )
    
    

export default banCommand.toJSON();
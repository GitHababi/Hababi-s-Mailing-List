import { SlashCommandBuilder, ChatInputCommandInteraction, BaseGuildEmojiManager, GuildMember } from "discord.js";
import { User } from '../database';
import * as logger from '../utils/console'
module.exports = { 
    data: new SlashCommandBuilder()
            .setName("addsubscriber")
            .setDescription("Add server member to server list")
            .addUserOption(option =>
                option.setName('subscriber')
                      .setDescription('The user to add to the mailing list')
                      .setRequired(true)),

    execute: async (interaction: ChatInputCommandInteraction) => {
        if (interaction.user.id !== process.env.adminUserId)
            return
        await interaction.deferReply({ephemeral: true})

        const subscriber = interaction.options.getUser('subscriber')
        const id = subscriber?.id
        
        let user = new User({ user: id })
        User.find({ user: id}, (error:any, result:any[]) => {
            if (result.length)
                interaction.editReply('Person is already subscribed!')
            else {
                user.save()
                 logger.info(`User ${subscriber?.username} subscribed to the Mailing List`)
                interaction.editReply("Sucessful!")
            }
        })
        
    }
}
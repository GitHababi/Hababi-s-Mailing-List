import { SlashCommandBuilder, ChatInputCommandInteraction, BaseGuildEmojiManager } from "discord.js";
import { User } from '../database';
import * as logger from '../utils/console'
module.exports = { 
    data: new SlashCommandBuilder()
            .setName("subscribe")
            .setDescription("Subscribe to the Mailing List!"),

    execute: async (interaction: ChatInputCommandInteraction) => {
        await interaction.deferReply({ephemeral: true})
        let user = new User({ user: interaction.member?.user.id})
        User.find({ user: interaction.member?.user.id}, (error:any, result:any[]) => {
            if (result.length)
                interaction.editReply('You are already subscribed!')
            else {
                user.save()
                 logger.info(`User ${interaction.member?.user.username} subscribed to the Mailing List`)
                interaction.editReply("Sucessful!")
            }
        })
        
    }
}
import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, EmbedAssertions, Attachment, APIEmbed, APIEmbedField, ThreadManager, Embed } from "discord.js";
import { connection, User, Post } from "../database";
import { client } from '../index';
import * as logger from '../utils/console'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('Lists all subscribers of the mailing list'),
    execute: async (interaction: ChatInputCommandInteraction) => {
        if (interaction.user.id !== process.env.adminUserId)
        return    
        await interaction.deferReply({ephemeral : true})
        
        let usernames = ' ';
        
        const users = await User.find()

        for (const user of users) {
                
            const target = await client.users.fetch(user.user)
            usernames += '\n·   ' + target.username.toString();
        }
        const embed = {
            title: 'Mailing List Users',
            fields: [
                {
                    name: usernames, 
                    value: '\u200b'
                }
            ],
            timestamp: new Date().toISOString()
        }
        interaction.editReply({ embeds: [embed] })
    }
}
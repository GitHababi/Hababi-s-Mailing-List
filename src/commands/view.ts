import { SlashCommandBuilder, CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction, EmbedBuilder, Embed, SharedSlashCommandOptions } from "discord.js";
import { Post, posts, ViewSession } from '../database'
import * as logger from '../utils/console'
import { attachmentIsVideo } from "../utils/files";
export const buttons = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('previous')
                    .setLabel('⏪')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('next')
                    .setLabel('⏩')
                    .setStyle(ButtonStyle.Primary)
            )

module.exports = {
    data: new SlashCommandBuilder()
            .setName('view')
            .setDescription('Opens a viewing menu from which you can see all previous posts'),
    execute: async (interaction:CommandInteraction) => {
        await interaction.deferReply({ephemeral : true})
        const sessions = await ViewSession.find({user: interaction.user.id})     
        if (sessions.length)
            sessions[0].delete()
        let session = new ViewSession({ user: interaction.user.id, postIndex: 0, sessionId: interaction.id})
        let post = posts[posts.length - 1]
        session.save();
        let embed = new EmbedBuilder().setTitle(post.title).setImage(post.attachment)
        interaction.editReply({ embeds:[embed], content: '\u200B',components: [buttons]})
        const filter = (i:any) => {
            return (i.customId === 'previous' || i.customId === 'next') && i.user.id === interaction.user.id;
        }
        
        const collector = (await interaction.fetchReply()).createMessageComponentCollector({filter: filter, idle: 60000})
        collector?.on('collect', async i => {
            if (i.isButton()) {
                session.postIndex += i.customId === 'previous' ? 1 : -1;
                session.postIndex = Math.min(Math.max(session.postIndex, 0), posts.length) // clamp value
                session.update()
                post = posts[posts.length - 1 - session.postIndex]
                embed = new EmbedBuilder().setTitle(post.title).setImage(post.attachment)
                if (attachmentIsVideo(post.attachment))
                    i.update({embeds: [], content: `Title:**${post.title}**\n${post.attachment}`,components: [buttons]})
                else
                    i.update({ embeds:[embed], content: '\u200B', components: [buttons]})
            }
        })
    }
}
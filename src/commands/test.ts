import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

module.exports = { 
    data: new SlashCommandBuilder()
            .setName("test")
            .setDescription("testing description"),

    execute: async (interaction: ChatInputCommandInteraction) => {
        interaction.reply("cool!")
    }
}
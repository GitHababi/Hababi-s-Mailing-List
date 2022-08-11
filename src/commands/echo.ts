import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

module.exports = { 
    data: new SlashCommandBuilder()
            .setName("echo")
            .setDescription("echos back user input")
            .addStringOption(option => 
                option.setName('input')
                      .setDescription('What will be echoed back')
                      .setRequired(true)),

    execute: async (interaction: ChatInputCommandInteraction) => {
        console.log(`[\x1b[36mHML\x1b[37m] Echoing: ${interaction.options.getString('input') ?? ""}`)
        interaction.reply(interaction.options.getString('input') ?? "")
    }
}
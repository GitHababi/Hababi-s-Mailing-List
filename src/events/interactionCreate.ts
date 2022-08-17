import { ApplicationCommandType, Interaction } from "discord.js"
import { buttons, commands } from "../register"

module.exports = {
    event: "interactionCreate",
    action: async (interaction: Interaction) => {
            if (interaction.isChatInputCommand()) {
                let responder = commands?.get(interaction.commandName);
                responder?.execute(interaction)
            }
            if (interaction.isButton()) {
                let responder = buttons?.get(interaction.customId);
                responder?.execute(interaction)
            }
    }
}

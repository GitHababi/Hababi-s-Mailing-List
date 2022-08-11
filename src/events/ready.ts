import { Client } from "discord.js"

module.exports = {
    event: "ready",
    action: async (client: Client) => {
        console.log(`[\x1b[32mHML\x1b[37m] ${client?.user?.tag} is Ready!`)
    }
}
import { Client } from "discord.js"

module.exports = {
    event: "ready",
    action: async (client: Client) => {
        console.log(`[\x1b[32mHML\x1b[37m] \x1b[90m${new Date().toTimeString().substring(0,8)}\x1b[0m ${client?.user?.tag} is Ready!`)
    }
}
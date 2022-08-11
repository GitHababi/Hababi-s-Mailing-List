import { readdirSync } from "fs";
import {Collection, REST, Routes, ChatInputCommandInteraction, Client } from "discord.js";

export const commandResponses = new Collection<string,(interaction: ChatInputCommandInteraction) => Promise<void>>()

export const registerCommands = (rest: REST) => {
    console.log("[\x1b[36mHML\x1b[37m] Registering (/) commands")
    const commandData = [];
    const commandFiles = readdirSync('./src/commands').filter((file)=>file.endsWith(".js") || file.endsWith(".ts"));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commandData.push(command.data.toJSON())
        commandResponses.set(command.data.name, command.execute);
    }

    rest.put(Routes.applicationCommands(process.env.clientId ?? ''),{ body: commandData })
    console.log("[\x1b[36mHML\x1b[37m] Done registering (/) commands")

}

export const registerEvents = (client: Client) => {
    console.log("[\x1b[36mHML\x1b[37m] Registering events")
    const eventFiles = readdirSync('./src/events').filter((file)=>file.endsWith(".js") || file.endsWith(".ts"));
    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        client.on(event.event, event.action);
    }
    console.log("[\x1b[36mHML\x1b[37m] Done registering events")
}
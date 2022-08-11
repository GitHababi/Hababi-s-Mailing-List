import { Client, GatewayIntentBits, REST} from "discord.js";
import { registerCommands, registerEvents } from './register'
import { databaseConnect } from './database';
import * as dotenv from 'dotenv';
dotenv.config()
const rest = new REST({ version: "10" }).setToken(process.env.discordToken ?? '')


export const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages]
});

registerCommands(rest);
registerEvents(client);
databaseConnect();

client.login(process.env.discordToken ?? '');
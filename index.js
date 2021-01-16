
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./src/utils/registry');
const config = require('./slappey.json');
const client = new Client();

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, './src/commands');
  await registerEvents(client, './src/events');
  await client.login(process.env.DJS_TOKEN);
})();


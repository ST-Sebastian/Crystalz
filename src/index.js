
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client();
const mongo = require('../mongo');

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await mongo().then(mongoose => {
    try {
      console.log('Connected to Database!');
    } finally {
      mongoose.connection.close();
    }
  })
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.DJS_TOKEN);
})();
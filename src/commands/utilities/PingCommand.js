const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'utilities', []);
  }

  async run(client, message, args) { 
      message.channel.send(`🏓 Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
      .then(msg => {
                    msg.delete({ timeout: 10000 /*time unitl delete in milliseconds*/});
                });
  }
}
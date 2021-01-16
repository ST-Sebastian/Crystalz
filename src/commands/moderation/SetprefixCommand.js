const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SetprefixCommand extends BaseCommand {
  constructor() {
    super('setprefix', 'moderation', []);
  }

  run(client, message, args) {
    message.channel.send('setprefix command works');
  }
}
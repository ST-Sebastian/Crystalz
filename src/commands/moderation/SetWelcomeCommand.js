const BaseCommand = require('../../utils/structures/BaseCommand');
const mongo = require('../../../mongo');
const Discord = require('discord.js');

module.exports = class SetWelcomeCommand extends BaseCommand {
  constructor() {
    super('setWelcome', 'moderation', []);
  }

  async run(client, message, args) {
    if (!member.hasPermission('ADMINISTRATOR')) {
      message.channel.send('Testing for now');
    }
  }
}
const BaseCommand = require('../../utils/structures/BaseCommand');
const mongo = require('../../../mongo');

module.exports = class SetWelcomeCommand extends BaseCommand {
  constructor() {
    super('setWelcome', 'moderation', []);
  }

  run(client, message, args) {
    if (!member.hasPermission('ADMINISTRATOR')) {
      message.channel.send('Testing for now');
    }
  }
}
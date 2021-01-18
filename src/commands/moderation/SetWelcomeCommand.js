const BaseCommand = require('../../utils/structures/BaseCommand');
const mongo = require('../../../mongo');
const Discord = require('discord.js');
const welcomeSchema = require('../../../schemas/welcome-schema');

module.exports = class SetWelcomeCommand extends BaseCommand {
  constructor() {
    super('setWelcome', 'moderation', []);
  }

  async run(client, message, args) {
    const { member, channel, content, guild } = message

    if (!member.hasPermission('ADMINISTRATOR')) {
      channel.send('You do not have permission to run that command!');
      return;
    }

    await mongo().then(async (mongoose) => {
      try {
        await new welcomeSchema({
          _id: guild.id,
          channelId: channel.id,
          text: content
        }).save()
      } finally {
        mongoose.conenction.close();
      }
    });
  }
}
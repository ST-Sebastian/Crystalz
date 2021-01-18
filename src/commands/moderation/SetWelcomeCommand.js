const BaseCommand = require('../../utils/structures/BaseCommand');
const mongo = require('../../../mongo');
const Discord = require('discord.js');
const welcomeSchema = require('../../../schemas/welcome-schema');

module.exports = class SetWelcomeCommand extends BaseCommand {
  constructor() {
    super('setWelcome', 'moderation', []);
  }

  async run(client, message, args) {

    const cache = {}

    const { member, channel, content, guild } = message

    if (!member.hasPermission('ADMINISTRATOR')) {
      channel.send('You do not have permission to run that command!');
      return;
    }

    let text = content;

    const split = text.split(' ');

    if (split.length < 2) {
      channel.send('Please provide a welcome message!');
      return;
    }

    split.shift();
    text = split.join(' ');

    cache[guild.id] = [channel.id, text]

    await mongo().then(async (mongoose) => {
      try {
        await welcomeSchema.findOneAndUpdate({
          _id: guild.id
        }, {
            _id: guild.id,
            channelId: channel.id,
            text,
        }, {
          upsert: true
        });
      } finally {
        mongoose.connection.close();
      }
    });

    const onJoin = member => {
      const { guild } = member

      let data = cache[guild.id]

      if (!data) {
        console.log('Fetching from Database');

        await mongo().then(async mongoose => {
          try {
            const result = await welcomeSchema.findOne({ _id: guild.id });

            cache[guild.id] = [result.channelId, result.text]
          } finally {
            mongoose.connection.close();
          }
        });
      }
    }
    const channelId = data[0]
    const text = data[1]

    const channel = guild.channels.cache.get(channelId);
    channel.send(text);
  }
}
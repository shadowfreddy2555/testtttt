// Import the necessary modules
const { Client, Intents, MessageAttachment } = require('discord.js');
const keep_alive = require('./keep_alive.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '!'; // You can change the command prefix if needed

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Replace 'YOUR_SERVER_ID' and 'english-chat' with the actual server ID and channel name
  const server = client.guilds.cache.get('944696712159703090');
  const channel = server.channels.cache.find(channel => channel.name === 'english-chat' && channel.type === 'GUILD_TEXT');
  const announcementsChannel = server.channels.cache.get('1034450253627269240');

  // Read messages from console and send to the channel
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.on('line', (input) => {
    if (channel) {
      if (input === '!test') {
        channel.send('test');
      } else if (input === '!announce') {
        readline.question('Enter your announcement: ', (announcement) => {
          if (announcementsChannel) {
            announcementsChannel.send(announcement);
          } else {
            console.log('Announcements channel not found');
          }
        });
      } else if (input === '!error') {
        const attachment = new MessageAttachment('https://helpdeskgeek.com/wp-content/pictures/2021/11/error.jpg');
        channel.send({ files: [attachment] });
      } else if (input === '!offline') {
        client.user.setStatus('invisible');
        console.log('Bot status set to offline');
      } else if (input === '!online') {
        client.user.setStatus('online');
        console.log('Bot status set to online');
      } else if (input === '!upd') {
        client.user.setStatus('dnd');
        client.user.setActivity('Currently being updated', { type: 'PLAYING' });
        console.log('Bot status set to Do Not Disturb with custom status: Currently being updated');
      } else if (input === '!und') {
        client.user.setStatus('online');
        client.user.setActivity(); // Clears custom status
        console.log('Bot status set back to online, and custom status cleared');
      } else {
        channel.send(input);
      }
    } else {
      console.log('Channel not found');
    }
  });
});

// Log in to Discord with the bot's token
client.login('MTAwMzM0NDQyNTc0Mjc3ODUxMA.GmFA0n.yp9DWlwypufLreO6SKhuF3JA5DbWBCN1Zc6ptU');

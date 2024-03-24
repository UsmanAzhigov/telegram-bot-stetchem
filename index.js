const TelegramApi = require('node-telegram-bot-api');
const stathamQuotes = require('./module');

const token = '6526980209:AAHtXb9qcmGSqpGjLAzjA8Q-b9DJCOTb7fM';
const bot = new TelegramApi(token, { polling: true });

let chatId;

bot.onText(/\/start/, (msg) => {
  chatId = msg.chat.id;
  console.log('Бот получил команду /start.');
  sendRandomQuote();
});
function sendRandomQuote() {
  const randomIndex = Math.floor(Math.random() * stathamQuotes.length);
  const randomQuote = stathamQuotes[randomIndex];
  const quoteWithCredit = `<i>"${randomQuote}"</i>\n\n©Джейсон Стетхэм`;
  bot.sendMessage(chatId, quoteWithCredit, { parse_mode: 'HTML' });
}

function sendNightlyMessage() {
  const date = new Date();

  if (date.getHours() === 23 && date.getMinutes() === 29) {
    bot.sendMessage(chatId, 'Привет, я бот! Это ежедневное сообщение в 23:28.');
  }
}

setInterval(sendNightlyMessage, 60000);

console.log('Бот запущен.');

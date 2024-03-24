const TelegramApi = require('node-telegram-bot-api');
const axios = require('axios');
const cheerio = require('cheerio');

const token = '6526980209:AAHtXb9qcmGSqpGjLAzjA8Q-b9DJCOTb7fM';
const bot = new TelegramApi(token, { polling: true });

let chatId;

bot.onText(/\/start/, (msg) => {
  chatId = msg.chat.id;
  console.log('Бот получил команду /start.');
  sendRandomQuote();
});

function sendRandomQuote() {
  const allQuotes = [];
  const stathamQuotes = require('./module');
  allQuotes.push(...stathamQuotes);

  // Добавляем цитаты с других веб-сайтов (пример)
  const website1Quotes = scrapeQuotesFromWebsite('https://tgstat.ru/channel/@jas_statham');
  const website2Quotes = scrapeQuotesFromWebsite('https://tgstat.ru/channel/@jas_statham');

  Promise.all([website1Quotes, website2Quotes])
    .then((results) => {
      results.forEach((quotes) => {
        allQuotes.push(...quotes);
      });

      const randomIndex = Math.floor(Math.random() * allQuotes.length);
      const randomQuote = allQuotes[randomIndex];
      const quoteWithCredit = `<i>"${randomQuote}"</i>\n\n© Джейсон Стетхэм`;
      bot.sendMessage(chatId, quoteWithCredit, { parse_mode: 'HTML' });
    })
    .catch((error) => {
      console.error('Ошибка при получении цитат:', error);
    });
}

function scrapeQuotesFromWebsite(url) {
  return axios
    .get(url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const quotes = [];

      $('.quote').each((index, element) => {
        const quote = $(element).text().trim();
        quotes.push(quote);
      });

      return quotes;
    })
    .catch((error) => {
      console.error('Ошибка при скрапинге цитат с веб-сайта:', error);
      return [];
    });
}

function sendNightlyMessage() {
  const date = new Date();

  if (date.getHours() === 23 && date.getMinutes() === 28) {
    bot.sendMessage(chatId, 'Привет, я бот! Это ежедневное сообщение в 23:28.');
  }
}

setInterval(sendNightlyMessage, 60000);

console.log('Бот запущен.');

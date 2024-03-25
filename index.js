require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api');
const axios = require('axios');
const cheerio = require('cheerio');
const { Pool } = require('pg');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramApi(token, { polling: true });

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.on('connect', () => {
  console.log('Успешное подключение к базе данных PostgreSQL.');
});

pool.on('error', (error) => {
  console.error('Ошибка при подключении к базе данных PostgreSQL:', error);
});

let chatId;

bot.onText(/\/start/, (msg) => {
  chatId = msg.chat.id;
  console.log('Бот получил команду /start.');
  sendRandomQuote();
});

function scrapeQuotesFromWebsite(url) {
  return axios
    .get(url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const quotes = [];

      $('.post-text').each((index, element) => {
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

function saveQuoteToDatabase(quote) {
  // Проверяем, не является ли цитата пустой строкой
  if (!quote.trim()) {
    console.log('Пустая цитата. Пропускаем сохранение в базу данных.');
    return;
  }

  // Удаляем "(C) Джейсон Стетхем" из цитаты
  const cleanedQuote = quote.replace('(C) Джейсон Стетхем', '').trim();

  const query = {
    text: 'INSERT INTO quotes(quote_text) VALUES($1)',
    values: [cleanedQuote],
  };

  pool
    .query(query)
    .then(() => {
      console.log('Цитата успешно добавлена в базу данных.');
    })
    .catch((error) => {
      console.error('Ошибка при добавлении цитаты в базу данных:', error);
    });
}

function fetchQuoteFromDatabase() {
  const query = 'SELECT quote_text FROM quotes ORDER BY RANDOM() LIMIT 1';

  pool
    .query(query)
    .then((result) => {
      if (result.rows.length > 0) {
        const quote = result.rows[0].quote_text;
        const quoteWithCredit = `<i>"${quote}"</i>\n\n`;
        bot.sendMessage(chatId, quoteWithCredit, { parse_mode: 'HTML' });
      } else {
        console.log('База данных не содержит цитат.');
      }
    })
    .catch((error) => {
      console.error('Ошибка при получении цитаты из базы данных:', error);
    });
}

function sendRandomQuote() {
  const allQuotes = [];
  const stathamQuotes = require('./module');
  allQuotes.push(...stathamQuotes);

  const website1Quotes = scrapeQuotesFromWebsite('https://tgstat.ru/channel/@jas_statham');

  Promise.all([website1Quotes])
    .then((results) => {
      results.forEach((quotes) => {
        allQuotes.push(...quotes);
      });

      const nonEmptyQuotes = allQuotes.filter((quote) => quote.trim() !== '');

      if (nonEmptyQuotes.length === 0) {
        console.log('Все цитаты пусты. Пропускаем отправку.');
        return;
      }

      const randomIndex = Math.floor(Math.random() * nonEmptyQuotes.length);
      const randomQuote = nonEmptyQuotes[randomIndex];

      saveQuoteToDatabase(randomQuote);

      const quoteWithCredit = `<i>"${randomQuote}"</i>\n\n`;
      bot.sendMessage(chatId, quoteWithCredit, { parse_mode: 'HTML' });
    })
    .catch((error) => {
      console.error('Ошибка при получении цитат:', error);
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

require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api');
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

bot.setMyCommands([
  { command: '/start', description: 'Запустить бота' },
  { command: '/get', description: 'Получить рандомную цитату' },
  { command: '/add', description: 'Добавить цитату используя команду /add и ваша цитат' },
  { command: '/about', description: 'Информация о боте' },
  { command: '/help', description: 'Список команд' },
]);

bot.onText(/\/start/, (msg) => {
  chatId = msg.chat.id;
  console.log('Бот получил команду /start.');
  bot.sendMessage(chatId, 'Узнайте больше о боте, используйте команду /help');
});

bot.onText(/\/get/, (msg) => {
  chatId = msg.chat.id;
  console.log('Бот получил команду /start.');
  sendRandomQuote();
});

bot.onText(/\/add/, (msg) => {
  chatId = msg.chat.id;
});

bot.onText(/\/about/, (msg) => {
  chatId = msg.chat.id;
  const username = '@Chel06_ing';
  const githubLink = 'https://github.com/UsmanAzhigov';
  const aboutMessage = `Никнейм: ${username}\nGitHub: ${githubLink}`;
  bot.sendMessage(chatId, aboutMessage);
});

bot.onText(/\/help/, (msg) => {
  chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    'Список команд:\n/get - получить рандомную цитату\n/add - добавить цитату\n/about - информация о боте\n/help - список команд',
  );
});

bot.on('message', (msg) => {
  if (msg.text && msg.text !== '/add' && msg.text !== '/get') {
    if (chatId && msg.text.startsWith('/add')) {
      const quote = msg.text.substring(5).trim();
      const author = `${msg.from.first_name}`.trim();
      saveQuoteToDatabase(quote, author);
    } else {
      console.log(chatId, 'Для добавления цитаты используйте команду');
    }
  }
});

function saveQuoteToDatabase(quote, author) {
  if (!quote.trim()) {
    console.log('Пустая цитата. Пропускаем сохранение в базу данных.');
    return;
  }

  const cleanedQuote = quote.trim();

  const query = {
    text: 'INSERT INTO quotes (quote_text, author) VALUES ($1, $2)',
    values: [cleanedQuote, author],
  };

  pool
    .query(query)
    .then(() => {
      console.log('Цитата успешно добавлена в базу данных.');
      bot.sendMessage(chatId, 'Цитата успешно добавлена в базу данных!');
    })
    .catch((error) => {
      console.error('Ошибка при добавлении цитаты в базу данных:', error);
      bot.sendMessage(chatId, 'Не удалось добавить цитату в базу данных.');
    });
}

function sendRandomQuote() {
  if (!chatId) {
    console.log('chatId еще не установлен.');
    return;
  }

  const query = 'SELECT quote_text, author FROM quotes ORDER BY RANDOM() LIMIT 1';

  pool
    .query(query)
    .then((result) => {
      const randomQuote = result.rows[0];
      const quoteWithCredit = `<i>"${randomQuote.quote_text}"</i>\n\n(С) ${randomQuote.author}`;
      bot.sendMessage(chatId, quoteWithCredit, { parse_mode: 'HTML' });
    })
    .catch((error) => {
      console.error('Ошибка при получении случайной цитаты из базы данных:', error);
    });
}

console.log('Бот запущен.');

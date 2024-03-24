# Указываем базовый образ
FROM node:20-alpine

# Устанавливаем директорию приложения внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm i

# Копируем все файлы из текущего каталога в рабочую директорию внутри контейнера
COPY . .

# Порт, который будет использоваться для общения с внешним миром (если необходимо)
EXPOSE 3000

# Команда для запуска приложения (может отличаться в зависимости от способа запуска вашего бота)
CMD ["node", "index.js"]
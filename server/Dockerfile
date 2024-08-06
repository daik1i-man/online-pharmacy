# Используем официальный Node.js образ как базовый
FROM node:19-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Собираем проект
RUN npm run build

# Устанавливаем переменную окружения
ENV NODE_ENV=production

# Открываем порт для доступа
EXPOSE 4000

# Запуск приложения
CMD ["node", "build/index.js"]

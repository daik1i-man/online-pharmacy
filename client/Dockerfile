# Используем официальный Node.js образ как базовый
FROM node:19-alpine AS builder

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

# Используем меньший образ для выполнения
FROM node:19-alpine AS runner

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости из предыдущего этапа
COPY --from=builder /app/node_modules ./node_modules

# Копируем собранный проект
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Устанавливаем переменную окружения
ENV NODE_ENV=production

# Открываем порт для доступа
EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"]

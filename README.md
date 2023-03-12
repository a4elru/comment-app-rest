# О comment-app-rest

Простейший RESTful веб-сервис, который запускается локально на вашем компьютере.

# Установка

Клонируйте репозиторий:
```
git clone https://github.com/a4elru/comment-app-rest
```
Установите зависимости:
```
npm install
```

# Использование

Запустите приложение:
```
node app.js
```
После запуска приложение будет использовать:
- порт 3000 для сервера HTTP, который будет предоставлять сервис

# API

## /api/comments

- **post /api/comments**

  Отправить комментарий.
  Клиент должен включить в объект запроса свойства "username" и "text".
  В случае успеха сервер присылает ответ с кодом 200 и пустым JSON.

- **get /api/comments**

  Получить все комментарии.
  В случае успеха сервер присылает ответ с кодом 200 и JSON со свойством "data", в котором содержится массив объектов, представляющих комментарии.

- **post /api/comments/`${id}`**

  Получить комментарий по идентификатору.
  В качестве идентификатора выступает целое положительное число.
  В случае успеха сервер присылает ответ с кодом 200 и JSON со свойством "data", в котором содержится объект, представляющий комментарий.
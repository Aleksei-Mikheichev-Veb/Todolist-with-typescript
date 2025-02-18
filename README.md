# Инструкция по запуску React приложения

## Установка

# Клонировать репозиторий
git clone https://github.com/Aleksei-Mikheichev-Veb/Todolist-with-typescript.git

# Перейти в директорию проекта
cd Todolist-with-typescript

# Установить зависимости
yarn install

## Запуск приложения

# Запуск в режиме разработки
yarn start

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)


## Структура проекта

src/
  ├── api/          # Взаимодействие c api 
  ├── components/   # React компоненты
  ├── hooks/        # Вспомогательные хуки
  ├── state/        # Файлы хранилища redux 
  ├── types/        # Типы Actions
  └── AppWithRedux.tsx   # Корневой компонент

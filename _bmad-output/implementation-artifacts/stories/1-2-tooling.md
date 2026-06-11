# Story 1.2: Инструментарий разработки

Status: done

## Story

As a разработчик,
I want настроить линтер, форматтер и тестовый фреймворк,
So that поддерживать качество кода и запускать тесты.

## Acceptance Criteria

1. ESLint flat config установлен, `npm run lint` проверяет src/ без ошибок
2. Prettier настроен, `npm run format` форматирует код через Prettier
3. Vitest + happy-dom настроены, `npm run test` запускает тесты с DOM-окружением
4. tsconfig.json настроен с strict: true и target: ES2020
5. Скрипты lint, format, test добавлены в package.json

## Tasks / Subtasks

- [ ] Установить и настроить ESLint + typescript-eslint
  - [ ] `npm install -D eslint @eslint/js typescript-eslint`
  - [ ] Создать eslint.config.js (flat config) с recommended настройками
  - [ ] Настроить ignores: ["dist/", "node_modules/"]
  - [ ] Добавить скрипт "lint": "eslint src/"
- [ ] Установить и настроить Prettier
  - [ ] `npm install -D prettier`
  - [ ] Создать .prettierrc с настройками (singleQuote, semi, tabWidth)
  - [ ] Добавить скрипт "format": "prettier --write src/"
- [ ] Установить и настроить Vitest + happy-dom
  - [ ] `npm install -D vitest happy-dom`
  - [ ] Настроить vitest.config.ts или секцию в vite.config.ts
  - [ ] Указать environment: "happy-dom"
  - [ ] Добавить скрипт "test": "vitest run"
  - [ ] Добавить скрипт "test:watch": "vitest"
- [ ] Обновить tsconfig.json
  - [ ] Убедиться strict: true
  - [ ] Убедиться target: ES2020
  - [ ] Добавить exclude: ["node_modules", "dist"]
- [ ] Создать тестовый файл-заглушку
  - [ ] Создать src/utils.test.ts с минимальным тестом
  - [ ] Проверить `npm run test` проходит

## Dev Notes

- ESLint flat config (eslint.config.js) — современный стандарт, заменил .eslintrc
- Vitest выбран за полную совместимость с Vite и скорость (см. архитектуру)
- happy-dom вместо jsdom — легковесное DOM-окружение, достаточное для библиотеки нотификаций
- Все тестовые файлы размещаются рядом с исходными модулями: `<module>.test.ts`
- tsconfig.json strict: true обязателен для TypeScript-строгости

### Project Structure Notes

- eslint.config.js (корень проекта)
- .prettierrc (корень проекта)
- vitest.config.ts (корень проекта) — или секция test в vite.config.ts
- src/utils.test.ts (заглушка)

### References

- Источник: epics.md — Эпик 1, Story 1.2
- Архитектура: architecture.md — Выбор инструментария, Соглашения
- UX: DESIGN.md — не применимо

## Dev Agent Record

### Agent Model Used

deepseek-v4-flash-free

### File List

- eslint.config.js (создать)
- .prettierrc (создать)
- vite.config.ts (обновить — добавить test секцию)
- package.json (обновить — добавить скрипты)
- tsconfig.json (обновить)
- src/utils.test.ts (создать)

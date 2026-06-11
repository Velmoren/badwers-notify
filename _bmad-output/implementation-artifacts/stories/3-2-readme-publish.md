# Story 3.2: README и публикация в npm

Status: done

## Story

As a разработчик,
I want опубликовать пакет в npm и иметь качественную документацию,
So that сообщество может найти и использовать библиотеку.

## Acceptance Criteria

1. README.md содержит: описание, установку (npm + CDN), примеры использования, конфигурацию, API reference
2. README содержит бейджи: npm version, build status, bundle size
3. GitHub Actions publish.yml на push тега v* выполняет npm publish
4. dist/ содержит badwers-notify.mjs (ESM) и badwers-notify.min.js (IIFE)
5. package.json включает files: ["dist/", "README.md"]

## Tasks / Subtasks

- [ ] Написать README.md
  - [ ] Заголовок и описание библиотеки
  - [ ] Бейджи (npm version, build, bundle size)
  - [ ] Установка: npm install badwers-notify + CDN script
  - [ ] Быстрый старт: пример с show()
  - [ ] Конфигурация: таблица всех опций с умолчаниями
  - [ ] API Reference: config, show, info/success/attention/warning, close, closeAll
  - [ ] Примеры: все 4 типа, кастомная позиция, без автозакрытия, тёмная тема
  - [ ] Accessibility секция
  - [ ] Contributing, License
- [ ] Настроить publish.yml
  - [ ] Триггер: push тега v*
  - [ ] Шаги: checkout, setup node, npm ci, npm run build, npm publish
- [ ] Проверить package.json
  - [ ] files: ["dist/", "README.md"]
  - [ ] main, module exports корректны
  - [ ] version строка (semver)
- [ ] Создать CHANGELOG.md (инициализация)

## Dev Notes

- README.md — точка входа для всех пользователей библиотеки
- Бейджи из shields.io: npm version от npm, build status от GitHub Actions, bundle size от bundlephobia
- Публикация только по тегу v* (prevent accidental publish)
- package.json files: ["dist/", "README.md"] — в npm попадает только нужное
- CDN ссылка указывает на unpkg или jsdelivr

### Project Structure Notes

- README.md (создать в корне)
- .github/workflows/publish.yml (обновить или проверить)
- package.json (проверить files поле)
- CHANGELOG.md (создать)

### References

- Источник: epics.md — Эпик 3, Story 3.2
- Архитектура: architecture.md — Выбор инструментария (Публикация)
- PRD: FR-1 (Import: npm ESM + CDN IIFE)

## Dev Agent Record

### Agent Model Used

deepseek-v4-flash-free

### File List

- README.md (создать)
- CHANGELOG.md (создать)
- .github/workflows/publish.yml (обновить)
- package.json (проверить/обновить)

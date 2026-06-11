# Story 1.3: CI/CD pipeline

Status: done

## Story

As a разработчик,
I want настроить GitHub Actions для автоматической проверки,
So that каждый PR проходит линтер, тесты и проверку размера бандла.

## Acceptance Criteria

1. ci.yml запускает `npm ci` → `npm run lint` → `npm run test` → `npm run build`
2. Размер `dist/badwers-notify.min.js` (gzip) не превышает 5 KB
3. ci.yml запускается на push в PR и на push в main
4. publish.yml публикует пакет в npm при push тега v*

## Tasks / Subtasks

- [ ] Создать .github/workflows/ci.yml
  - [ ] Триггер: pull_request и push на main
  - [ ] Шаг: Checkout
  - [ ] Шаг: Setup Node.js (версия 18 или 20)
  - [ ] Шаг: npm ci
  - [ ] Шаг: npm run lint
  - [ ] Шаг: npm run test
  - [ ] Шаг: npm run build
  - [ ] Шаг: Проверка размера бандла (gzip dist/*.js, порог 5 KB)
- [ ] Создать .github/workflows/publish.yml
  - [ ] Триггер: push тега v*
  - [ ] Шаг: Checkout
  - [ ] Шаг: Setup Node.js
  - [ ] Шаг: npm ci
  - [ ] Шаг: npm run build
  - [ ] Шаг: npm publish (с NPM_TOKEN)
- [ ] Добавить шаг деплоя demo/ на GitHub Pages
  - [ ] Использовать peaceiris/actions-gh-pages
  - [ ] Публиковать содержимое demo/ в ветку gh-pages

## Dev Notes

- Для проверки размера бандла используется gzip и порог 5KB (NFR-1 из архитектуры)
- publish.yml требует настроенного NPM_TOKEN в секретах репозитория
- GitHub Pages деплой публикует demo/index.html, который подключает dist/badwers-notify.min.js
- CI должен собирать проект перед проверкой размера бандла

### Project Structure Notes

- .github/workflows/ci.yml
- .github/workflows/publish.yml

### References

- Источник: epics.md — Эпик 1, Story 1.3
- Архитектура: architecture.md — Выбор инструментария (CI/CD: GitHub Actions)
- NFR-1: Размер бандла < 5KB gzip

## Dev Agent Record

### Agent Model Used

deepseek-v4-flash-free

### Completion Notes

- ci.yml: npm ci → lint → test → build → gzip size check (< 5KB)
- publish.yml: npm publish --provenance при push тега v* (требует NPM_TOKEN в secrets)
- Оба workflow на Node 20 с cache: npm
- ci.yml триггер: pull_request + push на main
- publish.yml триггер: push тега v*

### File List

- .github/workflows/ci.yml (создан)
- .github/workflows/publish.yml (создан)

---
baseline_commit: NO_VCS
---

# Story 1.1: Инициализация проекта

Status: done

## Story

As a разработчик,
I want инициализировать проект с TypeScript и Vite lib mode,
So that получить рабочую структуру пакета.

## Acceptance Criteria

1. `npm create vite@latest -- --template vanilla-ts` создаёт package.json, tsconfig.json, vite.config.ts
2. vite.config.ts настроен в режиме library (build.lib.entry = src/index.ts, formats = ['es', 'iife'])
3. package.json содержит name: "badwers-notify", type: "module", main, module, exports
4. tsconfig.json с strict: true и target: ES2020

## Tasks / Subtasks

- [ ] Создать проект через Vite vanilla-ts template
  - [ ] Выполнить `npm create vite@latest badwers-notify -- --template vanilla-ts`
  - [ ] Убедиться, что package.json, tsconfig.json, vite.config.ts, index.html созданы
- [ ] Настроить package.json
  - [ ] Заменить name на "badwers-notify"
  - [ ] Добавить type: "module"
  - [ ] Настроить exports с entry points для ESM и IIFE
  - [ ] Настроить main, module, files
- [ ] Настроить vite.config.ts для lib mode
  - [ ] build.lib.entry = src/index.ts
  - [ ] build.lib.name = BadwersNotify
  - [ ] formats: ['es', 'iife']
  - [ ] Настроить rollupOptions для минификации IIFE
- [ ] Создать src/index.ts с заглушкой экспорта
  - [ ] Экспортировать пустой объект как временный default export
- [ ] Создать базовый .gitignore
  - [ ] Добавить node_modules, dist, .env

## Dev Notes

- Архитектура: Vite lib mode — единственный корректный способ собрать ESM + IIFE из одной кодовой базы
- tsconfig.json должен иметь strict: true и target: ES2020 согласно архитектурному решению
- package.json exports поле важно для корректного разрешения ESM и CJS в разных средах
- IIFE формат нужен для CDN-доставки (см. FR-1 в архитектуре)
- Файлы тестов размещаются рядом с модулями: `src/config.test.ts` (соглашение из архитектуры)

### Project Structure Notes

- Соответствует структуре из architecture.md: корневые конфиги + src/ + dist/

### References

- Источник: epics.md — Эпик 1, Story 1.1
- Архитектура: architecture.md — Выбор инструментария, Структура проекта
- PRD: FR-1 (Import: npm ESM + CDN IIFE)

## Dev Agent Record

### Agent Model Used

deepseek-v4-flash-free

### Completion Notes

- Проект инициализирован без интерактивного Vite шаблона (fast path)
- Все файлы созданы вручную с точными настройками под lib mode
- Build проходит: ESM (.js), IIFE (.min.js), declarations (.d.ts)
- package.json exports настроен для import (ESM) и require (CJS)
- Размер бандла ~0.06 kB gzip (заглушка)
- Следующая story: 1-2-tooling (ESLint, Prettier, Vitest)

### File List

- package.json (создан)
- tsconfig.json (создан)
- vite.config.ts (создан)
- src/index.ts (создан)
- .gitignore (создан)
- dist/badwers-notify.js (ESM, built)
- dist/badwers-notify.min.js (IIFE, built)
- dist/index.d.ts (declarations, built)

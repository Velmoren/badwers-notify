---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - '_bmad-output/planning-artifacts/prds/prd-task-2026-06-11/prd.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-task-2026-06-11/DESIGN.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-task-2026-06-11/EXPERIENCE.md'
workflowType: 'architecture'
project_name: 'task'
user_name: 'badwer'
date: '2026-06-11'
status: 'complete'
completedAt: '2026-06-11'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Анализ контекста проекта

### Обзор требований

**Функциональные требования:**
- FR-1: Импорт (npm ESM + CDN IIFE) — двойная доставка
- FR-2: Объект настроек по умолчанию с глубоким слиянием
- FR-3: Переопределение глобального конфига для конкретной нотификации
- FR-4: Методы API (config, show, info/success/attention/warning, close, closeAll)
- FR-5: 6 фиксированных позиций (right/left/center × top/bottom)
- FR-6: Стековое поведение (top: LIFO снизу; bottom: FILO сверху)
- FR-7: 4 типа (info, success, attention, warning) со стилями
- FR-8: Кнопка закрытия (×), настраивается
- FR-9: Автозакрытие (5s по умолчанию), pauseOnHover
- FR-10: CSS transition анимации (slide + fade)
- FR-11: Демо-страница для GitHub Pages

**Нефункциональные требования:**
- Размер бандла < 5KB gzip
- Поддержка браузеров: Chrome/Firefox/Safari/Edge последние 2 мажорные версии
- WCAG AA контраст, role="alert", клавиатурная навигация, prefers-reduced-motion
- Тёмная тема через prefers-color-scheme

**Масштаб и сложность:**
- Основной домен: Web DOM библиотека + npm-пакет
- Уровень сложности: Низкий
- Предполагаемые архитектурные компоненты: 1 публичный модуль, ~6 внутренних (config, stack, notification, animation, theme, types)

### Технические ограничения и зависимости

- Ноль внешних зависимостей — только нативный DOM + CSS
- TypeScript как язык исходников
- Vite lib mode + tsup для генерации .d.ts (предположение)
- Выходные форматы: ESM (.mjs) + IIFE (.min.js)
- Без Shadow DOM — стили через инлайн-CSS + генерируемые CSS-классы

## Выбор инструментария

### Основной технологический домен

JavaScript/TypeScript библиотека — npm-пакет с CDN-доставкой. Стартер-темплейты для веб-приложений не применимы.

### Инструментарий (из PRD + подтверждённых assumptions)

| Категория | Решение | Обоснование |
|-----------|---------|-------------|
| Язык | TypeScript | Явное требование |
| Сборка | Vite lib mode | Современный быстрый сборщик |
| d.ts | tsup | Генерация типов из TS |
| Тесты | Vitest + happy-dom | Совместимость с Vite, DOM-окружение |
| Линтер | ESLint flat config | Стандарт индустрии |
| Форматтер | Prettier | Единый стиль кода |
| CI/CD | GitHub Actions | Для opensource-проекта |
| Публикация | npm + GitHub Pages | npm для пакета, Pages для demo |
| Git | Conventional Commits | Стандарт для SemVer |

**Примечание:** Инициализация проекта через `npm create vite@latest -- --template vanilla-ts` — первый story реализации.

## Ключевые архитектурные решения

### Архитектура состояния

- **Решение:** Singleton — глобальный объект `BadwersNotify`
- **Обоснование:** Простейший API (`.show({...})` vs `new BadwersNotify().show({...})`). Для библиотеки нотификаций множественные независимые экземпляры не нужны в v1.
- **Влияние:** state — 1 глобальный объект с конфигом + мапой стеков по позициям

### CSS-стратегия

- **Решение:** Гибрид — инлайн-стили + генерируемый `<style>`
- **Инлайн:** динамические цвета/шрифты/отступы из `typeStyles` и конфига
- **`<style>` блок:** @keyframes анимаций, prefers-color-scheme, prefers-reduced-motion, :hover/:focus-visible на крестике, мобильный брейкпоинт
- **Влияние:** при инициализации создаётся 1 `<style>` в `<head>`, переиспользуется всеми стеками

### Генерация ID

- **Решение:** Инкрементальный счётчик (1, 2, 3...)
- **Обоснование:** Singleton → единое пространство имён. Детерминированно, коротко, удобно для дебага.
- **Влияние:** `id: string` = `'badwers-notify-' + counter`

## Соглашения и паттерны реализации

### Нейминг

| Категория | Правило | Пример |
|-----------|---------|--------|
| Файлы модулей | kebab-case | `config.ts`, `stack.ts`, `notify.ts` |
| Файлы тестов | `<module>.test.ts` рядом | `config.test.ts` |
| Классы/интерфейсы | PascalCase | `NotifyConfig`, `NotifyOptions`, `NotifyInstance` |
| Функции/методы | camelCase | `generateId`, `show`, `closeAll` |
| Константы | UPPER_SNAKE | `DEFAULT_CONFIG`, `STACK_Z_INDEX` |
| Приватные методы | TS `#` (hard private) | `#createElement()`, без подчёркиваний |

### Экспорты

- Единая точка входа: `src/index.ts`
- index.ts реэкспортирует: `BadwersNotify` (default), типы (`NotifyConfig`, `NotifyOptions`, `NotifyType`, `Position`)
- Внутренние модули (`config`, `stack`, `dom`, `animate`) — НЕ экспортируются из index.ts

## Структура проекта и границы модулей

```
badwers-notify/
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── vite.config.ts
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── publish.yml
├── src/
│   ├── index.ts                # публичный API (реэкспорты)
│   ├── BadwersNotify.ts        # singleton: config, show, close, closeAll
│   ├── config.ts               # defaults + deepMerge
│   ├── types.ts                # интерфейсы (Config, Options, Type, Position)
│   ├── stack.ts                # управление DOM-контейнерами по позициям
│   ├── dom.ts                  # createElement, injectStyles, removeElement
│   ├── animate.ts              # CSS-классы анимаций + prefers-reduced-motion
│   ├── theme.ts                # определение темы (light/dark) через media query
│   ├── icons.ts                # SVG-иконки для каждого типа
│   └── utils.ts                # generateId, validatePosition, warn
├── demo/
│   └── index.html              # презентационная страница (GitHub Pages)
├── dist/
│   ├── badwers-notify.mjs
│   └── badwers-notify.min.js
└── tests/
    ├── config.test.ts
    ├── stack.test.ts
    ├── dom.test.ts
    ├── animate.test.ts
    ├── theme.test.ts
    └── integration.test.ts
```

**Границы модулей:**
- `config.ts` ↔ `BadwersNotify.ts` — конфиг передаётся в singleton
- `stack.ts` ↔ `dom.ts` — стек создаёт/удаляет DOM-элементы через dom.ts
- `BadwersNotify.ts` ↔ `animate.ts` — при show/close вызываются CSS-классы
- `theme.ts` ↔ `icons.ts` — тема влияет на цвета иконок
- `utils.ts` — чистая утилита без зависимостей от других модулей

## Результаты валидации архитектуры

### Согласованность ✅

- **Совместимость решений:** Singleton + гибрид CSS + счётчик ID + kebab + zero-deps — все совместимы
- **Консистентность паттернов:** нейминг, экспорты, обработка ошибок — единообразны
- **Структура:** границы модулей чёткие, циклических зависимостей нет

### Покрытие требований ✅

| FR | Модуль | Статус |
|----|--------|--------|
| FR-1 Import | `index.ts`, `vite.config.ts` | ✅ |
| FR-2/3 Config | `config.ts`, `BadwersNotify.ts` | ✅ |
| FR-4 API | `BadwersNotify.ts` | ✅ |
| FR-5/6 Позиции + стек | `stack.ts`, `dom.ts` | ✅ |
| FR-7 Типы | `types.ts`, `icons.ts` | ✅ |
| FR-8/9 closable/autoclose | `BadwersNotify.ts` | ✅ |
| FR-10 Анимация | `animate.ts` | ✅ |
| FR-11 Demo | `demo/index.html` | ✅ |

**NFR:** a11y → `dom.ts`, bundle → `vite.config.ts`, тёмная тема → `theme.ts`, reduced-motion → `animate.ts`

### Готовность к реализации ✅

- Все критические решения задокументированы
- Структура проекта полная и конкретная
- Паттерны и соглашения покрывают конфликтные точки
- Чеклист: **16/16**

### Статус: ГОТОВО К РЕАЛИЗАЦИИ

### Обработка ошибок

| Ситуация | Поведение |
|----------|-----------|
| Неверная позиция | `throw Error("Неверная позиция: ...")` |
| Пустой `message` | `throw Error("message обязателен")` |
| Ad-blocker блокирует DOM | `console.warn("[badwers-notify] ...")` |
| Неверный `type` | fallback на `info` + `console.warn` |

### Сквозные аспекты

- **Доступность:** role="alert", aria-live, aria-label, focus management, reduced-motion — влияет на все компоненты
- **Темизация:** светлая/тёмная тема через media query — влияет на цвета всех 4 типов
- **Анимация:** CSS transitions с направлением от позиции — влияет на механику стеков
- **Каскад конфигурации:** глобальный config → per-notification override — влияет на модель данных

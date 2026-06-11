---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - '_bmad-output/planning-artifacts/prds/prd-task-2026-06-11/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-task-2026-06-11/DESIGN.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-task-2026-06-11/EXPERIENCE.md'
---

# badwers-notify — Epic Breakdown

## Overview

Этот документ содержит полную разбивку на эпики и истории для библиотеки нотификаций badwers-notify, декомпозируя требования из PRD, UX Design и Architecture в реализуемые истории.

## Requirements Inventory

### Functional Requirements

FR-1: Импорт (npm ESM + CDN IIFE)
FR-2: Объект настроек по умолчанию с глубоким слиянием
FR-3: Переопределение глобального конфига для конкретной нотификации
FR-4: Методы API (config, show, info/success/attention/warning, close, closeAll)
FR-5: 6 фиксированных позиций (right/left/center × top/bottom)
FR-6: Стековое поведение (top: LIFO снизу; bottom: FILO сверху)
FR-7: 4 типа (info, success, attention, warning) со стилями
FR-8: Кнопка закрытия (×), настраивается
FR-9: Автозакрытие (5s по умолчанию), pauseOnHover
FR-10: CSS transition анимации (slide + fade)
FR-11: Демо-страница для GitHub Pages

### Non-Functional Requirements

NFR-1: Размер бандла < 5KB gzip
NFR-2: Поддержка браузеров: Chrome/Firefox/Safari/Edge последние 2 мажорные версии
NFR-3: WCAG AA контраст, role="alert", клавиатурная навигация, prefers-reduced-motion
NFR-4: Тёмная тема через prefers-color-scheme
NFR-5: Ноль внешних зависимостей

### Additional Requirements (Architecture)

- Инструментарий: Vite lib mode + tsup + Vitest + ESLint + Prettier
- Форматы: ESM (.mjs) + IIFE (.min.js)
- Singleton-архитектура (глобальный объект BadwersNotify)
- Гибрид CSS: инлайн-стили + генерируемый `<style>` блок
- ID нотификаций: инкрементальный счётчик
- CI/CD: GitHub Actions (тесты + npm publish + GitHub Pages)
- Обработка ошибок: throw для неверных аргументов, console.warn для среды

### UX Design Requirements

UX-DR1: Реализовать 4 типа нотификаций с цветами (info: #fff/#222, success: #1e8a3a/#fff, attention: #b85c00/#fff, warning: #dc3545/#fff)
UX-DR2: Реализовать тёмную тему через prefers-color-scheme (info-dark: #2d2d2d/#e0e0e0, success-dark: #1e7e34/#fff, attention-dark: #b85c00/#fff, warning-dark: #a71d2a/#fff)
UX-DR3: Встроенные SVG-иконки для каждого типа
UX-DR4: Анимация slide-in + fade-in (300ms), направление зависит от позиции
UX-DR5: prefers-reduced-motion — отключать анимации
UX-DR6: role="alert" на каждой карточке, warning → assertive, остальные → polite
UX-DR7: closeAriaLabel — настраиваемая опция
UX-DR8: Фокус-индикатор на кнопке закрытия (:focus-visible)
UX-DR9: Escape закрывает нотификацию, фокус на след. карточку
UX-DR10: pauseOnHover — таймер приостанавливается при наведении
UX-DR11: Адаптация под мобильные (100vw - 32px при max-width: 480px)
UX-DR12: Ширина нотификации 360px, скругление 8px, тень 0 4px 12px rgba(0,0,0,0.15)
UX-DR13: Системный стек шрифтов с возможностью переопределения

### FR Coverage Map

FR-1 (Import): Эпик 1 — Scaffold (Vite lib mode: ESM + IIFE)
FR-2 (Config): Эпик 2 — Ядро библиотеки
FR-3 (Override): Эпик 2 — Ядро библиотеки
FR-4 (API методы): Эпик 2 — Ядро библиотеки
FR-5 (6 позиций): Эпик 2 — Ядро библиотеки
FR-6 (Стек): Эпик 2 — Ядро библиотеки
FR-7 (4 типа): Эпик 2 — Ядро библиотеки
FR-8 (closable): Эпик 2 — Ядро библиотеки
FR-9 (autoclose): Эпик 2 — Ядро библиотеки
FR-10 (Анимация): Эпик 2 — Ядро библиотеки
FR-11 (Демо-страница): Эпик 3 — Демо и публикация

## Epic List

### Эпик 1: Scaffold проекта
Инициализация проекта с TypeScript, Vite lib mode, ESLint, Prettier, GitHub Actions CI.
**FRs covered:** FR-1 (частично: настройка сборки)

### Эпик 2: Ядро библиотеки
Полнофункциональная библиотека нотификаций: конфиг, API, позиции, стек, типы, анимации, a11y, тёмная тема, responsive.
**FRs covered:** FR-2, FR-3, FR-4, FR-5, FR-6, FR-7, FR-8, FR-9, FR-10
**UX-DRs covered:** UX-DR1 — UX-DR13

### Эпик 3: Демо-страница и публикация
Презентационная HTML-страница для GitHub Pages, npm publish, README.
**FRs covered:** FR-1 (CDN), FR-11

## Эпик 1: Scaffold проекта

### Story 1.1: Инициализация проекта

As a разработчик,
I want инициализировать проект с TypeScript и Vite lib mode,
So that получить рабочую структуру пакета.

**Acceptance Criteria:**

**Given** пустая директория проекта
**When** я выполняю `npm create vite@latest -- --template vanilla-ts`
**Then** создаётся проект с package.json, tsconfig.json, vite.config.ts
**And** vite.config.ts настроен в режиме library (build.lib.entry = src/index.ts, formats = ['es', 'iife'])
**And** package.json содержит name: "badwers-notify", type: "module", main, module, exports

### Story 1.2: Инструментарий разработки

As a разработчик,
I want настроить линтер, форматтер и тестовый фреймворк,
So что поддерживать качество кода и запускать тесты.

**Acceptance Criteria:**

**Given** проект инициализирован
**When** я устанавливаю ESLint flat config + Prettier + Vitest + happy-dom
**Then** `npm run lint` проверяет src/ без ошибок
**And** `npm run format` форматирует код через Prettier
**And** `npm run test` запускает Vitest с happy-dom окружением
**And** tsconfig.json настроен с strict: true и target: ES2020

### Story 1.3: CI/CD pipeline

As a разработчик,
I want настроить GitHub Actions для автоматической проверки,
So что каждый PR проходит линтер, тесты и проверку размера бандла.

**Acceptance Criteria:**

**Given** репозиторий на GitHub
**When** я пушаю коммит в PR
**Then** GitHub Actions запускает ci.yml: `npm ci` → `npm run lint` → `npm run test` → `npm run build`
**And** размер `dist/badwers-notify.min.js` (gzip) не превышает 5 KB
**And** ci.yml также запускается на push в main

## Эпик 2: Ядро библиотеки

### Story 2.1: Типы и конфигурация

As a разработчик,
I want определить TypeScript-типы и объект настроек по умолчанию,
So что библиотека имеет строгую типизацию и разумные умолчания.

**Acceptance Criteria:**

**Given** проект инициализирован
**When** я создаю `src/types.ts` с интерфейсами `BadwersNotifyConfig`, `NotifyOptions`, `NotifyType`, `Position`
**Then** типы корректно экспортируются из `src/index.ts`
**And** `src/config.ts` содержит объект `defaultConfig` со значениями: position='right-top', closable=true, autoclose=true, duration=5000, maxStack=10, animationDuration=300
**And** `BadwersNotify.config({...})` глубоко сливает переданный объект с defaultConfig
**And** функция `validatePosition()` выбрасывает Error при неверной позиции
**And** функция `validateOptions()` выбрасывает Error при пустом message

### Story 2.2: DOM-утилиты и CSS-инъекция

As a разработчик,
I want создать слой работы с DOM и инъекции стилей,
So что библиотека может создавать/удалять элементы и управлять CSS.

**Acceptance Criteria:**

**Given** типы и конфиг готовы
**When** я создаю `src/dom.ts`
**Then** функция `createElement(tag, attrs, styles)` возвращает DOM-элемент с заданными атрибутами и стилями
**And** функция `injectStyles(css)` добавляет `<style id="badwers-notify-styles">` в `<head>` (если ещё не существует)
**And** функция `removeElement(el)` удаляет элемент из DOM
**And** инжектированный `<style>` блок содержит CSS для: @keyframes slideInTop, @keyframes slideInBottom, @keyframes slideOutTop, @keyframes slideOutBottom, .badwers-notify, .badwers-notify--closing
**And** стили включают @media (prefers-reduced-motion: reduce) с нулевой анимацией
**And** стили включают @media (max-width: 480px) с шириной calc(100vw - 32px)
**And** стили включают :focus-visible для кнопки закрытия

### Story 2.3: Управление стеками

As a разработчик,
I want реализовать управление DOM-контейнерами для каждой из 6 позиций,
So что нотификации располагаются корректно и соблюдают стековое поведение.

**Acceptance Criteria:**

**Given** dom.ts готова
**When** я создаю `src/stack.ts`
**Then** функция `getStack(position)` создаёт или возвращает существующий Stack Container для заданной позиции
**And** Stack Container имеет `position: fixed`, z-index: 10000, расположен в соответствии с позицией
**And** для top-позиций контейнер имеет flex-direction: column (новые снизу)
**And** для bottom-позиций контейнер имеет flex-direction: column-reverse (новые сверху)
**And** при превышении maxStack самая старая нотификация удаляется без анимации
**And** контейнеры создаются лениво (не создаются до первого show для этой позиции)
**And** функция `removeStack(position)` удаляет пустой контейнер

### Story 2.4: Создание карточки нотификации

As a разработчик,
I want реализовать создание DOM-элемента нотификации,
So что нотификация отображается с иконкой, текстом и кнопкой закрытия.

**Acceptance Criteria:**

**Given** dom.ts и types.ts готовы
**When** я создаю внутреннюю функцию `createNotifyElement(options)`
**Then** элемент содержит: иконку (SVG, слева), контент (title + message, центр), кнопку × (справа, если closable=true)
**And** применяются стили в зависимости от типа (info/success/attention/warning) и цветовой схемы
**And** при наличии title заголовок отображается семиболдом 15px, сообщение — 14px
**And** при отсутствии title сообщение занимает всю высоту
**And** кнопка закрытия имеет aria-label="Закрыть уведомление" (или значение из closeAriaLabel)
**And** элемент получает уникальный ID в формате 'badwers-notify-N'
**And** применяется `customClass`, если передан

### Story 2.5: Анимация и таймеры

As a разработчик,
I want реализовать анимацию появления/закрытия и таймер автозакрытия с pauseOnHover,
So что нотификации появляются и исчезают плавно, а таймер корректно приостанавливается при наведении.

**Acceptance Criteria:**

**Given** notify element и stack готовы
**When** нотификация добавляется в стек
**Then** применяется CSS-класс анимации в зависимости от позиции (slideInTop для top, slideInBottom для bottom)
**And** анимация длится animationDuration (по умолчанию 300ms)
**When** autoclose=true
**Then** через duration (по умолчанию 5000ms) запускается анимация закрытия
**And** при mouseenter на карточке таймер приостанавливается
**And** при mouseleave таймер возобновляется на оставшееся время
**And** при закрытии применяется CSS-класс closing, по окончании animationDuration элемент удаляется из DOM
**And** оставшиеся нотификации в стеке плавно смещаются (gap закрывается)

### Story 2.6: Главный API — BadwersNotify singleton

As a разработчик,
I want реализовать главный singleton-объект BadwersNotify с публичными методами,
So что пользователь библиотеки может вызывать единый API.

**Acceptance Criteria:**

**Given** config, stack, dom, animation модули готовы
**When** я создаю `src/BadwersNotify.ts`
**Then** `BadwersNotify.config({...})` обновляет глобальный конфиг
**And** `BadwersNotify.show({message, type, ...})` создаёт нотификацию и возвращает `{ id, close() }`
**And** `BadwersNotify.info/success/attention/warning({...})` — shorthand-методы с предустановленным type
**And** `BadwersNotify.close(id)` закрывает нотификацию по ID
**And** `BadwersNotify.closeAll()` закрывает все нотификации во всех стеках
**And** все методы синхронны (не async)
**And** `src/index.ts` реэкспортирует BadwersNotify как default export + типы как named exports

### Story 2.7: Тёмная тема и иконки

As a разработчик,
I want реализовать поддержку тёмной темы и встроенные SVG-иконки,
So что библиотека автоматически подстраивается под системную тему и отображает иконки для каждого типа.

**Acceptance Criteria:**

**Given** BadwersNotify singleton готов
**When** я создаю `src/theme.ts`
**Then** при инициализации проверяется `window.matchMedia('(prefers-color-scheme: dark)')`
**And** при совпадении применяются dark-токены цветов (info: #2d2d2d/#e0e0e0 и т.д.)
**And** слушатель `change` переключает тему на лету без перезагрузки
**When** я создаю `src/icons.ts`
**Then** каждый тип имеет SVG-иконку: info (ⓘ), success (✓), attention (⚠), warning (✕)
**And** цвет иконки соответствует типу (info: #222, остальные: #fff; в тёмной теме info: #e0e0e0)
**And** иконка может быть переопределена через опцию `icon` в config или show()

### Story 2.8: Accessibility и closeAll

As a пользователь клавиатуры,
I want полноценную поддержку доступности,
So что могу управлять нотификациями с клавиатуры и получать корректные ARIA-атрибуты.

**Acceptance Criteria:**

**Given** все модули готовы
**When** нотификация появляется
**Then** на элемент карточки установлен role="alert"
**And** для типа warning: aria-live="assertive", для остальных: role="alert" (implicit assertive)
**When** кнопка закрытия в фокусе
**Then** нажатие Escape закрывает нотификацию
**And** при закрытии фокус перемещается на кнопку закрытия следующей нотификации в стеке
**And** если нотификация последняя — фокус на Stack Container
**And** кнопка закрытия имеет видимый :focus-visible индикатор (outline 2px solid currentColor)

## Эпик 3: Демо-страница и публикация

### Story 3.1: Презентационная страница

As a посетитель GitHub Pages,
I want видеть демо-страницу с интерактивными примерами всех возможностей библиотеки,
So что могу оценить функционал до установки.

**Acceptance Criteria:**

**Given** библиотека собрана
**When** я создаю `demo/index.html`
**Then** страница подключает `../dist/badwers-notify.min.js`
**And** содержит кнопки для показа всех 4 типов (info, success, attention, warning)
**And** содержит переключатели всех 6 позиций
**And** содержит переключатели closable / autoclose
**And** содержит поле для ввода кастомного сообщения
**And** содержит секцию со ссылками на GitHub и документацию
**And** дизайн страницы нейтральный, не отвлекающий от нотификаций
**When** GitHub Actions workflow publish.yml выполняется
**Then** demo/index.html публикуется на GitHub Pages

### Story 3.2: README и публикация в npm

As a разработчик,
I want опубликовать пакет в npm и иметь качественную документацию,
So что сообщество может найти и использовать библиотеку.

**Acceptance Criteria:**

**Given** библиотека готова
**When** я создаю README.md
**Then** README содержит: описание, установку (npm + CDN), примеры использования, конфигурацию, API reference
**And** README содержит бейджи: npm version, build status, bundle size
**When** GitHub Actions publish.yml выполняется на push тега v*
**Then** `npm publish` публикует пакет в npm registry
**And** dist/ содержит badwers-notify.mjs (ESM) и badwers-notify.min.js (IIFE)
**And** package.json включает files: ["dist/", "README.md"]

---
title: PRD: badwers-notify
created: 2026-06-11
updated: 2026-06-11
status: final
---

# PRD: badwers-notify — JavaScript библиотека нотификаций
*Working title — confirm.*

## 0. Document Purpose

Документ предназначен для команды разработки и downstream-воркфлоу (архитектура, UX, epics). Определяет requirements для open-source JavaScript-библиотеки нотификаций на TypeScript. Библиотека распространяется как через npm-пакет (для Vite/Webpack), так и через standalone-файл (CDN / прямой `<script>`).

---

## 1. Vision

**badwers-notify** — это лёгкая, простая в интеграции библиотека для отображения уведомлений на веб-страницах. Разработчик добавляет её в проект одной командой (npm install) или одним тегом `<script>` и получает 6 предопределённых позиций, 4 типа нотификаций, стековое поведение и полную кастомизацию. Библиотека не требует jQuery или других зависимостей.

Ключевое отличие от существующих решений (toastr, notyf, react-toastify) — **отсутствие привязки к фреймворку** + максимально простая конфигурация с разумными умолчаниями, которые работают «из коробки».

---

## 2. Target User

### 2.1 Jobs To Be Done

- **Фронтенд-разработчик** — добавить нотификации в vanilla JS-проект без установки целого UI-фреймворка.
- **Автор OSS-проекта** — встроить в свою библиотеку/виджет лёгкую систему уведомлений.
- **Прототипировщик** — быстро подключить уведомления через CDN на HTML-страницу.

### 2.2 Non-Users (v1)

- Разработчики, ожидающие интеграции с React/Vue/Svelte как отдельного пакета (v2+).
- Приложения, требующие сложной очереди сообщений с приоритетами.

### 2.3 Key User Journeys

**UJ-1. Разработчик подключает npm-пакет.**
- **Persona + context:** Фронтенд-разработчик с Vite-проектом на TypeScript.
- **Entry state:** Проект инициализирован, установлен `badwers-notify`.
- **Path:** Импортирует `BadwersNotify` → вызывает `BadwersNotify.show({ message: 'Готово!' })` → нотификация появляется в правом верхнем углу.
- **Climax:** Уведомление показывается с анимацией, через 5 секунд плавно исчезает.
- **Resolution:** Разработчик видит работающую нотификацию и закрывает задачу.

**UJ-2. Разработчик подключает через CDN.**
- **Persona + context:** Разработчик, делающий лендинг на чистом HTML+JS, без сборщика.
- **Entry state:** Пустой `<div id="app">` на странице.
- **Path:** Добавляет `<script src="cdn/badwers-notify.min.js">` → вызывает `BadwersNotify.config({ position: 'center-bottom' })` → показывает тестовое сообщение.
- **Climax:** Нотификация отображается по центру внизу, новые появляются выше старых.
- **Resolution:** Страница готова к демонстрации.

**UJ-3. Разработчик кастомизирует стили.**
- **Persona + context:** Разработчик, которому нужны брендированные уведомления.
- **Path:** Изучает документацию → передаёт `typeStyles` и `icons` в конфиг → проверяет результат.
- **Climax:** Нотификации отображаются с корпоративными цветами и иконками.
- **Resolution:** Всё выглядит как часть интерфейса.

---

## 3. Glossary

- **Notify** (нотификация) — единичное уведомление на экране.
- **Stack** — контейнер уведомлений на одной позиции. Нотификации накапливаются по принципу LIFO (верхняя позиция: новые снизу) / FILO (нижняя позиция: новые сверху).
- **Position** — место появления нотификаций на экране: вертикаль (top/bottom/center) + горизонталь (left/right/center).
- **Type** — один из 4 предопределённых стилей: `info`, `success`, `attention`, `warning`.
- **Closable** — наличие кнопки закрытия (крестик) на нотификации.
- **Autoclose** — автоматическое закрытие нотификации по таймеру.

---

## 4. Features

### 4.1 Инициализация и конфигурация

**Description:** Библиотека предоставляет глобальный объект с методами `.config()` для установки настроек по умолчанию и `.show()` для показа нотификации. `[ASSUMPTION: глобальный singleton — достаточно для v1]`.

**Functional Requirements:**

#### FR-1: Import и подключение

Разработчик может подключить библиотеку двумя способами:
- **npm:** `import BadwersNotify from 'badwers-notify';`
- **CDN:** `<script src="badwers-notify.min.js">` → глобальная переменная `BadwersNotify`.

Realizes UJ-1, UJ-2.

**Consequences (testable):**
- После `npm install badwers-notify` импорт не выдаёт ошибок.
- После подключения через `<script>` `typeof window.BadwersNotify === 'object'`.
- TypeScript-типы экспортируются (файл `.d.ts` в корне пакета).

#### FR-2: Настройки по умолчанию

Библиотека экспортирует предустановленный объект настроек:

```typescript
interface BadwersNotifyConfig {
  position: Position;
  closable: boolean;
  autoclose: boolean;
  duration: number;           // ms
  maxStack: number;
  animationDuration: number;   // ms
  customClass?: string;
  typeStyles?: Partial<Record<NotifyType, NotifyStyle>>;
  icons?: Partial<Record<NotifyType, string>>;
}

interface NotifyStyle {
  background?: string;
  color?: string;
}

interface NotifyOptions {
  message: string;
  title?: string;
  type?: NotifyType;
  closable?: boolean;
  autoclose?: boolean;
  duration?: number;
  icon?: string;
  customClass?: string;
  onClick?: () => void;
  onClose?: () => void;
}

type Position = 'right-top' | 'left-top' | 'center-top'
              | 'right-bottom' | 'left-bottom' | 'center-bottom';
type NotifyType = 'info' | 'success' | 'attention' | 'warning';
```

Значения по умолчанию:

```typescript
const defaultConfig: BadwersNotifyConfig = {
  position: 'right-top',
  closable: true,
  autoclose: true,
  duration: 5000,
  maxStack: 10,
  animationDuration: 300,
  typeStyles: {
    info:      { background: '#ffffff', color: '#222222' },
    success:   { background: '#28a745', color: '#ffffff' },
    attention: { background: '#e67e22', color: '#ffffff' },
    warning:   { background: '#dc3545', color: '#ffffff' },
  },
};
```

Realizes UJ-1, UJ-2, UJ-3.

**Consequences (testable):**
- `BadwersNotify.config()` глубоко сливает переданный объект с defaults.
- Если `typeStyles` не передан, используются встроенные цвета.
- После инициализации вызов `show({ message: 'test' })` применяет глобальный конфиг.

#### FR-3: Per-notification override

Каждый вызов `show()` принимает `NotifyOptions`, которые переопределяют глобальные настройки для конкретной нотификации.

```typescript
BadwersNotify.show({
  message: 'Срочно!',
  type: 'warning',
  closable: false,
  autoclose: false,
});
```

Realizes UJ-3.

**Consequences (testable):**
- Нотификация с `type: 'warning'` окрашивается в красный, независимо от глобального `typeStyles`.
- Если в `show()` передан `closable: false`, крестик не рисуется, даже если глобально `closable: true`.

#### FR-4: Методы API

Библиотека предоставляет:

```typescript
interface BadwersNotifyAPI {
  config(options: Partial<BadwersNotifyConfig>): void;
  show(options: NotifyOptions): NotifyInstance;
  info(options: NotifyOptions): NotifyInstance;      // type = 'info'
  success(options: NotifyOptions): NotifyInstance;    // type = 'success'
  attention(options: NotifyOptions): NotifyInstance;  // type = 'attention'
  warning(options: NotifyOptions): NotifyInstance;    // type = 'warning'
  close(id: string): void;                            // закрыть по ID
  closeAll(): void;                                   // закрыть все
}

interface NotifyInstance {
  id: string;
  close(): void;
}
```

**Consequences (testable):**
- `BadwersNotify.info({ message: '...' })` создаёт нотификацию с типом `info`.
- `BadwersNotify.closeAll()` удаляет все видимые нотификации с анимацией.

**Feature-specific NFRs:**
- Все методы синхронны — вызов не требует `await`.

### 4.2 Позиционирование и стек

**Description:** Нотификации располагаются в одной из 6 позиций. На каждой позиции работает стек: если позиция верхняя (top) — новые нотификации появляются ниже старых; если нижняя (bottom) — новые появляются выше старых.

Realizes UJ-2.

**Functional Requirements:**

#### FR-5: 6 позиций

Поддерживаются: `right-top`, `left-top`, `center-top`, `right-bottom`, `left-bottom`, `center-bottom`.

**Consequences (testable):**
- При `position: 'center-top'` нотификация отображается по центру экрана, прижата к верхнему краю.
- При `position: 'right-bottom'` нотификация отображается в правом нижнем углу.
- Если позиция задана неверно, библиотека выбрасывает понятную ошибку.

#### FR-6: Стековое поведение

- **Top-позиции:** каждая новая нотификация вставляется ниже предыдущей. Самая свежая — внизу стопки.
- **Bottom-позиции:** каждая новая нотификация вставляется выше предыдущей. Самая свежая — наверху стопки.
- `[ASSUMPTION: стек на позицию — независимые стеки для каждой из 6 позиций]`

Realizes UJ-2.

**Consequences (testable):**
- При `position: 'right-top'` и 3 последовательных вызовах `show()` первая нотификация сверху, третья — снизу.
- При `position: 'right-bottom'` и 3 вызовах первая нотификация снизу, третья — сверху.
- При превышении `maxStack` самая старая нотификация удаляется без анимации.

### 4.3 Типы нотификаций

**Description:** 4 встроенных типа с различным цветовым оформлением.

**Functional Requirements:**

#### FR-7: Типы и стили

| Type | Фон | Текст |
|------|-----|-------|
| `info` | `#ffffff` | `#222222` |
| `success` | `#28a745` | `#ffffff` |
| `attention` | `#e67e22` | `#ffffff` |
| `warning` | `#dc3545` | `#ffffff` |

**Consequences (testable):**
- Нотификация типа `success` имеет зелёный фон и белый текст.
- Тип по умолчанию — `info` (если не указан в `show()`).

### 4.4 Поведение

**Description:** Управление закрытием нотификаций — вручную, по таймеру, или «вечные».

**Functional Requirements:**

#### FR-8: Кнопка закрытия (closable)

По умолчанию нотификация содержит крестик в правом верхнем углу. При `closable: false` крестик не рисуется.

**Consequences (testable):**
- При `closable: true` (default) на нотификации есть кнопка ×.
- При клике на × нотификация закрывается с анимацией.
- При `closable: false` кнопка × отсутствует в DOM.

#### FR-9: Автоматическое закрытие (autoclose)

По умолчанию нотификация закрывается через `duration` (5000 ms). При `autoclose: false` нотификация остаётся на экране до ручного закрытия.

**Consequences (testable):**
- При `autoclose: true` (default) через 5000 ms нотификация начинает анимацию закрытия.
- При `autoclose: false` нотификация не закрывается по таймеру.
- Если пользователь наводит мышь на нотификацию, таймер приостанавливается. `[ASSUMPTION: pauseOnHover — разумное поведение, реализовать]`

### 4.5 Анимация

**Description:** Плавное появление и закрытие нотификаций через CSS transitions.

**Functional Requirements:**

#### FR-10: Анимация появления и закрытия

- Появление: slide-in + fade-in (длительность — `animationDuration`, по умолчанию 300ms).
- Закрытие: slide-out + fade-out (та же длительность).
- Анимация зависит от позиции (сверху — slide-in сверху, снизу — slide-in снизу).

**Consequences (testable):**
- При `animationDuration: 300` нотификация появляется в течение 300ms.
- В момент анимации нотификация видна, не мерцает.
- При закрытии остальные нотификации в стеке плавно смещаются. `[ASSUMPTION: смещение стека анимировано]`

### 4.6 Презентационная страница

**Description:** HTML-страница для демонстрации всех возможностей библиотеки, публикуемая на GitHub Pages.

Realizes UJ-2.

**Functional Requirements:**

#### FR-11: Demo-страница

Страница содержит:
- Кнопки для показа всех 4 типов (`info`, `success`, `attention`, `warning`).
- Переключатели всех 6 позиций.
- Переключатели `closable` / `autoclose`.
- Поле для ввода кастомного сообщения.
- Секция со ссылками на документацию и GitHub.
- Стилизована в нейтральном дизайне, не отвлекающем от нотификаций.

**Consequences (testable):**
- При нажатии на кнопку «Success» появляется зелёная нотификация.
- При переключении позиции на «center-bottom» новые нотификации идут в эту позицию.

---

## 5. Non-Goals (Explicit)

- **Не делать** интеграционные пакеты под React/Vue/Svelte в v1.
- **Не делать** очередь сообщений с приоритетами и батчинг.
- **Не делать** сервер-пуши — библиотека только для клиентского JS.
- **Не делать** доступность через Web Component — только через JS API.

---

## 6. MVP Scope

### 6.1 In Scope

- npm-пакет + CDN-сборка.
- 6 позиций, стековое поведение.
- 4 типа нотификаций (`info`, `success`, `attention`, `warning`).
- `closable` / `autoclose` / `duration` / `maxStack`.
- Анимация появления и закрытия (CSS transitions).
- Полная кастомизация стилей через конфиг (`typeStyles`, `icons`, `customClass`).
- Колбэки `onClick`, `onClose`.
- Demo-страница на GitHub Pages.
- TypeScript-типы.

### 6.2 Out of Scope for MVP

- Прогресс-бар на нотификации (v2).
- Интеграционные пакеты под фреймворки (v2).
- Сворачивание нотификаций в трей (v3).
- Адаптивный дизайн для мобильных (v2).

---

## 7. Success Metrics

**Primary**
- **SM-1:** Библиотека подключается и работает в 3 сценариях: `<script>`, npm+Vite, npm+Webpack. Подтверждает FR-1.

**Secondary**
- **SM-2:** Тестовое покрытие > 80% (Vitest + happy-dom). Подтверждает FR-2 — FR-10.
- **SM-3:** Demo-страница опубликована и работает на GitHub Pages. Подтверждает FR-11.

---

## 8. Cross-Cutting NFRs

### 8.1 Производительность

- Размер бандла (gzip) < 5 KB.
- Минимум перерисовок DOM — нотификации добавляются/удаляются через `requestAnimationFrame`/CSS transitions.

### 8.2 Доступность (Accessibility)

- `role="alert"` на контейнере нотификаций.
- Кнопка закрытия имеет `aria-label="Закрыть уведомление"`.
- Возможна навигация до кнопки закрытия через Tab. `[ASSUMPTION: focus management — базовый, без trapping]`

### 8.3 Браузерная поддержка

- Все современные браузеры (Chrome, Firefox, Safari, Edge — последние 2 мажорные версии).

---

## 9. API Contracts / Public Surface

### 9.1 Импорты

```typescript
// npm
import BadwersNotify from 'badwers-notify';
import type { BadwersNotifyConfig, NotifyOptions, NotifyType, Position } from 'badwers-notify';

// CDN (глобальная переменная)
const BadwersNotify = window.BadwersNotify;
```

### 9.2 Публичные методы

| Метод | Сигнатура | Описание |
|-------|-----------|----------|
| `config` | `(opts: Partial<BadwersNotifyConfig>): void` | Установить глобальные настройки |
| `show` | `(opts: NotifyOptions): NotifyInstance` | Показать нотификацию |
| `info` | `(opts: NotifyOptions): NotifyInstance` | Показать `info` |
| `success` | `(opts: NotifyOptions): NotifyInstance` | Показать `success` |
| `attention` | `(opts: NotifyOptions): NotifyInstance` | Показать `attention` |
| `warning` | `(opts: NotifyOptions): NotifyInstance` | Показать `warning` |
| `close` | `(id: string): void` | Закрыть по ID |
| `closeAll` | `(): void` | Закрыть все |

### 9.3 Полный объект настроек (предлагаемый)

```typescript
interface BadwersNotifyConfig {
  position: Position;
  closable: boolean;
  autoclose: boolean;
  duration: number;
  maxStack: number;
  animationDuration: number;
  customClass?: string;
  typeStyles?: Partial<Record<NotifyType, NotifyStyle>>;
  icons?: Partial<Record<NotifyType, string>>;
}

interface NotifyStyle {
  background: string;
  color: string;
}

interface NotifyOptions {
  message: string;
  title?: string;
  type?: NotifyType;
  closable?: boolean;
  autoclose?: boolean;
  duration?: number;
  icon?: string;
  customClass?: string;
  onClick?: () => void;
  onClose?: () => void;
}
```

### 9.4 Defaults

```typescript
const defaults: BadwersNotifyConfig = {
  position: 'right-top',
  closable: true,
  autoclose: true,
  duration: 5000,
  maxStack: 10,
  animationDuration: 300,
};
```

---

## 10. Versioning and Deprecation Policy

- **SemVer** — мажорные изменения выделяются в отдельную мажорную версию.
- Бандл для CDN именуется `badwers-notify.min.js`.
- TypeScript-типы поставляются в том же пакете.
- CHANGELOG — в корне репозитория.

---

## 11. Open Questions

1. Какой сборщик использовать для бандла? `[ASSUMPTION: Vite + lib mode, tsup для d.ts]`
2. Нужен ли UMD / IIFE формат для CDN? `[ASSUMPTION: ESM + IIFE]`
3. Нужна ли поддержка мобильной ориентации (свайп для закрытия)? Решили не в MVP.
4. Цвета для `attention` — `#e67e22` (оранжевый) утверждены?

---

## 12. Assumptions Index

- Глобальный singleton — достаточно для v1 (из FR-1).
- Стек на каждую из 6 позиций независим (из FR-6).
- `pauseOnHover` при `autoclose: true` — наведение мыши останавливает таймер (из FR-9).
- Смещение стека при закрытии анимировано (из FR-10).
- Сборщик — Vite lib mode + tsup для d.ts (из Open Questions).
- ESM + IIFE форматы для CDN (из Open Questions).
- Минимальный focus management — без trapping (из NFR 8.2).

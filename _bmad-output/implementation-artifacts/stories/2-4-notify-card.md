# Story 2.4: Создание карточки нотификации

Status: done

## Story

As a разработчик,
I want реализовать создание DOM-элемента нотификации,
So that нотификация отображается с иконкой, текстом и кнопкой закрытия.

## Acceptance Criteria

1. Элемент содержит: иконку (SVG, слева), контент (title + message, центр), кнопку × (справа, если closable=true)
2. Применяются стили в зависимости от типа (info/success/attention/warning) и цветовой схемы
3. При наличии title заголовок отображается семиболдом 15px, сообщение — 14px
4. При отсутствии title сообщение занимает всю высоту
5. Кнопка закрытия имеет aria-label="Закрыть уведомление" (или значение из closeAriaLabel)
6. Элемент получает уникальный ID в формате 'badwers-notify-N'
7. Применяется customClass, если передан
8. CSS-класс меняется в зависимости от темы (light/dark)

## Tasks / Subtasks

- [ ] Создать src/icons.ts
  - [ ] Реализовать getIcon(type: NotifyType, theme: Theme): string — возвращает SVG-строку
  - [ ] Info: иконка ⓘ (круг с буквой i)
  - [ ] Success: иконка ✓ (галочка)
  - [ ] Attention: иконка ⚠ (треугольник с воскл)
  - [ ] Warning: иконка ✕ (крест)
  - [ ] Цвет иконки из токенов DESIGN.md (инлайн fill)
  - [ ] Поддержка переопределения через опцию icon
- [ ] Реализовать createNotifyElement(options) в dom.ts или отдельном модуле
  - [ ] Создать корневой элемент `<div>` с id='badwers-notify-N'
  - [ ] Установить role="alert"
  - [ ] Добавить customClass если передан
  - [ ] Создать flex-row контейнер: иконка | контент | кнопка закрытия
  - [ ] Вставить SVG-иконку слева (20x20px)
  - [ ] Вставить контент: title (если есть, 15px 600) + message (14px 400)
  - [ ] Вставить кнопку × (если closable=true) с aria-label
  - [ ] Применить инлайн-стили для фона/цвета в зависимости от типа и темы
- [ ] Написать тесты
  - [ ] Проверить структуру DOM: иконка, контент, кнопка
  - [ ] Проверить aria-label на кнопке закрытия
  - [ ] Проверить ID формат
  - [ ] Проверить customClass

## Dev Notes

- Анатомия карточки: иконка (слева, 20×20px) → контент flex:1 → кнопка × (справа, 24×24px область клика)
- Все inline-стили для типа/темы: background, color из DESIGN.md
- Кнопка закрытия: border: none, background: transparent, cursor: pointer
- title — опционально, если нет — message на всю высоту
- SVG-иконки инлайновые (без внешних файлов)
- Стили для close button из DESIGN.md: notify-close (24×24px, прозрачный фон, цвет close-btn)

### Project Structure Notes

- src/icons.ts (создать)
- src/dom.ts (обновить — добавить createNotifyElement)

### References

- Источник: epics.md — Эпик 2, Story 2.4
- Архитектура: architecture.md — CSS-стратегия, Нейминг
- UX: DESIGN.md — notify-info/success/attention/warning, notify-close, typography, colors
- UX: EXPERIENCE.md — Notification Card (Анатомия, Поведение)

## Dev Agent Record

### Agent Model Used

deepseek-v4-flash-free

### File List

- src/icons.ts (создать)
- src/dom.ts (обновить)
- src/dom.test.ts (обновить)

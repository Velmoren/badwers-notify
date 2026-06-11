# Story 2.2: DOM-утилиты и CSS-инъекция

Status: done

## Story

As a разработчик,
I want создать слой работы с DOM и инъекции стилей,
So that библиотека может создавать/удалять элементы и управлять CSS.

## Acceptance Criteria

1. `createElement(tag, attrs, styles)` возвращает DOM-элемент с заданными атрибутами и стилями
2. `injectStyles(css)` добавляет `<style id="badwers-notify-styles">` в `<head>` (если ещё не существует)
3. `removeElement(el)` удаляет элемент из DOM
4. Инжектированный `<style>` блок содержит CSS для:
   - @keyframes slideInTop, @keyframes slideInBottom
   - @keyframes slideOutTop, @keyframes slideOutBottom
   - .badwers-notify (360px, 8px radius, box-shadow)
   - .badwers-notify--closing
5. Стили включают @media (prefers-reduced-motion: reduce) с нулевой анимацией
6. Стили включают @media (max-width: 480px) с calc(100vw - 32px)
7. Стили включают :focus-visible для кнопки закрытия
8. Стили включают :hover стили для кнопки закрытия

## Tasks / Subtasks

- [ ] Создать src/dom.ts
  - [ ] Реализовать createElement(tag: string, attrs?: Record<string, string>, styles?: Partial<CSSStyleDeclaration>): HTMLElement
  - [ ] Реализовать injectStyles(css: string): void — добавляет `<style id="badwers-notify-styles">` если нет
  - [ ] Реализовать removeElement(el: HTMLElement): void
- [ ] Создать src/animate.ts
  - [ ] Определить CSS-строку с @keyframes slideInTop (translateY(-100%) → translateY(0))
  - [ ] Определить CSS-строку с @keyframes slideInBottom (translateY(100%) → translateY(0))
  - [ ] Определить CSS-строку с @keyframes slideOutTop (translateY(0) → translateY(-100%))
  - [ ] Определить CSS-строку с @keyframes slideOutBottom (translateY(0) → translateY(100%))
  - [ ] Определить CSS-строку с .badwers-notify (width: 360px, border-radius: 8px, box-shadow: 0 4px 12px rgba(0,0,0,0.15))
  - [ ] Определить CSS-строку с .badwers-notify--closing
  - [ ] Добавить @media (prefers-reduced-motion: reduce) — нулевые анимации
  - [ ] Добавить @media (max-width: 480px) — width: calc(100vw - 32px)
  - [ ] Добавить :focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
  - [ ] Добавить :hover стили для кнопки закрытия
- [ ] Написать тесты
  - [ ] dom.test.ts: createElement создаёт элемент с атрибутами/стилями, injectStyles добавляет style, removeElement удаляет

## Dev Notes

- Гибридная CSS-стратегия: инлайн-стили для динамических значений, `<style>` блок для анимаций и медиа-запросов
- injectStyles проверяет существование style#badwers-notify-styles перед добавлением (идемпотентность)
- @media (prefers-reduced-motion: reduce) обязателен для a11y (UX-DR5, NFR-3)
- Все CSS-токены из DESIGN.md: радиус 8px, тень 0 4px 12px, ширина 360px
- Имена CSS-классов в kebab-case по соглашению

### Project Structure Notes

- src/dom.ts (создать)
- src/animate.ts (создать)
- src/dom.test.ts (создать)

### References

- Источник: epics.md — Эпик 2, Story 2.2
- Архитектура: architecture.md — CSS-стратегия, Структура проекта
- UX: DESIGN.md — Все токены (rounded, spacing, boxShadow)
- UX: EXPERIENCE.md — State Patterns (Closing), Responsive & Platform

## Dev Agent Record

### Agent Model Used

deepseek-v4-flash-free

### File List

- src/dom.ts (создать)
- src/animate.ts (создать)
- src/dom.test.ts (создать)

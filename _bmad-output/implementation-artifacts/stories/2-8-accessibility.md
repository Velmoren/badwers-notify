# Story 2.8: Accessibility и финальная полировка

Status: done

## Story

As a пользователь клавиатуры,
I want получить полноценную поддержку доступности,
So that могу управлять нотификациями с клавиатуры и получать корректные ARIA-атрибуты.

## Acceptance Criteria

1. `role="alert"` на каждой карточке нотификации
2. Для типа warning: aria-live="assertive", для остальных: role="alert" (implicit assertive)
3. При фокусе на кнопке закрытия нажатие Escape закрывает нотификацию
4. При закрытии фокус перемещается на кнопку закрытия следующей нотификации в стеке
5. Если нотификация последняя — фокус на Stack Container
6. Кнопка закрытия имеет видимый :focus-visible индикатор (outline 2px solid currentColor)
7. Все Acceptance Criteria из UX-DR6 — UX-DR9 покрыты

## Tasks / Subtasks

- [ ] Добавить ARIA-атрибуты в createNotifyElement
  - [ ] role="alert" на корневом элементе
  - [ ] Для warning: дополнительно aria-live="assertive"
  - [ ] aria-label на кнопке закрытия (из closeAriaLabel или по умолчанию)
- [ ] Реализовать обработку Escape
  - [ ] keydown listener на кнопке закрытия
  - [ ] При Escape: вызвать close для данной нотификации
- [ ] Реализовать focus management при закрытии
  - [ ] При закрытии найти следующую карточку в стеке
  - [ ] Переместить фокус на её кнопку закрытия
  - [ ] Если карточек нет — фокус на Stack Container
- [ ] Обеспечить :focus-visible стили
  - [ ] Добавить в CSS: .badwers-notify__close:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
- [ ] Написать тесты a11y
  - [ ] Проверить role="alert" на всех типах
  - [ ] Проверить aria-live="assertive" для warning
  - [ ] Проверить aria-label на кнопке закрытия
  - [ ] Проверить обработку Escape
  - [ ] Проверить focus management

## Dev Notes

- role="alert" обеспечивает aria-live="assertive" по умолчанию для всех типов
- Для warning дополнительно aria-live="assertive" (явно, для читалок которые не понимают role="alert")
- При закрытии по Escape: фокус на кнопку закрытия следующей карточки в стеке
- Если это последняя карточка — фокус на Stack Container (чтобы фокус не ушёл в body)
- :focus-visible стили уже есть в CSS из Story 2.2, нужно проверить их наличие

### Project Structure Notes

- src/dom.ts (обновить — ARIA атрибуты)
- src/BadwersNotify.ts (обновить — focus management, Escape)
- src/animate.ts или inline CSS (:focus-visible)

### References

- Источник: epics.md — Эпик 2, Story 2.8
- Архитектура: architecture.md — Доступность (сквозной аспект)
- UX: EXPERIENCE.md — Accessibility Floor (все пункты)
- UX: DESIGN.md — notify-close (focus-visible)

## Dev Agent Record

### Agent Model Used

deepseek-v4-flash-free

### File List

- src/dom.ts (обновить)
- src/BadwersNotify.ts (обновить)
- src/animate.ts (обновить при необходимости)

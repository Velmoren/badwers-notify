# Story 2.7: Тёмная тема и иконки

Status: done

## Story

As a разработчик,
I want реализовать поддержку тёмной темы и встроенные SVG-иконки,
So that библиотека автоматически подстраивается под системную тему и отображает иконки для каждого типа.

## Acceptance Criteria

1. При инициализации проверяется `window.matchMedia('(prefers-color-scheme: dark)')`
2. При совпадении применяются dark-токены цветов (info: #2d2d2d/#e0e0e0 и т.д.)
3. Слушатель change переключает тему на лету без перезагрузки
4. Каждый тип имеет SVG-иконку: info (ⓘ), success (✓), attention (⚠), warning (✕)
5. Цвет иконки соответствует типу (info: #222, остальные: #fff; в тёмной теме info: #e0e0e0)
6. Иконка может быть переопределена через опцию icon в config или show()

## Tasks / Subtasks

- [ ] Создать src/theme.ts
  - [ ] Определить тип Theme = 'light' | 'dark'
  - [ ] Реализовать функцию getSystemTheme(): Theme — проверяет prefers-color-scheme
  - [ ] Реализовать функцию watchTheme(callback: (theme: Theme) => void): void
  - [ ] Подписаться на change события media-запроса
  - [ ] При изменении темы — обновить CSS-класс на всех карточках
- [ ] Доработать src/icons.ts
  - [ ] Определить SVG-строки для каждого типа
  - [ ] Инлайновый fill цвета: info — #222 (light) / #e0e0e0 (dark), остальные — #fff
  - [ ] Поддержка кастомной иконки через параметр icon
- [ ] Обновить BadwersNotify.ts
  - [ ] При инициализации вызвать getSystemTheme()
  - [ ] Сохранить текущую тему
- [ ] Написать тесты
  - [ ] theme.test.ts: getSystemTheme, watchTheme, переключение темы

## Dev Notes

- Определение темы только через prefers-color-scheme media query (без ручного переключателя — см. EXPERIENCE.md IP-5 Assumption)
- Слушатель change на media-запросе — тема меняется в реальном времени
- Цветовые токены из DESIGN.md: info (#fff/#222), success (#1e8a3a/#fff), attention (#b85c00/#fff), warning (#dc3545/#fff)
- Dark токены: info-dark (#2d2d2d/#e0e0e0), success-dark (#1e7e34/#fff), attention-dark (#b85c00/#fff), warning-dark (#a71d2a/#fff)
- Иконка info — тёмная на светлом фоне (fill #222), все остальные — белые на цветном фоне (fill #fff)
- Иконки инлайновые: возвращается строка <svg>...</svg>

### Project Structure Notes

- src/theme.ts (создать)
- src/icons.ts (обновить)
- src/BadwersNotify.ts (обновить)
- src/theme.test.ts (создать)

### References

- Источник: epics.md — Эпик 2, Story 2.7
- Архитектура: architecture.md — Темизация (сквозной аспект), Границы модулей (theme.ts ↔ icons.ts)
- UX: DESIGN.md — Colors (Light theme, Dark theme), Icon colors
- UX: EXPERIENCE.md — IP-5 (Dark mode)

## Dev Agent Record

### Agent Model Used

deepseek-v4-flash-free

### File List

- src/theme.ts (создать)
- src/icons.ts (обновить)
- src/BadwersNotify.ts (обновить)
- src/theme.test.ts (создать)

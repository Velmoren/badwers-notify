# Story 2.5: Анимация и таймеры

Status: done

## Story

As a разработчик,
I want реализовать анимацию появления/закрытия и таймер автозакрытия с pauseOnHover,
So that нотификации появляются и исчезают плавно, а таймер корректно приостанавливается при наведении.

## Acceptance Criteria

1. При добавлении в стек применяется CSS-класс анимации (slideInTop для top, slideInBottom для bottom)
2. Анимация длится animationDuration (по умолчанию 300ms)
3. При autoclose=true через duration (по умолчанию 5000ms) запускается анимация закрытия
4. При mouseenter на карточке таймер приостанавливается
5. При mouseleave таймер возобновляется на оставшееся время
6. При закрытии применяется CSS-класс closing, по окончании animationDuration элемент удаляется из DOM
7. Оставшиеся нотификации в стеке плавно смещаются (gap закрывается)

## Tasks / Subtasks

- [ ] Реализовать анимацию появления
  - [ ] При добавлении: добавить CSS-класс анимации (slideInTop/slideInBottom)
  - [ ] На animationDuration удалить класс анимации (переход к статичному состоянию)
- [ ] Реализовать таймер автозакрытия
  - [ ] После добавления: setTimeout(duration) для закрытия
  - [ ] Сохранять timerId и оставшееся время
- [ ] Реализовать pauseOnHover
  - [ ] mouseenter: clearTimeout, запомнить remaining
  - [ ] mouseleave: новый setTimeout на remaining
- [ ] Реализовать анимацию закрытия
  - [ ] Добавить CSS-класс closing при закрытии
  - [ ] После animationDuration: удалить элемент из DOM через removeElement
- [ ] Написать тесты
  - [ ] animate.test.ts: проверить добавление/удаление классов анимации
  - [ ] Протестировать таймер (факовый setTimeout через vi.useFakeTimers)
  - [ ] Протестировать pauseOnHover (mouseenter/mouseleave)

## Dev Notes

- Направление анимации зависит от позиции: top-позиции → slideInTop, bottom → slideInBottom
- animationDuration по умолчанию 300ms (из defaultConfig)
- При закрытии элемент остаётся в DOM на время анимации, затем удаляется
- gap между карточками закрывается автоматически (CSS transition on gap/margin или пересчёт стека)
- Для тестов использовать vi.useFakeTimers из Vitest
- При mouseenter/mouseleave использовать addEventListener, не CSS :hover (см. EXPERIENCE.md IP-4)

### Project Structure Notes

- src/animate.ts (обновить — добавить функции showAnimation, closeAnimation)
- src/animate.test.ts (создать)

### References

- Источник: epics.md — Эпик 2, Story 2.5
- Архитектура: architecture.md — Границы модулей (BadwersNotify.ts ↔ animate.ts)
- UX: EXPERIENCE.md — IP-1 (Show notification), IP-2 (Close notification), IP-4 (Auto-close timer), State Patterns

## Dev Agent Record

### Agent Model Used

deepseek-v4-flash-free

### File List

- src/animate.ts (обновить)
- src/animate.test.ts (создать)

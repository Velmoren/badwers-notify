# Story 2.3: Управление стеками

Status: done

## Story

As a разработчик,
I want реализовать управление DOM-контейнерами для каждой из 6 позиций,
So that нотификации располагаются корректно и соблюдают стековое поведение.

## Acceptance Criteria

1. `getStack(position)` создаёт или возвращает существующий Stack Container для заданной позиции
2. Stack Container имеет `position: fixed`, z-index: 10000, расположен в соответствии с позицией
3. Для top-позиций контейнер имеет flex-direction: column (новые снизу)
4. Для bottom-позиций контейнер имеет flex-direction: column-reverse (новые сверху)
5. При превышении maxStack самая старая нотификация удаляется без анимации
6. Контейнеры создаются лениво (не создаются до первого show для этой позиции)
7. `removeStack(position)` удаляет пустой контейнер
8. Stack Container имеет pointer-events: none (дочерние — auto)

## Tasks / Subtasks

- [ ] Создать src/stack.ts
  - [ ] Определить внутреннюю Map<Position, HTMLElement> для хранения ссылок на контейнеры
  - [ ] Реализовать getStack(position): HTMLElement
    - [ ] Если контейнер существует — вернуть
    - [ ] Если нет — создать через dom.ts createElement
    - [ ] Настроить position: fixed, z-index: 10000, pointer-events: none
    - [ ] Настроить flex-direction в зависимости от позиции (top/bottom)
    - [ ] Настроить расположение (top/left/right/center с transform)
    - [ ] Добавить padding отступы от края экрана
    - [ ] Добавить pointer-events: auto для дочерних элементов
  - [ ] Реализовать removeStack(position): void — удаляет контейнер из DOM и Map
  - [ ] Реализовать getStackOrder(): Map с порядком стеков
- [ ] Написать тесты
  - [ ] stack.test.ts: getStack создаёт контейнер, возвращает существующий, правильный flex-direction, позиции, removeStack удаляет

## Dev Notes

- Ленивое создание: контейнеры создаются только при первом show для данной позиции
- top-позиции (right-top, left-top, center-top): flex-direction: column, новые снизу
- bottom-позиции: flex-direction: column-reverse, новые сверху
- При превышении maxStack удаляется самая старая нотификация без анимации (мгновенный remove из DOM)
- pointer-events: none на контейнере, pointer-events: auto на карточках — чтобы клики проходили сквозь пустые области стека
- Z-index: 10000 — достаточно высокий, чтобы быть поверх большинства интерфейсов

### Project Structure Notes

- src/stack.ts (создать)
- src/stack.test.ts (создать)

### References

- Источник: epics.md — Эпик 2, Story 2.3
- Архитектура: architecture.md — Границы модулей (stack.ts ↔ dom.ts)
- UX: DESIGN.md — notify-stack, notify-stack-children
- UX: EXPERIENCE.md — Stack (Типы стеков, Емкость)

## Dev Agent Record

### Agent Model Used

deepseek-v4-flash-free

### File List

- src/stack.ts (создать)
- src/stack.test.ts (создать)

# Story 2.1: Типы и конфигурация

Status: done

## Story

As a разработчик,
I want определить TypeScript-типы и объект настроек по умолчанию,
So that библиотека имеет строгую типизацию и разумные умолчания.

## Acceptance Criteria

1. `src/types.ts` содержит интерфейсы `BadwersNotifyConfig`, `NotifyOptions`, `NotifyType`, `Position`
2. `src/config.ts` содержит `defaultConfig` со значениями: position='right-top', closable=true, autoclose=true, duration=5000, maxStack=10, animationDuration=300
3. `BadwersNotify.config({...})` глубоко сливает переданный объект с defaultConfig
4. `validatePosition()` выбрасывает Error при неверной позиции
5. `validateOptions()` выбрасывает Error при пустом message
6. Типы экспортируются из `src/index.ts`

## Tasks / Subtasks

- [ ] Создать src/types.ts
  - [ ] Определить type Position = 'right-top' | 'left-top' | 'center-top' | 'right-bottom' | 'left-bottom' | 'center-bottom'
  - [ ] Определить type NotifyType = 'info' | 'success' | 'attention' | 'warning'
  - [ ] Определить interface NotifyOptions (message, title?, type?, position?, closable?, autoclose?, duration?, icon?, customClass?, closeAriaLabel?)
  - [ ] Определить interface BadwersNotifyConfig (position?, closable?, autoclose?, duration?, maxStack?, animationDuration?, typeStyles?, icons?, closeAriaLabel?, font?)
- [ ] Создать src/config.ts
  - [ ] Реализовать defaultConfig объект
  - [ ] Реализовать функцию deepMerge(target, source) для глубокого слияния
  - [ ] Оборачивать deepMerge: config получает defaultConfig + переданный объект
- [ ] Создать src/utils.ts
  - [ ] Реализовать validatePosition(position): выбрасывает Error при неверной позиции
  - [ ] Реализовать validateOptions(options): выбрасывает Error при пустом message
  - [ ] Реализовать generateId(): инкрементальный счётчик (1, 2, 3...)
- [ ] Обновить src/index.ts
  - [ ] Реэкспортировать типы (BadwersNotifyConfig, NotifyOptions, NotifyType, Position)
- [ ] Написать тесты
  - [ ] config.test.ts: deepMerge, defaultConfig, config override
  - [ ] utils.test.ts: validatePosition, validateOptions, generateId

## Dev Notes

- Типы Position и NotifyType — строковые union types, не enum (меньше кода)
- deepMerge необходим для каскада конфигурации: глобальный config → per-notification override
- generateId использует инкрементальный счётчик (соглашение из архитектуры)
- validatePosition должна проверять 6 допустимых значений
- validateOptions проверяет только message (остальное опционально)
- Все модули строго типизированы, internal модули не экспортируются из index.ts

### Project Structure Notes

- src/types.ts (создать)
- src/config.ts (создать)
- src/utils.ts (создать)
- src/index.ts (обновить)
- src/config.test.ts (создать)
- src/utils.test.ts (обновить)

### References

- Источник: epics.md — Эпик 2, Story 2.1
- Архитектура: architecture.md — Границы модулей, Обработка ошибок
- UX: DESIGN.md — Все токены

## Dev Agent Record

### Agent Model Used

deepseek-v4-flash-free

### File List

- src/types.ts (создать)
- src/config.ts (создать)
- src/utils.ts (создать)
- src/index.ts (обновить)
- src/config.test.ts (создать)
- src/utils.test.ts (создать)

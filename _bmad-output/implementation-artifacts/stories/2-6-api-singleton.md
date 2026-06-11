# Story 2.6: Главный API — BadwersNotify singleton

Status: done

## Story

As a разработчик,
I want реализовать главный singleton-объект BadwersNotify с публичными методами,
So that пользователь библиотеки может вызывать единый API.

## Acceptance Criteria

1. `BadwersNotify.config({...})` обновляет глобальный конфиг
2. `BadwersNotify.show({message, type, ...})` создаёт нотификацию и возвращает `{ id, close() }`
3. `BadwersNotify.info/success/attention/warning({...})` — shorthand-методы с предустановленным type
4. `BadwersNotify.close(id)` закрывает нотификацию по ID
5. `BadwersNotify.closeAll()` закрывает все нотификации во всех стеках
6. Все методы синхронны (не async)
7. `src/index.ts` реэкспортирует BadwersNotify как default export + типы как named exports

## Tasks / Subtasks

- [ ] Создать src/BadwersNotify.ts
  - [ ] Создать singleton-объект BadwersNotify (не класс, а object literal с методами)
  - [ ] Хранить внутреннее состояние: currentConfig, stacks Map, notifyCounter
  - [ ] Реализовать метод config(partialConfig):
    - [ ] Глубокое слияние с defaultConfig из config.ts
    - [ ] Валидация позиции через validatePosition
  - [ ] Реализовать метод show(options):
    - [ ] Слить options с currentConfig
    - [ ] Валидация через validateOptions
    - [ ] Создать элемент через createNotifyElement
    - [ ] Получить стек через getStack
    - [ ] Вставить в стек (append для top, prepend для bottom)
    - [ ] Запустить анимацию появления
    - [ ] Запустить таймер автозакрытия
    - [ ] Вернуть { id, close() }
  - [ ] Реализовать shorthand-методы:
    - [ ] info(opts) = show({ ...opts, type: 'info' })
    - [ ] success(opts) = show({ ...opts, type: 'success' })
    - [ ] attention(opts) = show({ ...opts, type: 'attention' })
    - [ ] warning(opts) = show({ ...opts, type: 'warning' })
  - [ ] Реализовать close(id):
    - [ ] Найти элемент по ID
    - [ ] Запустить анимацию закрытия
    - [ ] Удалить из DOM
    - [ ] Управлять стеком (удалить контейнер если пуст)
  - [ ] Реализовать closeAll():
    - [ ] Пройти по всем стекам, закрыть все нотификации
- [ ] Обновить src/index.ts
  - [ ] export { default as BadwersNotify } from './BadwersNotify'
  - [ ] export type { BadwersNotifyConfig, NotifyOptions, NotifyType, Position }
- [ ] Написать интеграционные тесты
  - [ ] integration.test.ts: полный цикл show → close, closeAll, shorthand-методы, config override

## Dev Notes

- Singleton — объект, не класс. Пользователь не вызывает `new BadwersNotify()`
- Все методы синхронные (нет async/await, нет Promise)
- Каскад конфигурации: глобальный config (через .config()) → options при show()
- show() возвращает объект { id, close() } для программного закрытия
- close() — это функция, которая при вызове закрывает конкретную нотификацию
- ID генерируется инкрементально (1, 2, 3...)
- При closeAll() все нотификации одновременно получают класс closing

### Project Structure Notes

- src/BadwersNotify.ts (создать)
- src/index.ts (обновить)
- tests/integration.test.ts (создать)

### References

- Источник: epics.md — Эпик 2, Story 2.6
- Архитектура: architecture.md — Архитектура состояния (Singleton), Границы модулей, Экспорты
- UX: EXPERIENCE.md — IP-1 (Show notification), IP-3 (Close all), KF-1, KF-2

## Dev Agent Record

### Agent Model Used

deepseek-v4-flash-free

### File List

- src/BadwersNotify.ts (создать)
- src/index.ts (обновить)
- tests/integration.test.ts (создать)

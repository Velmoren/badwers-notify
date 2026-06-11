# Story 3.1: Презентационная страница

Status: done

## Story

As a посетитель GitHub Pages,
I want видеть демо-страницу с интерактивными примерами всех возможностей библиотеки,
So that могу оценить функционал до установки.

## Acceptance Criteria

1. demo/index.html подключает `../dist/badwers-notify.min.js`
2. Содержит кнопки для показа всех 4 типов (info, success, attention, warning)
3. Содержит переключатели всех 6 позиций
4. Содержит переключатели closable / autoclose
5. Содержит поле для ввода кастомного сообщения
6. Содержит секцию со ссылками на GitHub и документацию
7. Дизайн страницы нейтральный, не отвлекающий от нотификаций
8. GitHub Actions workflow publish.yml включает публикацию demo/ на Pages

## Tasks / Subtasks

- [ ] Создать demo/index.html
  - [ ] Подключить dist/badwers-notify.min.js (через script src)
  - [ ] Создать секцию выбора типа: 4 кнопки (Info, Success, Attention, Warning)
  - [ ] Создать секцию выбора позиции: 6 radio-кнопок
  - [ ] Создать секцию параметров: closable (checkbox), autoclose (checkbox), custom message (input)
  - [ ] Создать кнопку "Show notification" для запуска
  - [ ] Создать кнопки "Close All" для демонстрации closeAll()
  - [ ] Добавить секцию "About" со ссылками на GitHub и npm
  - [ ] Нейтральный дизайн (серый фон, без отвлекающих элементов)
- [ ] Обновить publish.yml
  - [ ] Добавить шаг деплоя demo/ на GitHub Pages
- [ ] Написать тесты (опционально — e2e)

## Dev Notes

- demo/index.html подключает IIFE-сборку (badwers-notify.min.js) через обычный script
- После подключения BadwersNotify доступен глобально
- Страница должна быть самодостаточной: открывается в браузере без сборки
- GitHub Pages публикует demo/ на отдельную ветку или subfolder
- Дизайн нейтральный: серый фон, крупные кнопки, читаемый текст

### Project Structure Notes

- demo/index.html (создать)
- .github/workflows/publish.yml (обновить)

### References

- Источник: epics.md — Эпик 3, Story 3.1
- Архитектура: architecture.md — Структура проекта (demo/)
- UX: EXPERIENCE.md — KF-5 (CDN подключение)

## Dev Agent Record

### Agent Model Used

deepseek-v4-flash-free

### File List

- demo/index.html (создать)
- .github/workflows/publish.yml (обновить)

# badwers-notify

[![npm version](https://img.shields.io/npm/v/badwers-notify)](https://www.npmjs.com/package/badwers-notify)
[![CI](https://github.com/ilyasovas/badwers-notify/actions/workflows/ci.yml/badge.svg)](https://github.com/ilyasovas/badwers-notify/actions/workflows/ci.yml)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/badwers-notify)](https://bundlephobia.com/package/badwers-notify)

A lightweight, zero-dependency JavaScript/TypeScript notification library with full a11y support, dark theme, and 6 positions. ~3.6 kB gzip.

## Project Documentation

This project was built using a structured planning pipeline. All artifacts are in `_bmad-output/`:

| Document | Description |
|----------|-------------|
| [PRD](_bmad-output/planning-artifacts/prds/prd-task-2026-06-11/prd.md) | Product requirements, 11 functional requirements, API contracts |
| [Architecture](_bmad-output/planning-artifacts/architecture.md) | Singleton pattern, CSS strategy, module boundaries, CI/CD decisions |
| [UX Design](_bmad-output/planning-artifacts/ux-designs/ux-task-2026-06-11/DESIGN.md) | Visual identity, color tokens, component anatomy |
| [UX Experience](_bmad-output/planning-artifacts/ux-designs/ux-task-2026-06-11/EXPERIENCE.md) | Interaction patterns, state machines, a11y floor, 6 key flows |
| [UX Review (Rubric)](_bmad-output/planning-artifacts/ux-designs/ux-task-2026-06-11/review-rubric.md) | Rubric-based design review |
| [UX Review (a11y)](_bmad-output/planning-artifacts/ux-designs/ux-task-2026-06-11/review-accessibility.md) | Accessibility audit results |
| [Epics & Stories](_bmad-output/planning-artifacts/epics.md) | 3 epics, 13 user stories covering all requirements |
| [Sprint Status](_bmad-output/implementation-artifacts/sprint-status.yaml) | Current sprint tracking, all 13 stories done |

## Install

```bash
npm install badwers-notify
```

Or via CDN:

```html
<script src="https://unpkg.com/badwers-notify"></script>
<script>
  BadwersNotify.show({ message: 'Hello!' });
</script>
```

## Quick Start

```js
import BadwersNotify from 'badwers-notify';

BadwersNotify.show({ message: 'Hello World!' });
```

## API

### `BadwersNotify.config(overrides)`

Update global configuration.

```js
BadwersNotify.config({ position: 'left-bottom', duration: 3000 });
```

### `BadwersNotify.show(options)`

Show a notification. Returns `{ id, close() }`.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `message` | `string` | — | Notification text (required) |
| `title` | `string` | — | Optional bold title |
| `type` | `'info' \| 'success' \| 'attention' \| 'warning'` | `'info'` | Visual style |
| `position` | `Position` | `'right-top'` | Stack position |
| `closable` | `boolean` | `true` | Show close button |
| `autoclose` | `boolean` | `true` | Auto-close after duration |
| `duration` | `number` | `5000` | Auto-close delay (ms) |
| `icon` | `string` | — | Custom SVG icon |
| `customClass` | `string` | — | Extra CSS class |
| `closeAriaLabel` | `string` | `'Close notification'` | Close button aria-label |

### Shorthand methods

```js
BadwersNotify.info({ message: 'Info' });
BadwersNotify.success({ message: 'Success' });
BadwersNotify.attention({ message: 'Attention' });
BadwersNotify.warning({ message: 'Warning' });
```

### `BadwersNotify.close(id)`

Close a specific notification by ID.

### `BadwersNotify.closeAll()`

Close all active notifications.

## Examples

### Different types

```js
BadwersNotify.success({ message: 'Saved!', title: 'Success' });
BadwersNotify.warning({ message: 'Connection lost' });
```

### Custom position

```js
BadwersNotify.show({ message: 'Bottom left', position: 'left-bottom' });
```

### No auto-close

```js
BadwersNotify.show({ message: 'Persistent', autoclose: false });
```

## Dark Theme

Dark theme is applied automatically when the system uses `prefers-color-scheme: dark`. Notifications update in real-time without a page reload.

## Accessibility

- `role="alert"` on all notification cards
- `aria-live="assertive"` on warning type
- Close button has `aria-label`
- Escape key closes focused notification
- Focus moves to next notification on close
- `:focus-visible` indicator on close button
- `prefers-reduced-motion` disables animations

## Browser Support

All modern browsers (Chrome, Firefox, Safari, Edge).

## License

MIT

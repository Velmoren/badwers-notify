---
name: badwers-notify
description: Visual identity for the badwers-notify notification library
status: final
created: 2026-06-11
updated: 2026-06-11
colors:
  # Light theme
  info-bg: '#ffffff'
  info-text: '#222222'
  success-bg: '#1e8a3a'
  success-text: '#ffffff'
  attention-bg: '#b85c00'
  attention-text: '#ffffff'
  warning-bg: '#dc3545'
  warning-text: '#ffffff'
  close-btn: '#666666'
  close-btn-hover: '#222222'
  icon-info: '#222222'
  icon-success: '#ffffff'
  icon-attention: '#ffffff'
  icon-warning: '#ffffff'
  stack-bg: '#00000000'
  # Dark theme
  info-bg-dark: '#2d2d2d'
  info-text-dark: '#e0e0e0'
  success-bg-dark: '#1e7e34'
  success-text-dark: '#ffffff'
  attention-bg-dark: '#b85c00'
  attention-text-dark: '#ffffff'
  warning-bg-dark: '#a71d2a'
  warning-text-dark: '#ffffff'
  close-btn-dark: '#777777'
  close-btn-hover-dark: '#cccccc'
  icon-info-dark: '#e0e0e0'
  icon-success-dark: '#ffffff'
  icon-attention-dark: '#ffffff'
  icon-warning-dark: '#ffffff'
typography:
  message:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: '14px'
    fontWeight: '400'
    lineHeight: '1.4'
  title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: '15px'
    fontWeight: '600'
    lineHeight: '1.3'
rounded:
  DEFAULT: '8px'
  sm: '4px'
spacing:
  1: '4px'
  2: '8px'
  3: '12px'
  4: '16px'
  5: '20px'
  6: '24px'
components:
  notify-container:
    width: '360px'
    maxWidth: '360px'
    padding: '0'
    margin: '0 0 {spacing.2}'
    borderRadius: '{rounded.DEFAULT}'
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    overflow: 'hidden'
    transition: 'all 300ms ease'
  notify-body:
    display: 'flex'
    alignItems: 'flex-start'
    padding: '{spacing.3} {spacing.4}'
    gap: '{spacing.3}'
  notify-icon:
    width: '20px'
    height: '20px'
    flexShrink: '0'
    marginTop: '1px'
  notify-content:
    flex: '1'
    minWidth: '0'
  notify-title:
    margin: '0 0 {spacing.1}'
  notify-message:
    margin: '0'
  notify-close:
    width: '24px'
    height: '24px'
    cursor: 'pointer'
    color: '{colors.close-btn}'
    transition: 'color 200ms'
    border: 'none'
    background: 'transparent'
    flexShrink: '0'
    padding: '2px'
    display: 'flex'
    alignItems: 'center'
    justifyContent: 'center'
  notify-close-hover:
    color: '{colors.close-btn-hover}'
  notify-stack:
    position: 'fixed'
    zIndex: '10000'
    pointerEvents: 'none'
  notify-stack-children:
    pointerEvents: 'auto'
---
# DESIGN.md — badwers-notify

## Brand & Style

**badwers-notify** — минималистичная, ненавязчивая система уведомлений. Визуальный язык нейтральный, с цветовой дифференциацией по серьёзности сообщения. Без лишних декоративных элементов. Тени и скругления задают аккуратную карточную эстетику.

→ Composition reference: `.working/key-screens.html` (5 сцен: стек right-top, right-bottom, center-top/bottom, тёмная тема, нотификация без крестика)

## Colors

- **Info** — белая карточка с тёмным текстом. Визуально нейтральна, не привлекает излишнего внимания.
- **Success** — зелёный фон, белый текст и иконка. Ассоциируется с подтверждением / завершением.
- **Attention** — оранжевый фон, белый текст и иконка. Привлекает внимание без паники.
- **Warning** — красный фон, белый текст и иконка. Сигнал об ошибке или критической ситуации.

В тёмной теме фоны приглушаются для снижения контрастного напряжения: `info-bg-dark` тёмно-серый вместо белого, цветные фоны затемнены на ~20%.

## Typography

Системный стек шрифтов — быстрая загрузка, нативный вид на каждой платформе. Заголовок семиболд (600) 15px, сообщение regular (400) 14px. `[ASSUMPTION: font stack и размеры переопределяются через конфиг]`

## Layout & Spacing

Фиксированная ширина нотификации — 360px. Внутренние отступы: 12px по вертикали, 16px по горизонтали. Между нотификациями в стеке — 8px. Иконка и контент — flex-row с gap 12px.

## Elevation & Depth

Одна тень: `0 4px 12px rgba(0,0,0,0.15)` — карточка приподнята над интерфейсом. `[ASSUMPTION: тень не кастомизируется в v1]`

## Shapes

Радиус скругления — 8px для всех нотификаций. Единообразно.

## Components

### notify-info / notify-success / notify-attention / notify-warning

Анатомия: иконка (слева) → контент (центр) → кнопка закрытия (справа, если `closable: true`). Фон и цвет текста зависят от типа и текущей цветовой схемы (светлая/тёмная).

### notify-stack

Контейнер для группы нотификаций на одной позиции. Фиксированное позиционирование, `pointer-events: none`. Дочерние карточки — `pointer-events: auto`. Не имеет собственного фона. Прозрачный контейнер с z-index 10000.

### notify-close

Прозрачная кнопка без фона и границы, 24×24px (область клика). Иконка × цвета `{colors.close-btn}`. При наведении — `{colors.close-btn-hover}`. В тёмной теме соответствующие dark-токены. Для coloured-фонов (success / attention / warning) цвет иконки — `rgba(255,255,255,0.85)`. Для светлых фонов (info) — `{colors.close-btn}`.

## Do's and Don'ts

- **Do:** использовать тип `info` для нейтральных сообщений.
- **Do:** использовать тип `warning` только для ошибок, требующих внимания.
- **Don't:** злоупотреблять `attention` — он теряет эффект при частом использовании.
- **Don't:** менять ширину нотификации в рантайме — это ломает стек.

# Telegram Mini App Integration

## Обзор

Этот проект интегрирован с Telegram Mini App API для создания нативного мобильного опыта внутри Telegram.

## Основные функции

### 1. Кнопка "Назад" (Back Button)
- Автоматически показывается на всех страницах кроме главной
- Использует встроенную навигацию Telegram
- Настраивается через `TelegramProvider`

### 2. Кнопка "Закрыть" (Close Button)
- Всегда доступна в заголовке Telegram
- Настраивается через `WebApp.enableClosingConfirmation()`
- Закрывает Mini App

### 3. Предотвращение вертикального скролла
- Фиксированный viewport без скролла
- Адаптация под размеры мобильных устройств
- Использование `WebApp.expand()` и `WebApp.disableScroll()`

## Структура файлов

```
src/
├── providers/
│   └── TelegramProvider.tsx    # Управление навигацией Telegram
├── hooks/
│   └── useTelegram.ts          # Основной хук для Telegram API
├── styles/
│   └── globals.scss            # Глобальные стили без скролла
└── App.tsx                     # Интеграция с TelegramProvider
```

## Использование

### В компонентах

```tsx
import { useTelegramContext } from '../providers/TelegramProvider'

const MyComponent = () => {
  const { closeApp, showBackButton } = useTelegramContext()
  
  return (
    <div>
      <button onClick={closeApp}>Закрыть приложение</button>
    </div>
  )
}
```

### Настройка навигации

```tsx
// Кнопка "Назад" автоматически показывается на всех страницах кроме '/'
// Для кастомной логики используйте:
const { showBackButton, hideBackButton } = useTelegramContext()

useEffect(() => {
  showBackButton(() => {
    // Кастомная логика навигации
    navigate('/custom-route')
  })
  
  return () => hideBackButton()
}, [])
```

## API Telegram WebApp

### Основные методы

- `WebApp.ready()` - Инициализация
- `WebApp.expand()` - Расширение viewport
- `WebApp.disableScroll()` - Отключение скролла
- `WebApp.setHeaderColor()` - Цвет заголовка
- `WebApp.setBackgroundColor()` - Цвет фона
- `WebApp.setThemeParams()` - Настройка темы

### Кнопки

- `WebApp.BackButton.show/hide()` - Кнопка "Назад"
- `WebApp.MainButton.show/hide()` - Главная кнопка
- `WebApp.close()` - Закрытие приложения

## Стили

### Глобальные настройки

```scss
html, body {
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}
```

### Адаптивность

- Используйте `height: '100vh'` вместо `minHeight: '100vh'`
- Добавляйте `overflow: 'hidden'` для контейнеров
- Используйте `boxSizing: 'border-box'` для правильных размеров

## Отладка

### Проверка инициализации

```tsx
useEffect(() => {
  console.log('WebApp ready:', WebApp.isExpanded)
  console.log('User:', WebApp.initDataUnsafe?.user)
}, [])
```

### Проверка навигации

```tsx
useEffect(() => {
  console.log('Current path:', location.pathname)
  console.log('Back button visible:', location.pathname !== '/')
}, [location.pathname])
```

## Известные проблемы

1. **Вертикальный скролл**: Решено через фиксированный viewport
2. **Размеры экрана**: Используйте `100vh` и `100vw`
3. **Touch события**: Автоматически обрабатываются Telegram

## Рекомендации

1. Всегда используйте `TelegramProvider` для управления навигацией
2. Тестируйте на реальных мобильных устройствах
3. Используйте `WebApp.expand()` для лучшего UX
4. Настраивайте цвета через `setThemeParams`

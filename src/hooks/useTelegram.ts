import { useCallback } from 'react'
import WebApp from '@twa-dev/sdk'

export const useTelegram = () => {
  const initTelegram = useCallback(() => {
    try {
      // Инициализируем Telegram Mini App
      WebApp.ready()
      
      // Настраиваем viewport для мобильных устройств
      WebApp.expand()
      
      // Отключаем скролл в основном окне (если поддерживается)
      try {
        WebApp.disableScroll()
      } catch (error) {
        console.log('disableScroll not supported in this version')
      }
      
      console.log('Telegram Mini App initialized successfully')
    } catch (error) {
      console.error('Failed to initialize Telegram Mini App:', error)
    }
  }, [])

  const showMainButton = useCallback((text: string, callback: () => void) => {
    try {
      WebApp.MainButton.setText(text)
      WebApp.MainButton.onClick(callback)
      WebApp.MainButton.show()
    } catch (error) {
      console.error('Failed to show MainButton:', error)
    }
  }, [])

  const hideMainButton = useCallback(() => {
    try {
      WebApp.MainButton.hide()
    } catch (error) {
      console.error('Failed to hide MainButton:', error)
    }
  }, [])

  const showBackButton = useCallback((callback: () => void) => {
    try {
      // Проверяем, поддерживается ли BackButton
      if (WebApp.BackButton && typeof WebApp.BackButton.onClick === 'function') {
        WebApp.BackButton.onClick(callback)
        WebApp.BackButton.show()
      } else {
        console.warn('BackButton not supported in this version, using fallback navigation')
        // Fallback: сразу вызываем callback для навигации
        callback()
      }
    } catch (error) {
      console.error('useTelegram: Failed to show BackButton:', error)
      // Fallback: сразу вызываем callback для навигации
      callback()
    }
  }, [])

  const hideBackButton = useCallback(() => {
    try {
      if (WebApp.BackButton && typeof WebApp.BackButton.hide === 'function') {
        WebApp.BackButton.hide()
      }
    } catch (error) {
      console.error('useTelegram: Failed to hide BackButton:', error)
    }
  }, [])

  const closeApp = useCallback(() => {
    try {
      WebApp.close()
    } catch (error) {
      console.error('Failed to close app:', error)
    }
  }, [])

  const getUser = useCallback(() => {
    return WebApp.initDataUnsafe?.user
  }, [])

  const getInitData = useCallback(() => {
    return WebApp.initData
  }, [])

  return {
    initTelegram,
    showMainButton,
    hideMainButton,
    showBackButton,
    hideBackButton,
    closeApp,
    getUser,
    getInitData,
    WebApp,
  }
}

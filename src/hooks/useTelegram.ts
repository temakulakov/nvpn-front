import { useCallback } from 'react'
import WebApp from '@twa-dev/sdk'

export const useTelegram = () => {
  const initTelegram = useCallback(() => {
    try {
      // Инициализируем Telegram Mini App
      WebApp.ready()
      
      // Настраиваем основной цвет
      WebApp.setHeaderColor('#6EB463')
      
      // Настраиваем цвет фона
      WebApp.setBackgroundColor('#242834')
      
      // Отключаем скролл в основном окне Telegram
      WebApp.enableClosingConfirmation()
      
      // Настраиваем viewport для мобильных устройств
      WebApp.expand()
      
      // Настраиваем тему (светлая/темная)
      WebApp.setThemeParams({
        bg_color: '#242834',
        text_color: '#ffffff',
        hint_color: '#89E67E',
        link_color: '#89E67E',
        button_color: '#6EB463',
        button_text_color: '#ffffff'
      })
      
      // Отключаем скролл в основном окне
      WebApp.disableScroll()
      
      console.log('Telegram Mini App initialized successfully')
    } catch (error) {
      console.error('Failed to initialize Telegram Mini App:', error)
    }
  }, [])

  const showMainButton = useCallback((text: string, callback: () => void) => {
    WebApp.MainButton.setText(text)
    WebApp.MainButton.onClick(callback)
    WebApp.MainButton.show()
  }, [])

  const hideMainButton = useCallback(() => {
    WebApp.MainButton.hide()
  }, [])

  const showBackButton = useCallback((callback: () => void) => {
    console.log('useTelegram: showBackButton called with callback:', callback)
    try {
      WebApp.BackButton.onClick(callback)
      WebApp.BackButton.show()
      console.log('useTelegram: BackButton shown successfully')
    } catch (error) {
      console.error('useTelegram: Failed to show BackButton:', error)
    }
  }, [])

  const hideBackButton = useCallback(() => {
    console.log('useTelegram: hideBackButton called')
    try {
      WebApp.BackButton.hide()
      console.log('useTelegram: BackButton hidden successfully')
    } catch (error) {
      console.error('useTelegram: Failed to hide BackButton:', error)
    }
  }, [])

  const closeApp = useCallback(() => {
    WebApp.close()
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

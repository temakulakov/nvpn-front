import React, { createContext, useContext, useEffect, ReactNode } from 'react'
import { useTelegram } from '../hooks/useTelegram'

interface TelegramContextType {
  showBackButton: (callback: () => void) => void
  hideBackButton: () => void
  closeApp: () => void
  showCloseButton: () => void
  hideCloseButton: () => void
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined)

interface TelegramProviderProps {
  children: ReactNode
}

export const TelegramProvider: React.FC<TelegramProviderProps> = ({ children }) => {
  const { showBackButton, hideBackButton, closeApp, WebApp } = useTelegram()

  useEffect(() => {
    // В версии 6.0 многие методы не поддерживаются
    // Просто логируем инициализацию
    console.log('TelegramProvider initialized, WebApp version:', WebApp.version)
  }, [WebApp])

  const showCloseButton = () => {
    // В Telegram Mini App кнопка закрытия доступна всегда
    console.log('Close button is always available in Telegram')
  }

  const hideCloseButton = () => {
    // В Telegram Mini App кнопку закрытия нельзя скрыть
    console.log('Close button cannot be hidden in Telegram')
  }

  const contextValue: TelegramContextType = {
    showBackButton,
    hideBackButton,
    closeApp,
    showCloseButton,
    hideCloseButton,
  }

  return (
    <TelegramContext.Provider value={contextValue}>
      {children}
    </TelegramContext.Provider>
  )
}

export const useTelegramContext = (): TelegramContextType => {
  const context = useContext(TelegramContext)
  if (context === undefined) {
    throw new Error('useTelegramContext must be used within a TelegramProvider')
  }
  return context
}

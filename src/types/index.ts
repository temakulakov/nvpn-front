// Telegram Web App типы
export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  photo_url?: string
}

export interface TelegramWebApp {
  ready: () => void
  setHeaderColor: (color: string) => void
  setBackgroundColor: (color: string) => void
  MainButton: {
    show: () => void
    hide: () => void
    setText: (text: string) => void
    onClick: (callback: () => void) => void
  }
  BackButton: {
    show: () => void
    hide: () => void
    onClick: (callback: () => void) => void
  }
  initData: string
  initDataUnsafe: {
    user?: TelegramUser
  }
}

// API типы
export interface Plan {
  id: number
  name: string
  price: number
  period: number
  devices: number
  features: string[]
  popular: boolean
}

export interface Subscription {
  id: number
  planId: number
  userId: number
  status: 'active' | 'expired' | 'cancelled'
  startDate: string
  endDate: string
  devices: number
}

export interface User {
  id: number
  telegramId: number
  username?: string
  firstName: string
  lastName?: string
  balance: number
  language: string
  createdAt: string
  updatedAt: string
}

// Языковые типы
export interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

// Навигационные типы
export type AppRoute = '/' | '/account' | '/prices' | '/language'

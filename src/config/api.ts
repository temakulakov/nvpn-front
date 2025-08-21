import axios from 'axios'

// Базовый URL для API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Создаем экземпляр axios с базовой конфигурацией
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Интерцептор для добавления Telegram авторизации
apiClient.interceptors.request.use(
  (config) => {
    // Получаем initData из Telegram WebApp
    if (window.Telegram?.WebApp?.initData) {
      config.headers.Authorization = `Bearer ${window.Telegram.WebApp.initData}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Интерцептор для обработки ответов
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Обработка неавторизованного доступа
      console.error('Unauthorized access')
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const API_ENDPOINTS = {
  // Пользователи
  USERS: {
    ME: '/users/me',
    BALANCE: '/users/balance',
    REFERRAL: '/users/referral',
    REFERRALS: '/users/referrals',
  },
  
  // Планы
  PLANS: {
    LIST: '/plans',
    BY_ID: (id: number) => `/plans/${id}`,
  },
  
  // Подписки
  SUBSCRIPTIONS: {
    CURRENT: '/subscriptions/current',
    ACTIVE: '/subscriptions/active',
    HISTORY: '/subscriptions/history',
    CREATE: '/subscriptions',
    ACTIVATE: (id: number) => `/subscriptions/${id}/activate`,
    CONFIGS: (id: number) => `/subscriptions/${id}/configs`,
    GENERATE_CONFIG: (id: number) => `/subscriptions/${id}/configs/generate`,
  },
  
  // Платежи
  PAYMENTS: {
    CREATE: '/payments/create',
    CRYPTOGRAM: '/payments/cryptogram',
    HISTORY: '/payments/history',
    STATUS: (id: number) => `/payments/${id}/status`,
    WEBHOOK: '/payments/webhook',
  },
  
  // Промокоды
  PROMO_CODES: {
    USE: '/promo-codes/use',
    VALIDATE: '/promo-codes/validate',
    MY_USAGES: '/promo-codes/my-usages',
  },
  
  // VPN конфиги
  VPN_CONFIGS: {
    BY_SUBSCRIPTION: (subscriptionId: number) => `/vpn-configs/subscription/${subscriptionId}`,
    GENERATE: '/vpn-configs/generate',
    DELETE: (configId: number) => `/vpn-configs/${configId}`,
    GET: (configId: number) => `/vpn-configs/${configId}`,
  },
} as const

// Типы для API ответов
export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  statusCode: number
  error: string
  timestamp: string
  path: string
  method: string
}

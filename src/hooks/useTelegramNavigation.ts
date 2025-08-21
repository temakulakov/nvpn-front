import { useEffect } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useTelegramContext } from '../providers/TelegramProvider'

export const useTelegramNavigation = () => {
  const { showBackButton, hideBackButton } = useTelegramContext()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Показываем кнопку "Назад" только когда не на главной странице
    if (location.pathname !== '/') {
      showBackButton(() => {
        // Используем более надежный способ навигации
        if (location.pathname === '/prices') {
          navigate({ to: '/' })
        } else if (location.pathname === '/account') {
          navigate({ to: '/' })
        } else if (location.pathname === '/language') {
          navigate({ to: '/' })
        } else {
          // Fallback на главную страницу
          navigate({ to: '/' })
        }
      })
    } else {
      hideBackButton()
    }

    // Очищаем обработчик при размонтировании
    return () => {
      hideBackButton()
    }
  }, [location.pathname, navigate, showBackButton, hideBackButton])
}

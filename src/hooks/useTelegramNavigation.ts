import { useEffect } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useTelegramContext } from '../providers/TelegramProvider'

export const useTelegramNavigation = () => {
  const { showBackButton, hideBackButton } = useTelegramContext()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('useTelegramNavigation: current pathname:', location.pathname)
    
    // Показываем кнопку "Назад" только когда не на главной странице
    if (location.pathname !== '/') {
      console.log('useTelegramNavigation: showing back button for path:', location.pathname)
      
      showBackButton(() => {
        console.log('useTelegramNavigation: back button clicked, navigating to home')
        
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
      console.log('useTelegramNavigation: hiding back button (on home page)')
      hideBackButton()
    }

    // Очищаем обработчик при размонтировании
    return () => {
      console.log('useTelegramNavigation: cleaning up back button')
      hideBackButton()
    }
  }, [location.pathname, navigate, showBackButton, hideBackButton])
}

import React, { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { 
  Box, 
  Button, 
  Paper, 
  Typography,
  Stack,
  Avatar,
  Divider
} from '@mui/material'
import { 
  VpnKey as VpnKeyIcon,
  History as HistoryIcon,
  Settings as SettingsIcon
} from '@mui/icons-material'
import { useTelegram } from '../hooks/useTelegram'
import { useTelegramNavigation } from '../hooks/useTelegramNavigation'

export const AccountPage: React.FC = () => {
  const navigate = useNavigate()
  const { getUser } = useTelegram()
  
  // Используем хук для управления навигацией Telegram
  useTelegramNavigation()

  const user = getUser()

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        background: '#242834',
        backgroundImage: `
          radial-gradient(circle at 20% 20%, #70811E 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, #70811E 0%, transparent 50%)
        `,
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Декоративные шары */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '80px',
          height: '80px',
          border: '2px solid #70811E',
          borderRadius: '50%',
          opacity: 0.2,
          animation: 'float 7s ease-in-out infinite'
        }}
      />

      {/* Заголовок */}
      <Box sx={{ textAlign: 'center', marginBottom: '30px' }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            marginBottom: '10px',
            fontSize: { xs: '1.5rem', sm: '2rem' }
          }}
        >
          Мой аккаунт
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          Управление профилем и подписками
        </Typography>
      </Box>

      {/* Основной контейнер */}
      <Paper
        elevation={8}
        sx={{
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto',
          padding: '30px',
          borderRadius: '20px',
          background: 'rgba(110, 180, 99, 0.5)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(137, 230, 126, 0.3)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}
      >
        <Stack spacing={3}>
          {/* Информация о пользователе */}
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                margin: '0 auto 16px',
                background: '#6EB463',
                fontSize: '32px'
              }}
            >
              {user?.first_name?.[0] || 'U'}
            </Avatar>
            <Typography
              variant="h6"
              sx={{
                color: '#ffffff',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}
            >
              {user?.first_name || 'Пользователь'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              ID: {user?.id || 'Неизвестно'}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

          {/* Кнопки управления */}
          <Button
            variant="outlined"
            fullWidth
            size="large"
            startIcon={<VpnKeyIcon />}
            sx={{
              height: '56px',
              fontSize: '16px',
              color: '#ffffff',
              borderColor: '#89E67E',
              '&:hover': {
                borderColor: '#89E67E',
                background: 'rgba(137, 230, 126, 0.1)',
              }
            }}
          >
            Мои VPN конфиги
          </Button>

          <Button
            variant="outlined"
            fullWidth
            size="large"
            startIcon={<HistoryIcon />}
            sx={{
              height: '56px',
              fontSize: '16px',
              color: '#ffffff',
              borderColor: '#89E67E',
              '&:hover': {
                borderColor: '#89E67E',
                background: 'rgba(137, 230, 126, 0.1)',
              }
            }}
          >
            История подписок
          </Button>

          <Button
            variant="outlined"
            fullWidth
            size="large"
            startIcon={<SettingsIcon />}
            sx={{
              height: '56px',
              fontSize: '16px',
              color: '#ffffff',
              borderColor: '#89E67E',
              '&:hover': {
                borderColor: '#89E67E',
                background: 'rgba(137, 230, 126, 0.1)',
              }
            }}
          >
            Настройки
          </Button>

          {/* Заглушка */}
          <Box
            sx={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              textAlign: 'center'
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontStyle: 'italic'
              }}
            >
              🚧 Страница в разработке
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* CSS анимации */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
        `}
      </style>
    </Box>
  )
}

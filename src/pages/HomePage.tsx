import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { 
  Box, 
  Button, 
  Paper, 
  Typography,
  Stack
} from '@mui/material'
import { 
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Help as HelpIcon,
  Language as LanguageIcon
} from '@mui/icons-material'
import { Logo } from '../components/Logo'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        background: '#242834',
        backgroundImage: `
          radial-gradient(circle at 20% 20%, #70811E 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, #70811E 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, #70811E 0%, transparent 50%)
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Decorative spheres */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '100px',
          height: '100px',
          border: '2px solid #70811E',
          borderRadius: '50%',
          opacity: 0.3,
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '80px',
          height: '80px',
          border: '2px solid #70811E',
          borderRadius: '50%',
          opacity: 0.2,
          animation: 'float 8s ease-in-out infinite reverse'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          left: '20%',
          width: '60px',
          height: '60px',
          border: '2px solid #70811E',
          borderRadius: '50%',
          opacity: 0.4,
          animation: 'float 7s ease-in-out infinite'
        }}
      />

      {/* Logo */}
      <Box
        sx={{
          marginTop: '60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Logo width={140} height={140} color="#ffffff" />
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: { xs: '1.5rem', sm: '2rem' }
          }}
        >
          {t('home.title')}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#ffffff',
            textAlign: 'center',
            opacity: 0.8,
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          {t('home.subtitle')}
        </Typography>
      </Box>

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          maxWidth: '300px',
          marginBottom: '40px'
        }}
      >
        <Button
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          onClick={() => navigate({ to: '/prices' })}
          sx={{
            backgroundColor: 'rgba(137, 230, 126, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(137, 230, 126, 0.3)',
            }
          }}
        >
          {t('home.buySubscription')}
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<PersonIcon />}
          onClick={() => navigate({ to: '/account' })}
          sx={{
            borderColor: '#89E67E',
            color: '#89E67E',
            '&:hover': {
              borderColor: '#7DD56E',
              backgroundColor: 'rgba(137, 230, 126, 0.1)',
            }
          }}
        >
          {t('home.account')}
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<LanguageIcon />}
          onClick={() => navigate({ to: '/language' })}
          sx={{
            borderColor: '#89E67E',
            color: '#89E67E',
            '&:hover': {
              borderColor: '#7DD56E',
              backgroundColor: 'rgba(137, 230, 126, 0.1)',
            }
          }}
        >
          {t('home.language')}
        </Button>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          textAlign: 'center',
          opacity: 0.6,
          marginBottom: '20px'
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: '#ffffff',
            fontSize: '0.8rem'
          }}
        >
          {t('home.footer')}
        </Typography>
      </Box>

      {/* CSS animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>
    </Box>
  )
}

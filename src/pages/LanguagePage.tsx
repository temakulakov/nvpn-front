import React, { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { 
  Box, 
  Paper, 
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  Divider
} from '@mui/material'
import { useTelegram } from '../hooks/useTelegram'
import { useTelegramNavigation } from '../hooks/useTelegramNavigation'

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

export const LanguagePage: React.FC = () => {
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()
  const { WebApp } = useTelegram()
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ru')
  
  // Используем хук для управления навигацией Telegram
  useTelegramNavigation()

  // Инициализируем язык при загрузке компонента
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        // Проверяем язык из Telegram
        let telegramLanguage = 'ru'
        
        if (WebApp?.initDataUnsafe?.user?.language_code) {
          const tgLang = WebApp.initDataUnsafe.user.language_code
          // Маппинг языков Telegram на наши коды
          const languageMap: { [key: string]: string } = {
            'ru': 'ru',
            'en': 'en',
            'tg': 'tg',
            'uz': 'uz',
            'ky': 'ky',
            'zh': 'zh',
            'fa': 'fa'
          }
          
          if (languageMap[tgLang]) {
            telegramLanguage = languageMap[tgLang]
          }
        }

        // Проверяем сохраненный язык или используем Telegram язык
        const savedLanguage = localStorage.getItem('i18nextLng')
        const currentLanguage = savedLanguage || telegramLanguage
        
        // Устанавливаем язык если он отличается от текущего
        if (i18n.language !== currentLanguage) {
          await i18n.changeLanguage(currentLanguage)
        }
        
        // Важно: устанавливаем состояние ПОСЛЕ изменения языка
        setSelectedLanguage(currentLanguage)
        
        console.log('Language initialized:', {
          telegramLanguage,
          savedLanguage,
          currentLanguage,
          i18nLanguage: i18n.language
        })
        
      } catch (error) {
        console.error('Failed to initialize language:', error)
        // Fallback на русский
        setSelectedLanguage('ru')
      }
    }

    initializeLanguage()
  }, [i18n, WebApp])

  // Синхронизируем состояние с i18n.language при его изменении
  useEffect(() => {
    if (i18n.language && i18n.language !== selectedLanguage) {
      setSelectedLanguage(i18n.language)
    }
  }, [i18n.language, selectedLanguage])

  // Только нужные языки согласно вашему запросу
  const languages: Language[] = [
    { code: 'tg', name: 'Tajik', nativeName: 'тоҷикӣ', flag: '🇹🇯' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'uz', name: 'Uzbek', nativeName: 'o\'zbek', flag: '🇺🇿' },
    { code: 'ky', name: 'Kyrgyz', nativeName: 'кыргыз', flag: '🇰🇬' },
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'zh', name: 'Chinese', nativeName: '中国语文科', flag: '🇨🇳' },
    { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷' }
  ]

  const handleLanguageChange = async (languageCode: string) => {
    try {
      console.log('Changing language to:', languageCode)
      
      // Меняем язык
      await i18n.changeLanguage(languageCode)
      
      // Обновляем состояние
      setSelectedLanguage(languageCode)
      
      // Сохраняем в localStorage
      localStorage.setItem('i18nextLng', languageCode)
      
      console.log('Language changed successfully to:', languageCode)
      console.log('Current language:', i18n.language)
      console.log('Available languages:', i18n.languages)
      
      // НЕ возвращаемся на главную страницу
      // Пользователь остается на странице языков
      
    } catch (error) {
      console.error('Failed to change language:', error)
    }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        background: '#242834',
        backgroundImage: `
          radial-gradient(circle at 20% 20%, #70811E 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, #70811E 0%, transparent 50%)
        `,
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Декоративные шары */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '60px',
          height: '60px',
          border: '2px solid #70811E',
          borderRadius: '50%',
          opacity: '0.3',
          animation: 'float 7s ease-in-out infinite'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '25%',
          right: '15%',
          width: '80px',
          height: '80px',
          border: '2px solid #70811E',
          borderRadius: '50%',
          opacity: '0.2',
          animation: 'float 9s ease-in-out infinite reverse'
        }}
      />

      {/* Заголовок */}
      <Box sx={{ textAlign: 'center', marginBottom: '20px', flexShrink: 0 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}
        >
          {t('language.title')}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.8)'
          }}
        >
          {t('language.subtitle')}
        </Typography>
      </Box>

      {/* Основной контейнер */}
      <Paper
        elevation={8}
        sx={{
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto',
          borderRadius: '20px',
          background: 'rgba(110, 180, 99, 0.5)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(137, 230, 126, 0.3)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Список языков */}
        <List sx={{ padding: 0, flex: 1, overflow: 'hidden' }}>
          {languages.map((language, index) => (
            <React.Fragment key={language.code}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleLanguageChange(language.code)}
                  sx={{
                    padding: '16px 20px',
                    '&:hover': {
                      background: 'rgba(137, 230, 126, 0.1)',
                    },
                    '&:active': {
                      background: 'rgba(137, 230, 126, 0.2)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: '50px' }}>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontSize: '2.2rem',
                        lineHeight: 1
                      }}
                    >
                      {language.flag}
                    </Typography>
                  </ListItemIcon>
                  
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#ffffff',
                          fontWeight: 'bold',
                          marginBottom: '4px'
                        }}
                      >
                        {language.nativeName}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)'
                        }}
                      >
                        {language.name}
                      </Typography>
                    }
                  />
                  
                  <Radio
                    checked={selectedLanguage === language.code}
                    sx={{
                      color: '#89E67E',
                      '&.Mui-checked': {
                        color: '#89E67E',
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
              
              {index < languages.length - 1 && (
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Информация о текущем языке */}
      <Box
        sx={{
          marginTop: '15px',
          padding: '12px',
          background: 'rgba(137, 230, 126, 0.1)',
          borderRadius: '12px',
          textAlign: 'center',
          maxWidth: '400px',
          margin: '15px auto 0',
          border: '1px solid rgba(137, 230, 126, 0.3)',
          flexShrink: 0
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontStyle: 'italic'
          }}
        >
          🌍 {t('language.currentLanguage')}: {selectedLanguage} | i18n: {i18n.language} | Telegram: {WebApp?.initDataUnsafe?.user?.language_code || t('language.notDefined')}
        </Typography>
      </Box>

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

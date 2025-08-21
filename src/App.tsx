import { useEffect } from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { I18nextProvider } from 'react-i18next'
import { useTelegram } from './hooks/useTelegram'
import { ErrorBoundary } from './components/ErrorBoundary'
import i18n from './i18n'

// Создаем тему Material UI с вашими цветами
const theme = createTheme({
  palette: {
    primary: {
      main: '#6EB463',
      light: '#89E67E',
      dark: '#70811E',
    },
    background: {
      default: '#242834',
      paper: 'rgba(110, 180, 99, 0.5)',
    },
    text: {
      primary: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 13,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '16px',
          padding: '12px 24px',
          border: '2px solid #89E67E',
          '&:hover': {
            backgroundColor: '#89E67E',
            borderColor: '#89E67E',
          },
          '&:active': {
            backgroundColor: '#89E67E',
            borderColor: '#89E67E',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(110, 180, 99, 0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(137, 230, 126, 0.3)',
        },
      },
    },
  },
})

function App() {
  const { initTelegram } = useTelegram()

  useEffect(() => {
    initTelegram()
  }, [initTelegram])

  return (
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </I18nextProvider>
    </ErrorBoundary>
  )
}

export default App

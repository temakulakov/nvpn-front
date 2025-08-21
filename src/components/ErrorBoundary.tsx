import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Refresh as RefreshIcon } from '@mui/icons-material'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#242834',
            color: '#ffffff',
            padding: '20px',
            textAlign: 'center'
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#89E67E' }}>
            Что-то пошло не так
          </Typography>
          
          <Typography variant="body1" sx={{ marginBottom: 3, opacity: 0.8 }}>
            Произошла ошибка в приложении. Попробуйте перезагрузить страницу.
          </Typography>
          
          {this.state.error && (
            <Typography variant="caption" sx={{ marginBottom: 3, opacity: 0.6, fontFamily: 'monospace' }}>
              {this.state.error.message}
            </Typography>
          )}
          
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={this.handleRetry}
            sx={{
              backgroundColor: '#89E67E',
              '&:hover': {
                backgroundColor: '#7DD56E',
              }
            }}
          >
            Попробовать снова
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}

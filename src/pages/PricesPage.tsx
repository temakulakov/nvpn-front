import React, { useState, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import PaymentIcon from '@mui/icons-material/Payment'
import { TariffCard } from '../components/TariffCard'
import { DeviceSlider } from '../components/DeviceSlider'
import { useTelegramNavigation } from '../hooks/useTelegramNavigation'

interface Plan {
  name: string
  price: number
  months: number
  popular?: boolean
  profitable?: boolean
}

export const PricesPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [selectedDevices, setSelectedDevices] = useState(1)
  
  // Используем хук для управления навигацией Telegram
  useTelegramNavigation()

  // Планы подписок
  const plans: Plan[] = [
    { name: '1 месяц', price: 299, months: 1 },
    { name: '3 месяца', price: 799, months: 3 },
    { name: '6 месяцев', price: 1499, months: 6, popular: true },
    { name: '1 год', price: 2499, months: 12, profitable: true }
  ]

  // Устанавливаем 6 месяцев по умолчанию при первой загрузке
  useEffect(() => {
    const defaultPlan = plans.find(plan => plan.months === 6)
    if (defaultPlan) {
      setSelectedPlan(defaultPlan)
    }
  }, [])

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan)
  }

  const handleDevicesChange = (devices: number) => {
    setSelectedDevices(devices)
  }

  const calculatePrice = (plan: Plan, devices: number) => {
    return plan.price * devices
  }

  const handlePay = () => {
    if (selectedPlan) {
      console.log('Оплата:', selectedPlan.name, selectedDevices, 'устройств')
      // Здесь будет логика оплаты
    }
  }

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
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        boxSizing: 'border-box',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        overflow: 'hidden'
      }}
    >
      {/* Верхняя панель с градиентом */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(110, 180, 99, 0.3), rgba(137, 230, 126, 0.2), rgba(110, 180, 99, 0.3))',
          backdropFilter: 'blur(20px)',
          borderRadius: '25px',
          padding: '24px',
          marginBottom: '24px',
          border: '1px solid rgba(137, 230, 126, 0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto 24px',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: '16px',
            userSelect: 'none',
            fontSize: { xs: '1.2rem', sm: '1.5rem' }
          }}
        >
          Выберите количество дней и пользователей в подписку
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: 'white',
              fontWeight: '500',
              userSelect: 'none',
            }}
          >
            Количество устройств:
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#89E67E',
              fontWeight: 'bold',
              userSelect: 'none',
            }}
          >
            {selectedDevices}
          </Typography>
        </Box>

        <DeviceSlider
          min={1}
          max={4}
          value={selectedDevices}
          onChange={handleDevicesChange}
        />
      </Box>

      {/* Сетка с тарифами */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '15px',
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto 24px',
          flexShrink: 0,
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
      >
        {plans.map((plan) => (
          <Box key={plan.name}>
            <TariffCard
              plan={plan}
              isSelected={selectedPlan?.name === plan.name}
              onSelect={handlePlanSelect}
            />
          </Box>
        ))}
      </Box>

      {/* Нижняя панель с кнопкой оплаты */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(110, 180, 99, 0.3), rgba(137, 230, 126, 0.2), rgba(110, 180, 99, 0.3))',
          backdropFilter: 'blur(20px)',
          borderRadius: '25px',
          padding: '24px',
          border: '1px solid rgba(137, 230, 126, 0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto',
        }}
      >
        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<PaymentIcon />}
          onClick={handlePay}
          disabled={!selectedPlan}
          sx={{
            height: '56px',
            fontSize: '18px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #89E67E, #6EB463, #89E67E)',
            backgroundSize: '200% 200%',
            borderRadius: '15px',
            textTransform: 'none',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'linear-gradient(135deg, #6EB463, #89E67E, #6EB463)',
              backgroundSize: '200% 200%',
              boxShadow: '0 8px 25px rgba(137, 230, 126, 0.5), 0 0 30px rgba(137, 230, 126, 0.4)',
              animation: 'gradientShift 2s ease-in-out infinite',
            },
            '&:active': {
              transform: 'scale(0.98)',
              boxShadow: '0 4px 15px rgba(137, 230, 126, 0.3)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '0',
              height: '0',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.4)',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 0 4px rgba(137, 230, 126, 0.2)',
              transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 1,
            },
            '&:active::before': {
              width: '100px',
              height: '100px',
            }
          }}
        >
          {selectedPlan 
            ? `Оплатить • ${calculatePrice(selectedPlan, selectedDevices)} ₽`
            : 'Выберите тариф'
          }
        </Button>
      </Box>

      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes ripple {
            0% {
              width: 0;
              height: 0;
              opacity: 1;
            }
            100% {
              width: 400px;
              height: 400px;
              opacity: 0;
            }
          }
        `}
      </style>
    </Box>
  )
}

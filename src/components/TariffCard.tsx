import React from 'react'
import { Card, CardContent, Typography, Chip, Box } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'

interface Plan {
  name: string
  price: number
  months: number
  popular?: boolean
  profitable?: boolean
}

interface TariffCardProps {
  plan: Plan
  isSelected: boolean
  onSelect: (plan: Plan) => void
}

export const TariffCard: React.FC<TariffCardProps> = ({ plan, isSelected, onSelect }) => {
  const handleClick = (event: React.MouseEvent) => {
    onSelect(plan)
    
    // Создаем эффект волны для кнопки от места клика
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    // Создаем новый элемент для эффекта волны
    const ripple = document.createElement('div')
    ripple.style.cssText = `
      position: absolute;
      top: ${y}px;
      left: ${x}px;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 10;
      animation: ripple 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    `
    
    target.appendChild(ripple)
    
    // Убираем элемент после завершения анимации
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple)
      }
    }, 800)
  }

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1, ease: "easeOut" }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card
        component={motion.div}
        sx={{
          borderRadius: '20px',
          background: isSelected 
            ? 'linear-gradient(135deg, rgba(110, 180, 99, 0.7), rgba(137, 230, 126, 0.5), rgba(110, 180, 99, 0.6))'
            : 'linear-gradient(135deg, rgba(110, 180, 99, 0.4), rgba(137, 230, 126, 0.2))',
          backdropFilter: 'blur(15px)',
          border: `1px solid ${isSelected ? '#89E67E' : 'rgba(137, 230, 126, 0.3)'}`,
          boxShadow: isSelected 
            ? '0 0 25px rgba(137, 230, 126, 0.6)'
            : '0 8px 32px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          height: '180px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={handleClick}
        whileHover={{
          boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 0 30px rgba(137, 230, 126, 0.4)',
          borderColor: '#89E67E',
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        whileTap={{
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          transition: { duration: 0.1, ease: "easeOut" }
        }}
      >
        {/* Chip "Популярный" - позиционируем по центру между названием и ценой */}
        <AnimatePresence>
          {plan.name === '6 месяцев' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 3,
              }}
            >
              <Chip
                label="Популярный"
                size="small"
                sx={{
                  backgroundColor: '#FF6B35',
                  color: 'white',
                  fontSize: '11px',
                  height: '20px',
                  padding: '0 6px',
                  fontWeight: 'bold',
                  '& .MuiChip-label': {
                    padding: '0 6px',
                  },
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <CardContent
          component={motion.div}
          sx={{
            padding: '16px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 2,
            minHeight: '148px',
            boxSizing: 'border-box',
          }}
        >
          {/* Период подписки - верх */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            style={{
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '18px',
                height: '22px',
                lineHeight: '22px',
                overflow: 'hidden',
              }}
            >
              {plan.name}
            </Typography>
          </motion.div>

          {/* Основная цена - центр */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              minHeight: '60px',
              height: '60px',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '28px',
                lineHeight: '1',
                height: '28px',
                overflow: 'hidden',
              }}
            >
              {plan.price} ₽
            </Typography>
            
            {/* Цена в месяц для длительных планов */}
            <AnimatePresence>
              {plan.name !== '1 месяц' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    height: '18px',
                    marginTop: '4px',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '14px',
                      height: '18px',
                      lineHeight: '18px',
                      overflow: 'hidden',
                    }}
                  >
                    {Math.round(plan.price / (plan.name === '1 год' ? 12 : 
                      plan.name === '6 месяцев' ? 6 : 3))}₽ в месяц
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </CardContent>

        {/* Ripple эффект с Framer Motion */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(137, 230, 126, 0.1) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

import React, { useState, useRef, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { Devices as DevicesIcon } from '@mui/icons-material'

interface DeviceSliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
}

export const DeviceSlider: React.FC<DeviceSliderProps> = ({
  value,
  onChange,
  min = 1,
  max = 4,
  step = 1
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragType, setDragType] = useState<'slider' | 'mark' | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartValue, setDragStartValue] = useState(0)

  const handleSliderClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return
    
    const rect = event.currentTarget.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const width = rect.width
    
    // Вычисляем значение на основе позиции клика
    const percentage = Math.max(0, Math.min(1, clickX / width))
    const newValue = Math.round(min + (max - min) * percentage)
    
    // Ограничиваем значение в пределах min-max
    const clampedValue = Math.max(min, Math.min(max, newValue))
    onChange(clampedValue)
  }

  const handleMouseDown = (event: React.MouseEvent, type: 'slider' | 'mark') => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(true)
    setDragType(type)
    setDragStartX(event.clientX)
    setDragStartValue(value)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return
    
    const rect = sliderRef.current.getBoundingClientRect()
    const deltaX = event.clientX - dragStartX
    const width = rect.width
    
    // Вычисляем изменение в процентах
    const deltaPercentage = deltaX / width
    const deltaValue = Math.round((max - min) * deltaPercentage)
    const newValue = Math.max(min, Math.min(max, dragStartValue + deltaValue))
    
    onChange(newValue)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDragType(null)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragStartX, dragStartValue])

  // Touch events для мобильных устройств
  const handleTouchStart = (event: React.TouchEvent, type: 'slider' | 'mark') => {
    const touch = event.touches[0]
    setIsDragging(true)
    setDragType(type)
    setDragStartX(touch.clientX)
    setDragStartValue(value)
  }

  const handleTouchMove = (event: TouchEvent) => {
    if (!isDragging || !sliderRef.current) return
    
    const touch = event.touches[0]
    const rect = sliderRef.current.getBoundingClientRect()
    const deltaX = touch.clientX - dragStartX
    const width = rect.width
    
    // Вычисляем изменение в процентах
    const deltaPercentage = deltaX / width
    const deltaValue = Math.round((max - min) * deltaPercentage)
    const newValue = Math.max(min, Math.min(max, dragStartValue + deltaValue))
    
    onChange(newValue)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setDragType(null)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
      
      return () => {
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, dragStartX, dragStartValue])

  const getDeviceText = (count: number) => {
    if (count === 1) return 'устройство'
    if (count >= 2 && count <= 4) return 'устройства'
    return 'устройств'
  }

  // Вычисляем позицию ползунка в процентах
  const sliderPosition = ((value - min) / (max - min)) * 100

  // Ограничиваем позицию ползунка, чтобы он не выходил за пределы
  const clampedSliderPosition = Math.max(0, Math.min(100, sliderPosition))

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* Основная дорожка слайдера */}
      <Box
        ref={sliderRef}
        sx={{
          width: '100%',
          height: '23px',
          backgroundColor: '#89E67E', // Основной цвет дорожки
          borderRadius: '29px',
          position: 'relative',
          cursor: 'pointer',
          backdropFilter: 'blur(2.3px)',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
        }}
        onClick={handleSliderClick}
      >
        {/* Заполненная часть дорожки с градиентом */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: `${clampedSliderPosition}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #242834 0%, #242834 50%, #242834 100%)', // Темный и менее заметный градиент
            borderRadius: '29px',
            transition: isDragging ? 'none' : 'width 0.3s ease',
            backdropFilter: 'blur(2.3px)',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
          }}
        />
        
        {/* Ползунок */}
        <Box
          sx={{
            position: 'absolute',
            left: `calc(${clampedSliderPosition}% - 16px)`, // Уменьшил с 19px до 16px
            top: '50%', // Центрируем по вертикали
            transform: 'translateY(-50%)', // Центрируем по вертикали
            width: '32px', // Уменьшил с 38px до 32px
            height: '32px', // Уменьшил с 38px до 32px
            backgroundColor: '#2B5072', // Цвет ползунка
            borderRadius: '29px',
            border: '2px solid #ffffff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3), 0 0 0 4px rgba(137, 230, 126, 0.2)',
            cursor: isDragging ? 'grabbing' : 'grab',
            backdropFilter: 'blur(2.3px)',
            transition: isDragging ? 'none' : 'all 0.2s ease',
            zIndex: 3, // Увеличил z-index чтобы перекрывать метки
            userSelect: 'none',
            '&:hover': {
              transform: 'translateY(-50%) scale(1.05)',
              boxShadow: '0 6px 16px rgba(0,0,0,0.4), 0 0 0 6px rgba(137, 230, 126, 0.3)',
            },
            '&:active': {
              transform: 'translateY(-50%) scale(0.98)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 0 2px rgba(137, 230, 126, 0.2)',
            },
          }}
          onMouseDown={(e) => handleMouseDown(e, 'slider')}
          onTouchStart={(e) => handleTouchStart(e, 'slider')}
        />
        
        {/* Метки на слайдере */}
        {Array.from({ length: max - min + 1 }, (_, index) => {
          const markValue = min + index
          const markPosition = (index / (max - min)) * 100
          
          return (
            <Box
              key={markValue}
              sx={{
                position: 'absolute',
                left: markPosition === 0 ? '2px' : markPosition === 100 ? 'calc(100% - 21px)' : `calc(${markPosition}% - 9.5px)`,
                top: '50%', // Центрируем по вертикали
                transform: 'translateY(-50%)', // Центрируем по вертикали
                width: '19px',
                height: '19px',
                backgroundColor: markValue <= value ? '#89E67E' : '#406A2B', // Активная/неактивная метка
                borderRadius: '9.5px', // Всегда круглые внутри
                backdropFilter: 'blur(2.3px)',
                transition: 'background-color 0.3s ease',
                zIndex: 1,
                cursor: 'pointer',
                // Красивое обтекание углами для боковых меток (только внешняя форма)
                ...(markPosition === 0 && {
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  borderRadius: '19px', // Левые углы круглые, правые обычные
                }),
                ...(markPosition === 100 && {
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  borderRadius: '19px', // Правые углы круглые, левые обычные
                }),
                '&:hover': {
                  backgroundColor: markValue <= value ? '#7DD56E' : '#5A8A3A',
                  transform: 'translateY(-50%) scale(1.1)',
                },
                '&:active': {
                  transform: 'translateY(-50%) scale(0.95)',
                },
              }}
              onMouseDown={(e) => handleMouseDown(e, 'mark')}
              onTouchStart={(e) => handleTouchStart(e, 'mark')}
              // Убрал onMouseEnter - теперь ползунок не перемещается автоматически при наведении
            />
          )
        })}
      </Box>

      {/* Информация о выбранных устройствах */}
      <Box
        sx={{
          textAlign: 'center',
          padding: '12px',
          background: 'rgba(137, 230, 126, 0.1)',
          borderRadius: '15px',
          border: '1px solid rgba(137, 230, 126, 0.3)',
          marginTop: '20px'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}
        >
          <DevicesIcon sx={{ color: '#89E67E' }} />
          Количество устройств: {value} {getDeviceText(value)}
        </Typography>
      </Box>
    </Box>
  )
}

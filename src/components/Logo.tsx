import React from 'react'

interface LogoProps {
  width?: number
  height?: number
  color?: string
}

export const Logo: React.FC<LogoProps> = ({ 
  width = 120, 
  height = 120, 
  color = '#ffffff' 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Основной круг */}
      <circle
        cx="60"
        cy="60"
        r="55"
        fill="none"
        stroke={color}
        strokeWidth="4"
      />
      
      {/* Буква V */}
      <path
        d="M35 25L60 75L85 25"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Буква P */}
      <path
        d="M25 35V85M25 35H45C50 35 55 40 55 45C55 50 50 55 45 55H25"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Буква N */}
      <path
        d="M65 35V85M65 35L95 85M95 35V85"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Декоративные точки */}
      <circle cx="30" cy="20" r="3" fill={color} />
      <circle cx="90" cy="20" r="3" fill={color} />
      <circle cx="30" cy="100" r="3" fill={color} />
      <circle cx="90" cy="100" r="3" fill={color} />
    </svg>
  )
}

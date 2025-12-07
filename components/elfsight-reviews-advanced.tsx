'use client'

import React from 'react'

interface ElfsightReviewsAdvancedProps {
  className?: string
  style?: React.CSSProperties
  lazy?: boolean
  widgetId?: string
  theme?: 'light' | 'dark' | 'custom'
  borderRadius?: number
  showShadow?: boolean
  customColors?: {
    primary?: string
    background?: string
    text?: string
    border?: string
  }
}

export default function ElfsightReviewsAdvanced({ 
  className = '', 
  style = {},
  lazy = true,
  widgetId = '489a10d4-89af-44b5-8dd7-10f1b299aac8',
  theme = 'light',
  borderRadius = 12,
  showShadow = true,
  customColors = {}
}: ElfsightReviewsAdvancedProps) {
  
  const {
  primary = '#e2943a',
    background = '#ffffff',
    text = '#333333',
    border = '#e5e7eb'
  } = customColors

  const defaultStyle: React.CSSProperties = {
    maxWidth: '100%',
    margin: '0 auto',
    ...style
  }

  const containerClass = `elfsight-reviews-advanced ${theme}-theme`

  return (
    <div className={containerClass}>
      <div 
        className={`elfsight-app-${widgetId} ${className}`}
        style={defaultStyle}
        {...(lazy && { 'data-elfsight-app-lazy': '' })}
      />
      
      <style jsx>{`
        .elfsight-reviews-advanced {
          width: 100%;
          position: relative;
        }
        
        /* Tema claro */
        .light-theme :global(.elfsight-app) {
          background-color: ${background};
          border-radius: ${borderRadius}px;
          ${showShadow ? `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);` : ''}
          border: 1px solid ${border};
          overflow: hidden;
        }
        
        /* Tema oscuro */
        .dark-theme :global(.elfsight-app) {
          background-color: #1f2937;
          border-radius: ${borderRadius}px;
          ${showShadow ? `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);` : ''}
          border: 1px solid #374151;
          overflow: hidden;
        }
        
        /* Personalización de colores */
        .elfsight-reviews-advanced :global(.elfsight-app .eapps-widget) {
          font-family: inherit;
          color: ${text};
        }
        
        /* Personalización de elementos específicos */
        .elfsight-reviews-advanced :global(.elfsight-app .eapps-reviews-stars) {
          color: ${primary};
        }
        
        .elfsight-reviews-advanced :global(.elfsight-app .eapps-reviews-item) {
          border-bottom: 1px solid ${border};
          padding: 16px;
        }
        
        .elfsight-reviews-advanced :global(.elfsight-app .eapps-reviews-item:last-child) {
          border-bottom: none;
        }
        
        /* Personalización de botones y enlaces */
        .elfsight-reviews-advanced :global(.elfsight-app a),
        .elfsight-reviews-advanced :global(.elfsight-app button) {
          color: ${primary};
          transition: all 0.2s ease;
        }
        
        .elfsight-reviews-advanced :global(.elfsight-app a:hover),
        .elfsight-reviews-advanced :global(.elfsight-app button:hover) {
          opacity: 0.8;
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          .elfsight-reviews-advanced :global(.elfsight-app) {
            border-radius: ${Math.max(borderRadius - 4, 4)}px;
            margin: 0 -16px;
          }
          
          .elfsight-reviews-advanced :global(.elfsight-app .eapps-reviews-item) {
            padding: 12px 16px;
          }
        }
        
        /* Animaciones de carga */
        .elfsight-reviews-advanced :global(.elfsight-app) {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Loading state */
        .elfsight-reviews-advanced::before {
          content: '';
          display: block;
          width: 100%;
          height: 200px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: ${borderRadius}px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }
        
        .elfsight-reviews-advanced :global(.elfsight-app[data-loaded]) + style + ::before {
          display: none;
        }
        
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  )
}
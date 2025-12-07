'use client'

import { Component, ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
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

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Solo log en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught:', error, errorInfo)
    }
    // En producción, aquí podrías enviar a un servicio de logging como Sentry
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <svg 
                className="mx-auto h-24 w-24 text-orange-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Oups! Quelque chose s&apos;est mal passé
            </h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Nous sommes désolés pour le désagrément. Une erreur inattendue s&apos;est produite.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => window.location.reload()}
                variant="default"
                className="bg-orange-500 hover:bg-orange-600"
              >
                Recharger la page
              </Button>
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline"
              >
                Retour à l&apos;accueil
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <p className="text-xs font-mono text-red-800 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}


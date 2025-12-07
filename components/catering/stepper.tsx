'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepperProps {
  currentStep: number
  totalSteps: number
  className?: string
}

const stepLabels = [
  'Contact',
  'Menu',
  'Entrées',
  'Viandes',
  'Desserts',
  'Services',
  'Résumé'
]

export function Stepper({ currentStep, totalSteps, className }: StepperProps) {
  return (
    <div className={cn('w-full max-w-4xl mx-auto px-4', className)}>
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isUpcoming = stepNumber > currentStep
          
          return (
            <div key={stepNumber} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <motion.div
                  className={cn(
                    'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium border-2 transition-colors',
                    {
                      'bg-orange-500 border-orange-500 text-white': isCompleted,
                      'bg-orange-600 border-orange-600 text-white ring-4 ring-orange-200': isCurrent,
                      'bg-gray-100 border-gray-300 text-gray-500': isUpcoming
                    }
                  )}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    stepNumber
                  )}
                </motion.div>
                
                {/* Step Label */}
                <span className={cn(
                  'text-xs mt-1 sm:mt-2 font-medium hidden sm:block',
                  {
                    'text-orange-600': isCompleted || isCurrent,
                    'text-gray-500': isUpcoming
                  }
                )}>
                  {stepLabels[index]}
                </span>
              </div>
              
              {/* Connector Line */}
              {index < totalSteps - 1 && (
                <div className="flex-1 mx-1 sm:mx-2 md:mx-4">
                  <div className="relative">
                    <div className="h-0.5 bg-gray-300 w-full" />
                    <motion.div
                      className="h-0.5 bg-orange-500 absolute top-0 left-0"
                      initial={{ width: '0%' }}
                      animate={{ 
                        width: stepNumber < currentStep ? '100%' : '0%' 
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-4 sm:mb-6">
        <motion.div
          className="bg-orange-500 h-1.5 sm:h-2 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.25 }}
        />
      </div>
      
      {/* Step Counter */}
      <div className="text-center text-xs sm:text-sm text-gray-600">
        Étape {currentStep} sur {totalSteps}
      </div>
    </div>
  )
}
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCateringStore } from '@/lib/catering-store'
import { Stepper } from './stepper'
import { StepContact } from './steps/step-contact'
import { StepMenu } from './steps/step-menu'
import { StepEntrees } from './steps/step-entrees'
import { StepViandes } from './steps/step-viandes'
import { StepDesserts } from './steps/step-desserts'
import { StepExtras } from './steps/step-extras'
import { StepReview } from './steps/step-review'
import { ChevronLeft, ChevronRight, Send } from 'lucide-react'

const stepTitles = [
  'Informations de contact',
  'Type de menu',
  'Sélection des entrées',
  'Sélection des viandes',
  'Sélection du dessert',
  'Services supplémentaires',
  'Résumé de votre commande'
]

const stepComponents = {
  1: StepContact,
  2: StepMenu,
  3: StepEntrees,
  4: StepViandes,
  5: StepDesserts,
  6: StepExtras,
  7: StepReview
}

export function CateringForm() {
  const {
    currentStep,
    canGoNext,
    canGoPrevious,
    nextStep,
    previousStep,
    isStepValid
  } = useCateringStore()

  const CurrentStepComponent = stepComponents[currentStep as keyof typeof stepComponents]
  const isLastStep = currentStep === 7
  const canProceed = isStepValid(currentStep)

  const handleSubmit = () => {
    // Here you would typically submit the form data
    if (process.env.NODE_ENV === 'development') {
      console.log('Form submitted!')
    }
    // You could add a success message or redirect
    // TODO: Implement actual form submission to backend/email service
  }

  const handleNextStep = () => {
    // GTM Tracking
    const stepEvents: Record<number, string> = {
      1: 'click_contact',
      2: 'click_menu',
      3: 'click_entrees',
      4: 'click_viandes',
      5: 'click_dessert',
      6: 'click_services'
    }

    const eventName = stepEvents[currentStep]
    if (eventName && typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: eventName })
    }

    nextStep()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-transparent bg-clip-text  bg-[#e2943a] mb-3">
              Asado Sur-Mesure
            </h1>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl font-medium">
              Configurez votre expérience culinaire argentine
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-orange-200">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Simple et rapide</span>
            </div>
          </motion.div>
        </div>

        {/* Stepper */}
        <Stepper currentStep={currentStep} totalSteps={7} className="mb-6 sm:mb-8" />

        {/* Form Card */}
        <Card className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden backdrop-blur-sm bg-white/95">
          <CardHeader className="text-white py-6 bg-[#e2943a]">
            <CardTitle className="text-lg sm:text-xl md:text-2xl text-center font-bold">
              {stepTitles[currentStep - 1]}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 md:p-8 bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[300px] sm:min-h-[400px]"
              >
                <CurrentStepComponent />
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 gap-4 sm:gap-0">
          <Button
            variant="outline"
            onClick={previousStep}
            disabled={!canGoPrevious()}
            className="flex items-center gap-2 w-full sm:w-auto h-11 px-6 text-base font-medium border-2 border-gray-300 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            Précédent
          </Button>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-center">
            {!canProceed && currentStep < 7 && (
              <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-red-600 font-medium">
                  ⚠ Veuillez compléter tous les champs requis
                </span>
              </div>
            )}
          </div>


          {!isLastStep && (
            <Button
              onClick={handleNextStep}
              disabled={!canGoNext()}
              className="flex items-center gap-2 bg-[#e2943a] hover:bg-[#d18634] text-white shadow-md hover:shadow-lg w-full sm:w-auto h-11 px-6 text-base font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[rgba(226,148,58,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="text-center mt-4 sm:mt-6">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                Progression:
              </span>
            </div>
            <span className="text-sm font-bold text-orange-600">
              {Math.round(((currentStep - 1) / 6) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
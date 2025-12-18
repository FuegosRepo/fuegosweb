'use client'

import { motion } from 'framer-motion'
import { OptimizedImage } from '../../ui/optimized-image'
import { useCateringStore } from '@/lib/catering-store'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useProducts } from '@/hooks/useProducts'

export function StepDesserts() {
  const { products: desserts, loading } = useProducts('desserts')
  const selectedDessert = useCateringStore((s) => s.formData.dessert)
  const updateDessert = useCateringStore((s) => s.updateDessert)

  const handleDessertSelect = (dessertId: string) => {
    // Now stores UUID instead of string ID
    updateDessert(selectedDessert === dessertId ? null : dessertId)
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        <span className="ml-3 text-gray-600">Chargement des desserts...</span>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Choisissez votre dessert
        </h3>
        <p className="text-gray-600 mb-4">
          Sélectionnez le dessert qui clôturera parfaitement votre repas
        </p>

        {/* Selection Indicator */}
        {selectedDessert && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-orange-800 font-medium">
              Dessert sélectionné
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {desserts.map((dessert) => {
          const isSelected = selectedDessert === dessert.id

          return (
            <motion.div
              key={dessert.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className={cn(
                  'cursor-pointer transition-all duration-300 hover:shadow-xl h-full',
                  isSelected
                    ? 'ring-2 ring-orange-500 shadow-xl bg-orange-50'
                    : 'hover:shadow-lg border-gray-200 hover:border-orange-300'
                )}
                onClick={() => handleDessertSelect(dessert.id)}
              >
                <div className="relative overflow-hidden">
                  {/* Image or Gradient Background */}
                  <div className="h-56 bg-gradient-to-br from-orange-100 to-amber-100 relative">
                    {dessert.image_url ? (
                      <OptimizedImage
                        src={dessert.image_url}
                        alt={dessert.name}
                        fill
                        imageClassName="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={80}
                        placeholder="empty"
                        showLoader={false}
                      />
                    ) : (
                      // No image - just show gradient with centered title
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <h4 className="text-orange-800 font-bold text-xl text-center leading-tight">
                          {dessert.name}
                        </h4>
                      </div>
                    )}

                    {/* Selection Indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute bottom-4 right-4"
                      >
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                    )}

                    {/* Title Overlay - only if image exists */}
                    {dessert.image_url && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <h4 className="text-white font-bold text-lg leading-tight">
                          {dessert.name}
                        </h4>
                        {dessert.subtitle && (
                          <p className="text-orange-200 text-sm font-medium">
                            {dessert.subtitle}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Description - only show for desserts with images */}
                    {dessert.image_url && (
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {dessert.description || 'Délicieux dessert préparé au brasero'}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Selection Summary */}
      {selectedDessert && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-6 bg-orange-50 rounded-lg border border-orange-200 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Check className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-orange-800">
              Dessert sélectionné
            </h4>
          </div>
          <p className="text-orange-700 font-medium">
            {desserts.find(d => d.id === selectedDessert)?.name || 'Dessert sélectionné'}
          </p>
          <p className="text-green-600 text-sm mt-2">
            ✓ Parfait ! Vous pouvez passer à l&apos;étape suivante.
          </p>
        </motion.div>
      )}

      {/* Help Text */}
      <div className="text-center text-sm text-gray-500 max-w-2xl mx-auto">
        Nos desserts sont préparés avec des ingrédients de qualité et peuvent être adaptés selon vos préférences alimentaires
      </div>
    </motion.div>
  )
}
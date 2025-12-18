'use client'

import { motion } from 'framer-motion'
import { OptimizedImage } from '../../ui/optimized-image'
import { useCateringStore } from '@/lib/catering-store'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Plus, Minus, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useProducts } from '@/hooks/useProducts'

export function StepEntrees() {
  const { products: entreeOptions, loading } = useProducts('entrees')
  const selectedEntrees = useCateringStore((s) => s.formData.entrees)
  const updateEntrees = useCateringStore((s) => s.updateEntrees)
  const maxSelections = 2
  const canSelectMore = selectedEntrees.length < maxSelections

  const handleEntreeToggle = (entreeId: string) => {
    const isSelected = selectedEntrees.includes(entreeId)

    if (isSelected) {
      // Remove from selection
      updateEntrees(selectedEntrees.filter(id => id !== entreeId))
    } else if (canSelectMore) {
      // Add to selection (now storing UUID instead of string ID)
      updateEntrees([...selectedEntrees, entreeId])
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        <span className="ml-3 text-gray-600">Chargement des entrées...</span>
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
          Sélectionnez vos entrées
        </h3>
        <p className="text-gray-600 mb-4">
          Choisissez exactement 2 entrées pour votre menu
        </p>

        {/* Selection Counter */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
          <span className="text-orange-800 font-medium">
            {selectedEntrees.length} / {maxSelections} sélectionnées
          </span>
          {selectedEntrees.length === maxSelections && (
            <Check className="w-4 h-4 text-green-600" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entreeOptions.map((entree) => {
          const isSelected = selectedEntrees.includes(entree.id)
          const canSelect = canSelectMore || isSelected

          return (
            <motion.div
              key={entree.id}
              whileHover={{ scale: canSelect ? 1.02 : 1 }}
              whileTap={{ scale: canSelect ? 0.98 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className={cn(
                  'cursor-pointer transition-all duration-300 h-full rounded-xl border border-gray-200 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                  isSelected
                    ? 'ring-2 ring-orange-500 bg-orange-50'
                    : canSelect
                      ? 'hover:border-orange-300'
                      : 'opacity-60 cursor-not-allowed',
                  !canSelect && !isSelected && 'grayscale'
                )}
                onClick={() => canSelect && handleEntreeToggle(entree.id)}
              >
                <div className="relative overflow-hidden rounded-xl">
                  {/* Image */}
                  <div className="h-40 bg-gradient-to-br from-orange-100 to-amber-100 relative">
                    <OptimizedImage
                      src={entree.image_url || '/img-formulario/placeholder.webp'}
                      alt={entree.name}
                      fill
                      imageClassName="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={80}
                      placeholder="empty"
                      showLoader={false}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/10" />

                    {/* Selection Indicator */}
                    <div className="absolute top-3 right-3">
                      {isSelected ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
                        >
                          <Check className="w-5 h-5 text-white" />
                        </motion.div>
                      ) : canSelect ? (
                        <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                          <Plus className="w-5 h-5 text-orange-500" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-400 bg-opacity-90 rounded-full flex items-center justify-center">
                          <Minus className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Title and Subtitle */}
                    <div>
                      <h4 className={cn(
                        'font-bold text-lg leading-tight transition-colors',
                        isSelected ? 'text-orange-600' : 'text-gray-900'
                      )}>
                        {entree.name}
                      </h4>
                      <p className="text-sm text-orange-600 font-medium">
                        {entree.subtitle || entree.origin || ''}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-base leading-relaxed">
                      {entree.description || ''}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Selection Summary */}
      {selectedEntrees.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-orange-50 rounded-lg border border-orange-200"
        >
          <h4 className="font-semibold text-orange-800 mb-2">
            Entrées sélectionnées:
          </h4>
          <div className="space-y-1">
            {selectedEntrees.map((entreeId) => {
              const entree = entreeOptions.find(e => e.id === entreeId)
              return (
                <div key={entreeId} className="flex items-center text-orange-700">
                  <Check className="w-4 h-4 mr-2" />
                  <span className="font-medium">{entree?.name}</span>
                </div>
              )
            })}
          </div>

          {selectedEntrees.length < maxSelections && (
            <p className="text-orange-600 text-sm mt-2">
              Sélectionnez encore {maxSelections - selectedEntrees.length} entrée(s)
            </p>
          )}

          {selectedEntrees.length === maxSelections && (
            <p className="text-green-600 text-sm mt-2 font-medium">
              ✓ Sélection complète ! Vous pouvez passer à l&apos;étape suivante.
            </p>
          )}
        </motion.div>
      )}

      {/* Help Text */}
      <div className="text-center text-sm text-gray-500">
        Cliquez sur les cartes pour sélectionner vos entrées préférées
      </div>
    </motion.div>
  )
}
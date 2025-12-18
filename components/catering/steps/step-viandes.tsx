'use client'

import { motion } from 'framer-motion'
import { OptimizedImage } from '../../ui/optimized-image'
import { useCateringStore } from '@/lib/catering-store'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Plus, Minus, Crown, Star, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import { useProducts, type Product } from '@/hooks/useProducts'

export function StepViandes() {
  const { products: classiqueProducts, loading: loadingClassique } = useProducts('viandes', 'classique')
  const { products: premiumProducts, loading: loadingPremium } = useProducts('viandes', 'premium')
  const selectedViandes = useCateringStore((s) => s.formData.viandes)
  const updateViandes = useCateringStore((s) => s.updateViandes)
  const maxSelections = 3
  const minSelections = 1
  const canSelectMore = selectedViandes.length < maxSelections

  const loading = loadingClassique || loadingPremium

  const handleViandeToggle = (viandeId: string) => {
    const isSelected = selectedViandes.includes(viandeId)

    if (isSelected) {
      // Remove from selection
      updateViandes(selectedViandes.filter(id => id !== viandeId))
    } else if (canSelectMore) {
      // Add to selection (now storing UUID instead of string ID)
      updateViandes([...selectedViandes, viandeId])
    }
  }

  const renderViandeSection = (title: string, viandes: Product[], type: 'classiques' | 'premium', icon: LucideIcon) => {
    const Icon = icon

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center',
            type === 'premium' ? 'bg-amber-100 text-amber-600' : 'bg-orange-100 text-orange-600'
          )}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600">
              {type === 'premium' ? 'Sélection d\'exception' : 'Morceaux traditionnels'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {viandes.map((viande) => {
            const isSelected = selectedViandes.includes(viande.id)
            const canSelect = canSelectMore || isSelected

            return (
              <motion.div
                key={viande.id}
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
                  onClick={() => canSelect && handleViandeToggle(viande.id)}
                >
                  <div className="relative overflow-hidden rounded-xl">
                    {/* Image */}
                    <div className="h-32 bg-gradient-to-br from-orange-100 to-amber-100 relative">
                      <OptimizedImage
                        src={viande.image_url || '/img-formulario/placeholder.webp'}
                        alt={viande.name}
                        fill
                        imageClassName="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={80}
                        placeholder="empty"
                        showLoader={false}
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/10" />

                      {/* Premium Badge */}
                      {type === 'premium' && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-xs">
                            <Crown className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        </div>
                      )}

                      {/* Origin Badge */}
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="secondary" className="text-xs bg-white bg-opacity-90">
                          {viande.origin || ''}
                        </Badge>
                      </div>

                      {/* Selection Indicator */}
                      <div className="absolute top-2 right-2">
                        {isSelected ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center"
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        ) : canSelect ? (
                          <div className="w-7 h-7 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                            <Plus className="w-4 h-4 text-orange-500" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 bg-gray-400 bg-opacity-90 rounded-full flex items-center justify-center">
                            <Minus className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {/* Title */}
                      <h5 className={cn(
                        'font-bold text-base leading-tight transition-colors',
                        isSelected ? 'text-orange-600' : 'text-gray-900'
                      )}>
                        {viande.name}
                      </h5>

                      {/* Description */}
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {viande.description || ''}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        <span className="ml-3 text-gray-600">Chargement des viandes...</span>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Sélectionnez vos viandes
        </h3>
        <p className="text-gray-600 mb-4">
          Choisissez entre 1 et 3 viandes pour votre asado
        </p>

        {/* Selection Counter */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
          <span className="text-orange-800 font-medium">
            {selectedViandes.length} / {maxSelections} sélectionnées
          </span>
          {selectedViandes.length >= minSelections && (
            <Check className="w-4 h-4 text-green-600" />
          )}
        </div>
      </div>

      {/* Premium Section */}
      {renderViandeSection('Morceaux Premium', premiumProducts, 'premium', Crown)}

      {/* Classiques Section */}
      {renderViandeSection('Morceaux Classiques', classiqueProducts, 'classiques', Star)}

      {/* Selection Summary */}
      {selectedViandes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-orange-50 rounded-lg border border-orange-200"
        >
          <h4 className="font-semibold text-orange-800 mb-2">
            Viandes sélectionnées:
          </h4>
          <div className="space-y-1">
            {selectedViandes.map((viandeId) => {
              // Find product in both arrays
              const viande = classiqueProducts.find(v => v.id === viandeId)
                || premiumProducts.find(v => v.id === viandeId)
              const isPremium = premiumProducts.some(v => v.id === viandeId)

              return (
                <div key={viandeId} className="flex items-center text-orange-700">
                  <Check className="w-4 h-4 mr-2" />
                  <span className="font-medium">{viande?.name}</span>
                  {isPremium && (
                    <Crown className="w-3 h-3 ml-2 text-amber-500" />
                  )}
                  <span className="text-xs text-gray-600 ml-2">({viande?.origin})</span>
                </div>
              )
            })}
          </div>

          {selectedViandes.length < minSelections && (
            <p className="text-orange-600 text-sm mt-2">
              Sélectionnez au moins {minSelections} viande
            </p>
          )}

          {selectedViandes.length >= minSelections && (
            <p className="text-green-600 text-sm mt-2 font-medium">
              ✓ Sélection valide ! Vous pouvez passer à l&apos;étape suivante.
            </p>
          )}
        </motion.div>
      )}

      {/* Help Text */}
      <div className="text-center text-sm text-gray-500">
        Les morceaux premium offrent une expérience gastronomique d&apos;exception
      </div>
    </motion.div>
  )
}
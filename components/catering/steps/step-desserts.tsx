'use client'

import { motion } from 'framer-motion'
import { OptimizedImage } from '../../ui/optimized-image'
import { useCateringStore } from '@/lib/catering-store'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Flame, IceCream } from 'lucide-react'
import { cn } from '@/lib/utils'

const dessertOptions = [
  {
    id: 'fruits_grilles',
    name: 'Fruits grillés',
    subtitle: 'Spectacle culinaire',
    description: 'Fruits de saison grillés au brasero et flambés au cognac, accompagnés de glace vanille artisanale, noix concassées et spéculoos émiettés',
    image: '/img-formulario/postre/fuits-grilles.webp',
    features: [
      'Flambé devant vos invités',
      'Fruits de saison',
      'Glace vanille artisanale',
      'Noix et spéculoos'
    ],
    icon: IceCream,
    popular: false
  },
  {
    id: 'panqueques',
    name: 'Panqueques con dulce de leche fondu au brasero',
    subtitle: 'Tradition argentine',
    description: 'Panqueques argentins traditionnels avec dulce de leche fondu au brasero, glace vanille et fruits de saison frais',
    image: '/img-formulario/postre/panqueques.webp',
    features: [
      'Recette traditionnelle argentine',
      'Dulce de leche authentique',
      'Préparation au brasero',
      'Fruits frais de saison'
    ],
    icon: Flame,
    popular: false
  }
]

export function StepDesserts() {
  const selectedDessert = useCateringStore((s) => s.formData.dessert)
  const updateDessert = useCateringStore((s) => s.updateDessert)

  const handleDessertSelect = (dessertId: string) => {
    updateDessert(dessertId)
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
        {dessertOptions.map((dessert) => {
          const Icon = dessert.icon
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
                  {/* Image */}
                  <div className="h-56 bg-gradient-to-br from-orange-100 to-amber-100 relative">
                    <OptimizedImage
                      src={dessert.image}
                      alt={dessert.name}
                      fill
                      imageClassName="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={80}
                      placeholder="empty"
                      showLoader={false}
                    />

                    {/* Overlay - Temporarily removed to test image loading */}
                    {/* <div className="absolute inset-0 bg-black bg-opacity-30" /> */}

                    {/* Icon */}
                    <div className="absolute top-4 left-4">
                      <div className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center',
                        isSelected ? 'bg-orange-500 text-white' : 'bg-white text-orange-500'
                      )}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Popular Badge */}
                    {dessert.popular && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-red-500 hover:bg-red-600 text-white">
                          Populaire
                        </Badge>
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

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <h4 className="text-white font-bold text-lg leading-tight">
                        {dessert.name}
                      </h4>
                      <p className="text-orange-200 text-sm font-medium">
                        {dessert.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {dessert.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 text-sm">
                        Inclus dans ce dessert:
                      </h5>
                      <div className="grid grid-cols-1 gap-2">
                        {dessert.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <div className={cn(
                              'w-1.5 h-1.5 rounded-full mr-3',
                              isSelected ? 'bg-orange-500' : 'bg-gray-400'
                            )} />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Special Note */}
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-start gap-2">
                        <Icon className={cn(
                          'w-4 h-4 mt-0.5 flex-shrink-0',
                          isSelected ? 'text-orange-500' : 'text-gray-400'
                        )} />
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {dessert.id === 'fruits-flambes'
                            ? 'Spectacle culinaire inclus : flambé réalisé devant vos invités pour une expérience mémorable'
                            : 'Préparation traditionnelle argentine avec dulce de leche authentique importé'
                          }
                        </p>
                      </div>
                    </div>
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
            {dessertOptions.find(d => d.id === selectedDessert)?.name}
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
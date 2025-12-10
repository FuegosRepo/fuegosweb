'use client'

import { motion } from 'framer-motion'
import { OptimizedImage } from '../../ui/optimized-image'
import { useCateringStore } from '@/lib/catering-store'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sun, Moon, Percent } from 'lucide-react'
import { cn } from '@/lib/utils'

const menuOptions = [
  {
    id: 'dejeuner',
    title: 'Déjeuner',
    subtitle: 'Menu du midi',
    description: 'Parfait pour vos événements de jour avec une ambiance décontractée',
    icon: Sun,
    discount: 10,
    features: [
      'Service de 12h à 16h',
      'Ambiance déjeuner',
      'Prix réduit de 10%',
      'Idéal pour événements familiaux'
    ],
    image: '/img-formulario/inicio/dia.webp'
  },
  {
    id: 'diner',
    title: 'Dîner',
    subtitle: 'Menu du soir',
    description: 'Expérience gastronomique complète pour vos soirées spéciales',
    icon: Moon,
    discount: 0,
    features: [
      'Service de 18h à 23h',
      'Ambiance soirée',
      'Expérience premium',
      'Parfait pour célébrations'
    ],
    image: '/img-formulario/inicio/noche.webp'
  }
]

export function StepMenu() {
  const selectedMenu = useCateringStore((s) => s.formData.menu.type)
  const updateMenu = useCateringStore((s) => s.updateMenu)

  const handleMenuSelect = (menuType: 'dejeuner' | 'diner') => {
    updateMenu({ type: menuType })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
          Choisissez votre type de menu
        </h3>
        <p className="text-gray-600">
          Sélectionnez l&apos;option qui correspond le mieux à votre événement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuOptions.map((option) => {
          const Icon = option.icon
          const isSelected = selectedMenu === option.id

          return (
            <motion.div
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className={cn(
                  'cursor-pointer transition-all duration-300 rounded-xl border border-gray-200 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                  isSelected && 'ring-2 ring-orange-500 bg-orange-50'
                )}
                tabIndex={0}
                onClick={() => handleMenuSelect(option.id as 'dejeuner' | 'diner')}
              >
                <div className="relative overflow-hidden rounded-xl">
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-orange-100 to-amber-100 relative">
                    <OptimizedImage
                      src={option.image}
                      alt={option.title}
                      fill
                      imageClassName="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={80}
                      placeholder="empty"
                      showLoader={false}
                      priority
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/10" />

                    {/* Icon */}
                    <div className="absolute top-4 left-4">
                      <div className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center',
                        isSelected ? 'bg-orange-500 text-white' : 'bg-white text-orange-500'
                      )}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Discount Badge */}
                    {option.discount > 0 && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-500 hover:bg-green-600 text-white">
                          <Percent className="w-3 h-3 mr-1" />
                          -{option.discount}%
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
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Title and Subtitle */}
                    <div>
                      <h4 className={cn(
                        'text-xl font-bold transition-colors',
                        isSelected ? 'text-orange-600' : 'text-gray-900'
                      )}>
                        {option.title}
                      </h4>
                      <p className="text-sm text-gray-500 font-medium">
                        {option.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-base leading-relaxed">
                      {option.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {option.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className={cn(
                            'w-1.5 h-1.5 rounded-full mr-3',
                            isSelected ? 'bg-orange-500' : 'bg-gray-400'
                          )} />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Price Info */}
                    {option.discount > 0 && (
                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex items-center text-green-600 text-sm font-medium">
                          <Percent className="w-4 h-4 mr-1" />
                          Économisez {option.discount}% sur votre commande
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Selection Summary */}
      {selectedMenu && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200"
        >
          <p className="text-orange-800 font-medium">
            Vous avez sélectionné: <span className="font-bold">
              {menuOptions.find(opt => opt.id === selectedMenu)?.title}
            </span>
            {selectedMenu === 'dejeuner' && (
              <span className="text-green-600 ml-2">
                (Remise de 10% appliquée)
              </span>
            )}
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
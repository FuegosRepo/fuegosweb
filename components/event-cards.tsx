'use client'

import { useState, memo } from 'react'
import { OptimizedImage } from './ui/optimized-image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Heart,
  Wine,
  Building2,
  Sparkles,
  X,
  ArrowRight
} from 'lucide-react'

interface EventData {
  id: string
  title: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  description: string
  image: string
  color: string
  tabs: {
    id: string
    label: string
    content: {
      title: string
      description: string
      features: string[]
      highlights?: string[]
    }
  }[]
}

const eventsData: EventData[] = [
  {
    id: 'mariages',
    title: 'Mariages',
    icon: Heart,
    description: 'Votre mariage mérite une prestation à la hauteur de ce jour unique.',
    image: '/img-eventos/mariage.webp',
    color: 'pink',
    tabs: [
      {
        id: 'menu',
        label: 'Menu',
        content: {
          title: 'Menu sur mesure',
          description: 'Un menu entièrement préparé au brasero, du cocktail jusqu\'au dessert',
          features: [
            'Menu personnalisé selon vos goûts',
            'Cuisson au brasero en direct',
            'Cocktail d\'accueil avec tapas',
            'Plats principaux variés',
            'Desserts préparés au feu de bois'
          ]
        }
      },
      {
        id: 'materiel',
        label: 'Matériel',
        content: {
          title: 'Location complète',
          description: 'Tout le matériel nécessaire pour votre réception',
          features: [
            'Vaisselle élégante',
            'Mobilier (tables, chaises)',
            'Nappes et décoration de table',
            'Matériel de service professionnel'
          ]
        }
      },
      {
        id: 'service',
        label: 'Service',
        content: {
          title: 'Service complet',
          description: 'Une équipe professionnelle pour votre jour J',
          features: [
            'Accueil des invités',
            'Service en format buffet',
            'Équipe de serveurs qualifiés',
            'Gestion du bar',
            'Découpe et service de la pièce montée ou du dessert final',
            'Service de nettoyage du matériel et de la vaisselle inclus'
          ],
          highlights: [
            'Manutention et mise en place',
            'Dressage professionnel'
          ]
        }
      },
      {
        id: 'decoration',
        label: 'Décoration',
        content: {
          title: 'Mise en scène florale',
          description: 'Collaboration avec une fleuriste-décoratrice experte',
          features: [
            'Consultation personnalisée',
            'Arrangements floraux sur mesure',
            'Décoration thématique',
            'Mise en scène élégante',
            'Coordination avec le lieu'
          ]
        }
      }
    ]
  },
  {
    id: 'fetes-privees',
    title: 'Fêtes Privées',
    icon: Wine,
    description: 'Anniversaires, baptêmes, repas de fin d\'année, garden parties entre amis…',
    image: '/img-eventos/fetes-prives.webp',
    color: 'purple',
    tabs: [
      {
        id: 'ambiance',
        label: 'Ambiance',
        content: {
          title: 'Moments chaleureux et conviviaux',
          description: 'Créez des souvenirs inoubliables autour de notre brasero argentin',
          features: [
            'Brasero argentin, véritable spectacle vivant',
            'Cuisson sur place au feu de bois',
            'Ambiance conviviale et authentique',
            'Menu gourmand et généreux',
            'Expérience interactive pour vos invités'
          ]
        }
      },
      {
        id: 'menu-prive',
        label: 'Menu',
        content: {
          title: 'Menu sur mesure',
          description: 'Adapté à l\'ambiance souhaitée pour votre événement',
          features: [
            'Menu personnalisé selon l\'occasion',
            'Cuisson live au brasero',
            'Produits frais et de qualité',
            'Portions généreuses',
            'Sauces maison authentiques'
          ]
        }
      },
      {
        id: 'logistique',
        label: 'Logistique',
        content: {
          title: 'Service clé en main',
          description: 'Nous nous occupons de tout pour que vous profitiez pleinement',
          features: [
            'Gestion de la location de matériel et vaisselle',
            'Équipe discrète et efficace',
            'Installation et nettoyage',
            'Service personnalisé'
          ]
        }
      }
    ]
  },
  {
    id: 'entreprise',
    title: 'Événements d\'entreprise',
    icon: Building2,
    description: 'Prestations qui allient impact, goût et efficacité pour les entreprises.',
    image: '/img-eventos/corporatif.webp',
    color: 'blue',
    tabs: [
      {
        id: 'references',
        label: 'Références',
        content: {
          title: 'Nos partenaires de confiance',
          description: 'Nous avons déjà collaboré avec de nombreuses entreprises prestigieuses',
          features: [
            'Vinci Constructions',
            'NGE',
            'Stade Allianz Riviera',
            'Lamborghini Monaco',
            'Université Côte d\'Azur',
            'Port de Monaco',
            '... et bien d\'autres entreprises de renom'
          ]
        }
      },
      {
        id: 'pointfort',
        label: 'Point fort',
        content: {
          title: 'L\'excellence du service professionnel',
          description: 'Des prestations qui valorisent votre image de marque',

          features: [
            'Une grande efficacité logistique : installation rapide, cuisson en direct, service rythmé',
            'Brasero argentin, véritable spectacle vivant pour impresioner vos clients ',
            'Une image de marque valorisée, grâce à une prestation premium et visuelle',
            'Ambiance conviviale et authentique special pour de networking',
            'Possibilité d\'intervention sur chantier, dans vos locaux, ou dans un lieu de réception externe',
            'Zéro stress pour vos équipes : on s’occupe de tout, vous profitez de votre événement'
          ]
        }
      },
      {
        id: 'serviceinclus',
        label: 'Service inclus',
        content: {
          title: 'Adaptés à tous vos besoins',
          description: 'Nos offres s\'adaptent à tous les formats d\'événements d\'entreprise',
          features: [
            'Un menu sur mesure adapté à votre public (collaborateurs, partenaires, clients VIP)',
            'Cuisson sur place au feu de bois',
            'Gestion de la location de matériel si neccesaire',
            'Service de manutention et mise en place, sur demande',
            'Équipe discrète et efficace',
            'Installation et nettoyage de notre espace de travail'
          ]
        }
      }
    ]
  }
]

interface EventCardsProps {
  className?: string
}

function EventCards({ className = '' }: EventCardsProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null)
  const [activeTab, setActiveTab] = useState<string>('')
  const [activeEventType, setActiveEventType] = useState<string>('mariages')

  const openEventModal = (event: EventData) => {
    setSelectedEvent(event)
    setActiveTab(event.tabs[0].id)
    setActiveEventType(event.id)
  }

  const closeEventModal = () => {
    setSelectedEvent(null)
    setActiveTab('')
  }

  const switchEventType = (eventId: string) => {
    const event = eventsData.find(e => e.id === eventId)
    if (event) {
      setSelectedEvent(event)
      setActiveTab(event.tabs[0].id)
      setActiveEventType(eventId)
    }
  }

  return (
    <div>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
        {eventsData.map((event, index) => {
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut"
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
            >
              <Card
                className="cursor-pointer transition-all duration-300 hover:shadow-xl bg-white border border-stone-200 hover:border-[#e2943a]/20 group overflow-hidden h-full"
                onClick={() => openEventModal(event)}
              >
                <div className="relative h-64 overflow-hidden">
                  <OptimizedImage
                    src={event.image}
                    alt={event.title}
                    fill
                    imageClassName="object-cover transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={70}
                    fetchPriority="low"
                    placeholder="empty"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                </div>

                <CardHeader className="pb-2 px-6 pt-6 text-center">
                  <CardTitle className="text-xl font-light text-stone-900 group-hover:text-[#e2943a] transition-colors duration-300 tracking-tight">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0 px-6 pb-6 text-center">
                  <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light mb-4">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-center mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-[#e2943a] text-sm font-medium mr-2">Découvrir</span>
                    <ArrowRight className="w-4 h-4 text-[#e2943a] group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={closeEventModal}>
        <DialogContent
          className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-[60vw] xl:max-w-[60vw] max-h-[90vh] sm:max-h-[95vh] overflow-hidden p-0 bg-gradient-to-br from-orange-50 to-orange-100 border-t border-orange-200 shadow-2xl rounded-xl sm:rounded-2xl"
          showCloseButton={false}
          aria-describedby="event-description"
        >
          {selectedEvent && (
            <div className="flex flex-col h-full max-h-[90vh] sm:max-h-[95vh]">
              {/* Elegant Header - Fixed */}
              <div className="flex-shrink-0 bg-gradient-to-br from-orange-50 to-orange-100 border-b border-orange-200">
                <div className="flex items-center justify-between p-4 sm:p-6 lg:p-8">
                  <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-1 min-w-0">
                    <div className="min-w-0">
                      <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-light text-stone-900 tracking-tight truncate">
                        {selectedEvent.title}
                      </DialogTitle>
                      <DialogDescription id="event-description" className="text-stone-500 text-xs sm:text-sm mt-1 hidden sm:block">
                        Services de traiteur premium
                      </DialogDescription>
                    </div>
                  </div>

                  <button
                    onClick={closeEventModal}
                    className="group bg-stone-50 hover:bg-stone-100 rounded-lg sm:rounded-xl p-2 sm:p-3 transition-all duration-200 flex-shrink-0 ml-2"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5 text-stone-400 group-hover:text-stone-600 transition-colors duration-200" />
                  </button>
                </div>

                {/* Event Type Navigation */}
                <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
                  <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
                    {eventsData.map((event) => {
                      const IconComponent = event.icon
                      const isActive = activeEventType === event.id

                      return (
                        <button
                          key={event.id}
                          onClick={() => switchEventType(event.id)}
                          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 text-xs sm:text-sm ${isActive
                            ? 'bg-[#e2943a] text-white shadow-lg'
                            : 'bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                            }`}
                        >
                          <IconComponent className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="font-medium">{event.title}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto min-h-0">
                <div className="p-4 sm:p-6 lg:p-8">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="mb-4 sm:mb-6 lg:mb-8">
                      <TabsList className="w-full h-auto p-0.5 sm:p-1 bg-stone-50 rounded-lg sm:rounded-xl">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5 sm:gap-1 w-full">
                          {selectedEvent.tabs.map((tab) => (
                            <TabsTrigger
                              key={tab.id}
                              value={tab.id}
                              className="data-[state=active]:bg-white data-[state=active]:text-stone-900 data-[state=active]:shadow-sm data-[state=active]:border-[#e2943a] data-[state=active]:ring-1 data-[state=active]:ring-[#e2943a] border border-transparent transition-all duration-200 rounded-md sm:rounded-lg py-2.5 sm:py-3 lg:py-4 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-white/70 hover:border-stone-200 hover:shadow-sm min-w-0"
                            >
                              <span className="truncate">{tab.label}</span>
                            </TabsTrigger>
                          ))}
                        </div>
                      </TabsList>
                    </div>

                    {selectedEvent.tabs.map((tab) => (
                      <TabsContent key={tab.id} value={tab.id} className="mt-0">
                        <div className="bg-stone-50 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8">
                          <div className="mb-4 sm:mb-6 lg:mb-8">
                            <h3 className="text-base sm:text-lg lg:text-xl font-light text-stone-900 mb-2 sm:mb-3 lg:mb-4 tracking-tight">
                              {tab.content.title}
                            </h3>
                            <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                              {tab.content.description}
                            </p>
                          </div>

                          <div className="grid gap-4 sm:gap-5 lg:gap-6">
                            <div>
                              <div className="grid gap-2 sm:gap-3">
                                {tab.content.features.map((feature, index) => (
                                  <div key={index} className="flex items-start gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-stone-600">
                                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#e2943a] mt-1.5 sm:mt-2 lg:mt-2.5 flex-shrink-0" />
                                    <span className="leading-relaxed">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {tab.content.highlights && (
                              <div className="mt-4 sm:mt-5 lg:mt-6 pt-4 sm:pt-5 lg:pt-6 border-t border-stone-200">
                                <div className="grid gap-2 sm:gap-3">
                                  {tab.content.highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-start gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-stone-700">
                                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-[#e2943a] mt-0.5 sm:mt-1 flex-shrink-0" />
                                      <span className="leading-relaxed font-medium">{highlight}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Call to Action */}
                          <div className="mt-6 sm:mt-8 lg:mt-10 pt-6 sm:pt-8 border-t border-stone-200">
                            <div className="bg-white rounded-lg p-4 sm:p-5 lg:p-6 border border-stone-200">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                                <div className="flex-1">
                                  <h4 className="text-xs sm:text-sm font-medium text-stone-900 mb-1 sm:mb-2">
                                    Intéressé par nos services ?
                                  </h4>
                                  <p className="text-xs text-stone-600">
                                    Demandez votre devis personnalisé
                                  </p>
                                </div>
                                <Link href="/catering" className="w-full sm:w-auto">
                                  <Button
                                    variant="default"
                                    size="sm"
                                    className="bg-[#e2943a] hover:bg-[#d18043] text-white shadow-sm px-4 sm:px-6 py-2 w-full sm:w-auto text-xs sm:text-sm"
                                  >
                                    Devis Gratuit
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default memo(EventCards)
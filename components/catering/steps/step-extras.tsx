'use client'

import { motion } from 'framer-motion'
import { useCateringStore, type ExtraServices } from '@/lib/catering-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Wine, Utensils, Flower, MessageSquare, Check, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const materielOptions = [
  { id: 'assiettes-plat', label: 'Assiettes plat', category: 'Vaisselle' },
  { id: 'assiettes-dessert', label: 'Assiettes dessert', category: 'Vaisselle' },
  { id: 'couverts', label: 'Couverts', category: 'Vaisselle' },
  { id: 'verres-eau', label: 'Verres à eau', category: 'Verrerie' },
  { id: 'verres-vin', label: 'Verres à vin', category: 'Verrerie' },
  { id: 'verres-champagne', label: 'Flûtes à champagne', category: 'Verrerie' },
  { id: 'tables', label: 'Tables', category: 'Mobilier' },
  { id: 'mange-debout', label: 'Mange debout', category: 'Mobilier' },
  { id: 'chaises', label: 'Chaises', category: 'Mobilier' },
  { id: 'serveurs', label: 'Serveurs', category: 'Divers' },
  { id: 'autre-materiel', label: 'Autre matériel', category: 'Divers' }
]

const materielCategories = [
  { id: 'Vaisselle', icon: Utensils, color: 'blue' },
  { id: 'Verrerie', icon: Wine, color: 'purple' },
  { id: 'Mobilier', icon: Plus, color: 'green' },
  { id: 'Divers', icon: MessageSquare, color: 'gray' }
]

export function StepExtras() {
  const extras = useCateringStore((s) => s.formData.extras)
  const updateExtras = useCateringStore((s) => s.updateExtras)
  const [customRequest, setCustomRequest] = useState(extras.specialRequest || '')
  const [otherEquipmentDetails, setOtherEquipmentDetails] = useState(extras.otherEquipmentDetails || '')

  const handleWineChange = (checked: boolean) => {
    updateExtras({
      ...extras,
      wines: checked
    })
  }

  const handleDecorationChange = (checked: boolean) => {
    updateExtras({
      ...extras,
      decoration: checked
    })
  }

  const handleMaterielChange = (materielId: string, checked: boolean) => {
    const currentMateriel = extras.equipment || []
    const updatedMateriel = checked 
      ? [...currentMateriel, materielId] 
      : currentMateriel.filter(id => id !== materielId)
    
    const extrasUpdate: Partial<ExtraServices> = {
      ...extras,
      equipment: updatedMateriel
    }

    // Si se deselecciona "autre-materiel", limpiamos el detalle
    if (!checked && materielId === 'autre-materiel') {
      extrasUpdate.otherEquipmentDetails = ''
      setOtherEquipmentDetails('')
    }

    updateExtras(extrasUpdate)
  }

  const handleCustomRequestChange = (value: string) => {
    setCustomRequest(value)
    updateExtras({
      ...extras,
      specialRequest: value
    })
  }

  const selectedMaterielCount = extras.equipment?.length || 0
  const hasSelections = extras.wines || extras.decoration || selectedMaterielCount > 0 || extras.specialRequest

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-5"
    >
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Services supplémentaires
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          Personnalisez votre événement avec nos services optionnels
        </p>
        
        {/* Selection Summary */}
        {hasSelections && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-full border border-orange-300 shadow-sm"
          >
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-white" />
            </div>
            <span className="text-orange-900 font-medium text-xs">
              {[extras.wines && 'Vins', extras.decoration && 'Décoration', selectedMaterielCount > 0 && `${selectedMaterielCount} matériel(s)`, extras.specialRequest && 'Demande spéciale'].filter(Boolean).join(' • ')}
            </span>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto">
        {/* Vins Rouges */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={cn(
            'transition-all duration-300 h-full cursor-pointer rounded-lg overflow-hidden',
            extras.wines
              ? 'ring-2 ring-red-500 shadow-lg bg-gradient-to-br from-red-50 to-pink-50'
              : 'hover:shadow-md hover:border-red-300 border-2 border-gray-200'
          )}
          onClick={() => handleWineChange(!extras.wines)}
          >
            <CardHeader className="pb-3 bg-white/50 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center shadow-sm transition-all duration-300',
                    extras.wines ? 'bg-gradient-to-br from-red-500 to-red-600 text-white' : 'bg-gradient-to-br from-red-100 to-red-200 text-red-600'
                  )}>
                    <Wine className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold text-gray-900">Vins Rouges d&apos;Argentine</CardTitle>
                    <p className="text-xs text-red-600 font-medium">Sélection premium</p>
                  </div>
                </div>
                <Checkbox
                  checked={extras.wines || false}
                  onCheckedChange={handleWineChange}
                  className="w-5 h-5 border-2"
                />
              </div>
            </CardHeader>
            <CardContent className="pt-3 px-4 pb-4">
              <div className="space-y-2.5">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Accompagnez votre asado avec une sélection de vins rouges argentins authentiques.
                </p>
                <div className="space-y-1.5 bg-white/60 rounded-lg p-3">
                  <div className="flex items-center text-xs text-gray-700 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 shadow-sm" />
                    Malbec et Cabernet Sauvignon
                  </div>
                  <div className="flex items-center text-xs text-gray-700 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 shadow-sm" />
                    Régions de Mendoza et Salta
                  </div>
                  <div className="flex items-center text-xs text-gray-700 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 shadow-sm" />
                    Accord parfait avec les viandes
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Décoration */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className={cn(
            'transition-all duration-300 h-full cursor-pointer rounded-lg overflow-hidden',
            extras.decoration
              ? 'ring-2 ring-pink-500 shadow-lg bg-gradient-to-br from-pink-50 to-purple-50'
              : 'hover:shadow-md hover:border-pink-300 border-2 border-gray-200'
          )}
          onClick={() => handleDecorationChange(!extras.decoration)}
          >
            <CardHeader className="pb-3 bg-white/50 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center shadow-sm transition-all duration-300',
                    extras.decoration ? 'bg-gradient-to-br from-pink-500 to-pink-600 text-white' : 'bg-gradient-to-br from-pink-100 to-pink-200 text-pink-600'
                  )}>
                    <Flower className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold text-gray-900">Service Décoration</CardTitle>
                    <p className="text-xs text-pink-600 font-medium">Contact fleuriste/décoratrice</p>
                  </div>
                </div>
                <Checkbox
                  checked={extras.decoration || false}
                  onCheckedChange={handleDecorationChange}
                  className="w-5 h-5 border-2"
                />
              </div>
            </CardHeader>
            <CardContent className="pt-3 px-4 pb-4">
              <div className="space-y-2.5">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Nous vous mettons en relation avec notre partenaire décoratrice.
                </p>
                <div className="space-y-1.5 bg-white/60 rounded-lg p-3">
                  <div className="flex items-center text-xs text-gray-700 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mr-2 shadow-sm" />
                    Consultation personnalisée
                  </div>
                  <div className="flex items-center text-xs text-gray-700 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mr-2 shadow-sm" />
                    Arrangements floraux
                  </div>
                  <div className="flex items-center text-xs text-gray-700 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mr-2 shadow-sm" />
                    Décoration thématique
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Location de Matériel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className={cn(
          'transition-all duration-300 rounded-lg overflow-hidden border-2',
          selectedMaterielCount > 0
            ? 'ring-2 ring-orange-300 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100'
            : 'border-gray-200 hover:shadow-md hover:border-orange-300'
        )}>
          <CardHeader className="bg-white/50 pb-3 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center shadow-sm transition-all duration-300',
                  selectedMaterielCount > 0 ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white' : 'bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600'
                )}>
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-gray-900">Location de Matériel</CardTitle>
                  <p className="text-xs font-medium">
                    {selectedMaterielCount > 0 
                      ? <span className="text-orange-600">{selectedMaterielCount} élément(s)</span>
                      : <span className="text-gray-600">Équipements</span>
                    }
                  </p>
                </div>
              </div>
              {selectedMaterielCount > 0 && (
                <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm px-3 py-1 shadow-sm">
                  {selectedMaterielCount}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-3 px-4 pb-4">
            <div className="space-y-3">
              {materielCategories.map((category) => {
                const categoryItems = materielOptions.filter(item => item.category === category.id)
                const selectedInCategory = categoryItems.filter(item => 
                  extras.equipment?.includes(item.id)
                ).length
                const Icon = category.icon
                
                return (
                  <div key={category.id} className="space-y-2 bg-white/60 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-orange-600" />
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm">{category.id}</h4>
                      {selectedInCategory > 0 && (
                        <Badge className="bg-orange-500 text-white text-xs px-2 py-0.5">
                          {selectedInCategory}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {categoryItems.map((item) => {
                        const isSelected = extras.equipment?.includes(item.id) || false

                        return (
                          <div
                            key={item.id}
                            className={cn(
                              'flex items-center space-x-2 p-2 rounded-md border transition-all duration-200 cursor-pointer',
                              isSelected
                                ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-400 shadow-sm'
                                : 'bg-white border-gray-200 hover:border-orange-300'
                            )}
                            onClick={() => handleMaterielChange(item.id, !isSelected)}
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked: boolean) => handleMaterielChange(item.id, checked)}
                              className="w-4 h-4"
                            />
                            <Label className="text-xs font-medium cursor-pointer flex-1">
                              {item.label}
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                    {category.id === 'Divers' && extras.equipment?.includes('autre-materiel') && (
                      <div className="mt-3 space-y-1">
                        <Label htmlFor="autre-materiel-details" className="text-xs font-semibold text-gray-900">
                          Précisez votre besoin pour &ldquo;Autre matériel&rdquo;
                        </Label>
                        <Input
                          id="autre-materiel-details"
                          placeholder="Ex.: barbecue supplémentaire, parasols, rallonges, etc."
                          value={otherEquipmentDetails}
                          onChange={(e) => {
                            const value = e.target.value
                            setOtherEquipmentDetails(value)
                            updateExtras({ ...extras, otherEquipmentDetails: value })
                          }}
                          className="text-sm border-2 border-gray-300 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 hover:border-orange-300 rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Demande Spéciale */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className={cn(
          'transition-all duration-300 rounded-lg overflow-hidden border-2',
          extras.specialRequest
            ? 'ring-2 ring-green-500 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50'
            : 'border-gray-200 hover:shadow-md hover:border-green-300'
        )}>
          <CardHeader className="bg-white/50 pb-3 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center shadow-sm transition-all duration-300',
                extras.specialRequest ? 'bg-gradient-to-br from-green-500 to-green-600 text-white' : 'bg-gradient-to-br from-green-100 to-green-200 text-green-600'
              )}>
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-gray-900">Demande Spéciale</CardTitle>
                <p className="text-xs text-green-600 font-medium">
                  Partagez vos souhaits particuliers
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-3 px-4 pb-4">
            <div className="space-y-2.5">
              <Label htmlFor="demande-speciale" className="text-sm font-semibold text-gray-900">
                Demandes particulières ou informations importantes
              </Label>
              <Textarea
                id="demande-speciale"
                placeholder="Allergies alimentaires, préférences culinaires, contraintes d'accès, timing particulier..."
                value={customRequest}
                onChange={(e) => handleCustomRequestChange(e.target.value)}
                className="min-h-[100px] resize-none border-2 border-gray-300 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 hover:border-orange-300 rounded-lg text-sm"
              />
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Ces informations nous aideront à personnaliser votre expérience
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary */}
      {hasSelections && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-4 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 rounded-lg border border-orange-300 shadow-sm max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-sm">
              <Check className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-base font-bold text-orange-900">
              Services sélectionnés
            </h4>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {extras.wines && (
              <div className="inline-flex items-center gap-2 bg-white/70 rounded-md px-3 py-1.5 border border-red-200">
                <Wine className="w-4 h-4 text-red-600" />
                <span className="font-medium text-xs text-gray-800">Vins</span>
              </div>
            )}
            {extras.decoration && (
              <div className="inline-flex items-center gap-2 bg-white/70 rounded-md px-3 py-1.5 border border-pink-200">
                <Flower className="w-4 h-4 text-pink-600" />
                <span className="font-medium text-xs text-gray-800">Décoration</span>
              </div>
            )}
            {selectedMaterielCount > 0 && (
              <div className="inline-flex items-center gap-2 bg-white/70 rounded-md px-3 py-1.5 border border-blue-200">
                <Utensils className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-xs text-gray-800">Matériel ({selectedMaterielCount})</span>
              </div>
            )}
            {extras.specialRequest && (
              <div className="inline-flex items-center gap-2 bg-white/70 rounded-md px-3 py-1.5 border border-green-200">
                <MessageSquare className="w-4 h-4 text-green-600" />
                <span className="font-medium text-xs text-gray-800">Demande spéciale</span>
              </div>
            )}
          </div>
          <div className="bg-green-500 text-white rounded-full px-4 py-2 inline-flex items-center gap-1.5 shadow-sm">
            <Check className="w-4 h-4" />
            <span className="font-semibold text-sm">Prêt pour le résumé final</span>
          </div>
        </motion.div>
      )}
      
      {/* Help Text */}
      <div className="text-center">
        <p className="text-xs text-gray-500 inline-flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Services optionnels - Vous pouvez passer à l&apos;étape suivante sans sélection
        </p>
      </div>
    </motion.div>
  )
}
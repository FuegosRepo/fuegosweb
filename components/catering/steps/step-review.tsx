'use client'

import React, { useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useCateringStore } from '@/lib/catering-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Check,
  Edit,
  Send,
  Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { supabase } from '@/lib/supabaseClient'
import { SuccessModal } from '../SuccessModal'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { logger } from '@/lib/logger'

const entreeOptions = [
  { id: 'empanadas', name: 'Empanadas' },
  { id: 'choripan', name: 'Choripan' },
  { id: 'secreto', name: 'Secreto de porc Ibérique' },
  { id: 'burger', name: 'Miniburger maison au brasero' },
  { id: 'brochettes', name: 'Brochettes de jambon ibérique' }
]

const viandeOptions = [
  { id: 'vacio', name: 'Vacio / Bavette d\'aloyau', origin: 'Irlande', type: 'classique' },
  { id: 'entrecote', name: 'Entrecôte / Ojo de bife / Ribeye', origin: 'France', type: 'classique' },
  { id: 'entrana', name: 'Entraña / Hampe / Skirt steak', origin: 'Irlande', type: 'classique' },
  { id: 'magret', name: 'Magret de Canard', origin: 'France', type: 'classique' },
  { id: 'entrecote_arg', name: 'Entrecôte / Ojo de bife / Ribeye', origin: 'Argentine', type: 'premium' },
  { id: 'picanha', name: 'Picanha', origin: 'Argentine', type: 'premium' },
  { id: 'tomahawk', name: 'Côte de bœuf / Tomahawk', origin: 'France/USA', type: 'premium' },
  { id: 'bife_chorizo', name: 'Faux filet / Bife de chorizo / Sirloin steak', origin: 'Argentine', type: 'premium' },
  { id: 'saumon', name: 'Saumon', origin: 'Norvège', type: 'premium' }
]

const dessertOptions = [
  { id: 'fruits_grilles', name: 'Fruits grillés' },
  { id: 'panqueques', name: 'Panqueques con dulce de leche fondu au brasero' }
]

const materielLabels: Record<string, string> = {
  'assiettes-plat': 'Assiettes plat',
  'assiettes-dessert': 'Assiettes dessert',
  'couverts': 'Couverts',
  'verres-eau': 'Verres à eau',
  'verres-vin': 'Verres à vin',
  'verres-champagne': 'Flûtes à champagne',
  'tables': 'Tables',
  'mange-debout': 'Mange debout',
  'chaises': 'Chaises',
  'serveurs': 'Serveurs',
  'autre-materiel': 'Autre matériel'
}

export function StepReview() {
  const formData = useCateringStore((s) => s.formData)
  const setCurrentStep = useCateringStore((s) => s.setCurrentStep)
  const { contact, menu, entrees, viandes, dessert, extras } = formData
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showSuccessModal, setShowSuccessModal] = React.useState(false)
  const [termsAccepted, setTermsAccepted] = React.useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    logger.log('📝 Enviando formulario...')

    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: 'click_resume' })
    }


    const payload = {
      email: contact.email,
      name: contact.name,
      phone: contact.phone,
      event_date: contact.eventDate || null,
      event_time: undefined,
      event_type: contact.eventType || null,
      address: contact.address || null,
      guest_count: contact.guestCount || 0,
      menu_type: menu.type || null,
      entrees: entrees || [],
      viandes: viandes || [],
      dessert: dessert || null,
      extras: extras || {},
      status: 'pending' as const,
      estimated_price: null
    }

    try {
      // 1. Guardar en Supabase (RÁPIDO - solo esto bloquea)
      const { data, error } = await supabase
        .from('catering_orders')
        .insert([payload])
        .select('id')

      if (error) {
        logger.error('Erreur en envoyant la demande:', error)
        alert("Une erreur s'est produite lors de l'envoi. Veuillez réessayer.")
        return
      }

      const orderId = data?.[0]?.id
      logger.log('✅ Commande enregistrée, id:', orderId)

      // ✨ MOSTRAR ÉXITO INMEDIATAMENTE
      setShowSuccessModal(true)

      // 2. Generar presupuesto con IA (ASÍNCRONO - no bloqueante)
      // Se ejecuta en background para que el admin lo revise en el panel
      fetch('/api/generate-budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderId,
          contactData: {
            email: contact.email,
            name: contact.name,
            phone: contact.phone,
            eventDate: contact.eventDate,
            eventType: contact.eventType,
            address: contact.address,
            guestCount: contact.guestCount,
            marketingConsent: contact.marketingConsent
          },
          menuType: menu.type,
          entrees: getSelectedEntrees,
          viandes: getSelectedViandes.map(v => v?.name || ''),
          dessert: getSelectedDessert,
          extras: extras
        })
      })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            logger.log('✅ Presupuesto generado en background:', result.budget)
          } else {
            logger.warn('⚠️ Error generando presupuesto:', result.error)
          }
        })
        .catch(error => {
          logger.error('⚠️ Error al generar presupuesto:', error)
        })

      // 3. Enviar emails de confirmación (ASÍNCRONO - no bloqueante)
      // - Email al cliente: confirmación de recepción
      // - Email al admin: notificación de nueva solicitud
      fetch('/api/send-order-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          eventDate: contact.eventDate,
          eventType: contact.eventType,
          guestCount: contact.guestCount,
          address: contact.address,
          menuType: menu.type,
          entrees: getSelectedEntrees,
          viandes: getSelectedViandes.map(v => v?.name || ''),
          dessert: getSelectedDessert,
          extras: extras
        })
      })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            logger.log('✅ Emails enviados en background')
          } else {
            logger.warn('⚠️ Error enviando emails:', result.errors)
          }
        })
        .catch(error => {
          logger.error('⚠️ Error al enviar emails:', error)
        })

    } catch (error) {
      logger.error('Error inesperado:', error)
      alert("Une erreur s'est produite lors de l'envoi. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Memoizar funciones para evitar recrearlas en cada render
  const getSelectedEntrees = useMemo(() => {
    return entrees.map(id => entreeOptions.find(e => e.id === id)?.name).filter(Boolean)
  }, [entrees])

  const getSelectedViandes = useMemo(() => {
    return viandes.map(id => viandeOptions.find(v => v.id === id)).filter(Boolean)
  }, [viandes])

  const getSelectedDessert = useMemo(() => {
    return dessertOptions.find(d => d.id === dessert)?.name
  }, [dessert])

  const getSelectedMateriel = useMemo(() => {
    return extras.equipment?.map(id => materielLabels[id]).filter(Boolean) || []
  }, [extras.equipment])

  return (
    <>
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false)
          // Opcional: redirigir o resetear el formulario
          // window.location.href = '/'
        }}
        clientEmail={contact.email}
        clientName={contact.name}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-5"
      >
        <div className="text-center mb-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Résumé de votre commande
          </h3>
          <p className="text-gray-600 text-sm">
            Vérifiez les détails de votre asado sur-mesure avant l&apos;envoi
          </p>
        </div>

        {/* Contact Information & Menu Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-6xl mx-auto"
        >
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-gray-900">Informations générales</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentStep(2)}
                    className="text-orange-600 hover:text-orange-700 h-7 px-2"
                  >
                    <Edit className="w-3.5 h-3.5 mr-1" />
                    <span className="text-xs font-medium">Menu</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentStep(1)}
                    className="text-orange-600 hover:text-orange-700 h-7 px-2"
                  >
                    <Edit className="w-3.5 h-3.5 mr-1" />
                    <span className="text-xs font-medium">Contact</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-gray-500 min-w-[80px]">Nom:</span>
                    <span className="font-medium text-gray-900">{contact.name || 'Non renseigné'}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-gray-500 min-w-[80px]">Email:</span>
                    <span className="text-gray-900">{contact.email || 'Non renseigné'}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-gray-500 min-w-[80px]">Téléphone:</span>
                    <span className="text-gray-900">{contact.phone || 'Non renseigné'}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-gray-500 min-w-[80px]">Invités:</span>
                    <span className="text-gray-900 font-medium">{contact.guestCount || 0} personne{contact.guestCount > 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-gray-500 min-w-[80px]">Date:</span>
                    <span className="text-gray-900">
                      {contact.eventDate
                        ? format(new Date(contact.eventDate), 'dd MMMM yyyy', { locale: fr })
                        : 'Non renseignée'
                      }
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-gray-500 min-w-[80px]">Événement:</span>
                    <span className="text-gray-900 capitalize">{contact.eventType || 'Non renseigné'}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-gray-500 min-w-[80px]">Type menu:</span>
                    <div className="flex items-center gap-2">
                      <Badge className={cn(
                        'text-xs text-white font-semibold',
                        menu.type === 'dejeuner'
                          ? 'bg-orange-500 hover:bg-orange-600'
                          : 'bg-orange-500 hover:bg-orange-600'
                      )}>
                        {menu.type === 'dejeuner' ? 'Déjeuner' : 'Dîner'}
                      </Badge>
                      {menu.type === 'dejeuner' && (
                        <Badge variant="secondary" className="text-xs  bg-orange-100 text-orange-800">
                          -10%
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-gray-500 min-w-[80px]">Adresse:</span>
                    <span className="text-gray-900 text-sm">{contact.address || 'Non renseignée'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Menu Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {/* Entrées */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full border border-gray-200 shadow-sm">
              <CardHeader className="pb-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold text-gray-900">Entrées</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentStep(3)}
                    className="text-orange-600 hover:text-orange-700 h-7 px-2"
                  >
                    <Edit className="w-3.5 h-3.5 mr-1" />
                    <span className="text-xs font-medium">Modifier</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-1.5">
                  {getSelectedEntrees.length > 0 ? (
                    getSelectedEntrees.map((entree, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 mt-1">•</span>
                        <span className="text-gray-900">{entree}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">Aucune sélection</span>
                  )}
                  <Badge variant="outline" className="text-xs mt-2 bg-gray-50">
                    {entrees.length}/2 sélectionnées
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Viandes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full border border-gray-200 shadow-sm">
              <CardHeader className="pb-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold text-gray-900">Viandes</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentStep(4)}
                    className="text-orange-600 hover:text-orange-700 h-7 px-2"
                  >
                    <Edit className="w-3.5 h-3.5 mr-1" />
                    <span className="text-xs font-medium">Modifier</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {getSelectedViandes.length > 0 ? (
                    getSelectedViandes.map((viande, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-start gap-2 text-sm">
                          <span className="text-red-500 mt-0.5">•</span>
                          <div className="flex-1">
                            <span className="font-medium text-gray-900">{viande?.name}</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Badge
                                variant={viande?.type === 'premium' ? 'default' : 'secondary'}
                                className="text-xs py-0 h-5"
                              >
                                {viande?.type === 'premium' ? 'Premium' : 'Classique'}
                              </Badge>
                              <span className="text-xs text-gray-500">{viande?.origin}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">Aucune sélection</span>
                  )}
                  <Badge variant="outline" className="text-xs mt-2 bg-gray-50">
                    {viandes.length}/3 sélectionnées
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dessert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="h-full border border-gray-200 shadow-sm">
              <CardHeader className="pb-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold text-gray-900">Dessert</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentStep(5)}
                    className="text-orange-600 hover:text-orange-700 h-7 px-2"
                  >
                    <Edit className="w-3.5 h-3.5 mr-1" />
                    <span className="text-xs font-medium">Modifier</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span className="text-gray-900">{getSelectedDessert || 'Aucune sélection'}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Services Supplémentaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-gray-900">Services supplémentaires</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentStep(6)}
                  className="text-orange-600 hover:text-orange-700 h-7 px-2"
                >
                  <Edit className="w-3.5 h-3.5 mr-1" />
                  <span className="text-xs font-medium">Modifier</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Vins */}
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <span className="text-xs font-medium text-gray-700">Vins rouges</span>
                  <Badge variant={extras.wines ? 'default' : 'secondary'} className="text-xs h-5 px-2 bg-gray-200 text-gray-700">
                    {extras.wines ? 'Oui' : 'Non'}
                  </Badge>
                </div>

                {/* Décoration */}
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <span className="text-xs font-medium text-gray-700">Décoration</span>
                  <Badge variant={extras.decoration ? 'default' : 'secondary'} className="text-xs h-5 px-2 bg-gray-200 text-gray-700">
                    {extras.decoration ? 'Oui' : 'Non'}
                  </Badge>
                </div>

                {/* Matériel */}
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <span className="text-xs font-medium text-gray-700">Matériel</span>
                  <Badge variant={getSelectedMateriel.length > 0 ? 'default' : 'secondary'} className="text-xs h-5 px-2 bg-gray-200 text-gray-700">
                    {getSelectedMateriel.length > 0 ? getSelectedMateriel.length : 'Aucun'}
                  </Badge>
                </div>

                {/* Demande spéciale */}
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <span className="text-xs font-medium text-gray-700">Demande spéciale</span>
                  <Badge variant={extras.specialRequest ? 'default' : 'secondary'} className="text-xs h-5 px-2 bg-gray-200 text-gray-700">
                    {extras.specialRequest ? 'Oui' : 'Non'}
                  </Badge>
                </div>
              </div>

              {/* Détails des services */}
              {(getSelectedMateriel.length > 0 || extras.specialRequest || (extras.equipment?.includes('autre-materiel') && extras.otherEquipmentDetails)) && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  {getSelectedMateriel.length > 0 && (
                    <div className="mb-3">
                      <span className="font-medium text-xs text-gray-700">Matériel:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {getSelectedMateriel.map((item, index) => (
                          <Badge key={index} variant="outline" className="text-xs py-0 h-5">
                            {item}
                          </Badge>
                        ))}
                      </div>
                      {extras.equipment?.includes('autre-materiel') && extras.otherEquipmentDetails && (
                        <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-md mt-2">
                          <span className="font-semibold">Autre matériel:</span> {extras.otherEquipmentDetails}
                        </p>
                      )}
                    </div>
                  )}

                  {extras.specialRequest && (
                    <div>
                      <span className="font-medium text-xs text-gray-700">Demande spéciale:</span>
                      <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-md mt-1">
                        {extras.specialRequest}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Submit Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center max-w-2xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 shadow-sm">
            <CardContent className="p-5">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    Prêt à envoyer votre demande ?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Notre équipe vous contactera sous 48h pour finaliser les détails.
                  </p>
                </div>

                <div className="flex justify-center gap-6 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span>Devis gratuit</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span>Réponse 48h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span>Sans engagement</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-left bg-white/50 p-3 rounded-lg border border-orange-100">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    className="mt-1 border-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:text-white"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 cursor-pointer"
                    >
                      J&apos;ai lu et j&apos;accepte la <Link href="/politique-de-confidentialite" target="_blank" className="text-orange-600 underline hover:text-orange-800">Politique de Confidentialité</Link>
                    </label>
                    <p className="text-xs text-gray-500">
                      En cochant cette case, vous acceptez que Fuegos d&apos;azur traite vos données pour gérer votre commande.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-left mb-6 bg-white/50 p-3 rounded-lg border border-orange-100">
                  <Checkbox
                    id="marketing"
                    checked={contact.marketingConsent}
                    onCheckedChange={(checked) => useCateringStore.getState().updateContact({ marketingConsent: checked as boolean })}
                    className="mt-1 border-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:text-white"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="marketing"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 cursor-pointer"
                    >
                      Je souhaite recevoir des offres exclusives et des nouvelles de Fuegos d&apos;azur (optionnel)
                    </label>
                    <p className="text-xs text-gray-500">
                      Vous pourrez vous désinscrire à tout moment.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !termsAccepted}
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer ma demande
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 mt-4">
                  * Champs obligatoires pour validation.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </>
  )
}
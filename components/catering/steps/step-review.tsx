'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useCateringStore } from '@/lib/catering-store'
import { useProducts } from '@/hooks/useProducts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Edit, Send, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { supabase } from '@/lib/supabaseClient'
import { SuccessModal } from '../SuccessModal'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import Image from 'next/image'
import { logger } from '@/lib/logger'

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
  // 1. Acceso Directo al Store
  const contact = useCateringStore((s) => s.formData.contact)
  const menu = useCateringStore((s) => s.formData.menu)
  const entreesIds = useCateringStore((s) => s.formData.entrees)
  const viandesIds = useCateringStore((s) => s.formData.viandes)
  const dessertId = useCateringStore((s) => s.formData.dessert)
  const extras = useCateringStore((s) => s.formData.extras)
  const updateContact = useCateringStore((s) => s.updateContact)
  const setCurrentStep = useCateringStore((s) => s.setCurrentStep)

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showSuccessModal, setShowSuccessModal] = React.useState(false)
  const [termsAccepted, setTermsAccepted] = React.useState(false)

  // 2. Carga de Productos (Solo usamos las categorías oficiales)
  const { products: entreesData } = useProducts('entrees')
  const { products: viandesData } = useProducts('viandes')
  const { products: allDesserts } = useProducts('desserts') // Solo plural, como debe ser

  // 3. Buscamos los seleccionados
  const selectedEntreesList = useMemo(() =>
    entreesData.filter(p => entreesIds?.includes(p.id)),
    [entreesData, entreesIds])

  const selectedViandesList = useMemo(() =>
    viandesData.filter(p => viandesIds?.includes(p.id)),
    [viandesData, viandesIds])

  const selectedDessertItem = useMemo(() => {
    if (!dessertId) return null
    // Buscamos el ID exacto en la lista descargada
    return allDesserts.find(p => p.id === dessertId)
  }, [allDesserts, dessertId])

  const getSelectedMateriel = useMemo(() => {
    return extras.equipment?.map(id => materielLabels[id]).filter(Boolean) || []
  }, [extras.equipment])

  // Lógica de Envío
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
      event_type: contact.eventType || null,
      address: contact.address || null,
      guest_count: contact.guestCount || 0,
      menu_type: menu.type || null,
      entrees: entreesIds || [],
      viandes: viandesIds || [],
      dessert: dessertId || null,
      extras: extras || {},
      status: 'pending' as const
    }

    try {
      const { data, error } = await supabase
        .from('catering_orders')
        .insert([payload])
        .select('id')

      if (error) throw error

      const orderId = data?.[0]?.id
      logger.log('✅ Commande enregistrée, id:', orderId)
      setShowSuccessModal(true)

      // Procesos async (Emails, Presupuesto)
      const commonBody = {
        orderId,
        contactData: { ...contact },
        menuType: menu.type,
        entrees: selectedEntreesList.map(p => p.name),
        viandes: selectedViandesList.map(p => p.name),
        dessert: selectedDessertItem?.name,
        extras: extras
      }

      fetch('/api/generate-budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commonBody)
      }).catch(console.error)

      fetch('/api/send-order-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...commonBody,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          eventDate: contact.eventDate,
          eventType: contact.eventType,
          guestCount: contact.guestCount,
          address: contact.address
        })
      }).catch(console.error)

    } catch (error) {
      console.error(error)
      alert("Une erreur s'est produite lors de l'envoi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const ProductImage = ({ url, alt }: { url: string | null, alt: string }) => (
    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100">
      {url ? (
        <Image src={url} alt={alt} fill className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">Img</div>
      )}
    </div>
  )

  return (
    <>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        clientEmail={contact.email}
        clientName={contact.name}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
        <div className="text-center mb-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Résumé de votre commande</h3>
          <p className="text-gray-600 text-sm">Vérifiez les détails de votre asado sur-mesure avant l&apos;envoi</p>
        </div>

        {/* INFO GENERAL */}
        <Card className="border border-gray-200 shadow-sm max-w-6xl mx-auto">
          <CardHeader className="pb-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-gray-900">Informations générales</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)} className="text-orange-600 h-7 px-2"><Edit className="w-3.5 h-3.5 mr-1" /><span className="text-xs">Menu</span></Button>
                <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)} className="text-orange-600 h-7 px-2"><Edit className="w-3.5 h-3.5 mr-1" /><span className="text-xs">Contact</span></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex gap-2 text-sm"><span className="text-gray-500 min-w-[80px]">Nom:</span><span className="font-medium text-gray-900">{contact.name}</span></div>
                <div className="flex gap-2 text-sm"><span className="text-gray-500 min-w-[80px]">Email:</span><span className="text-gray-900">{contact.email}</span></div>
                <div className="flex gap-2 text-sm"><span className="text-gray-500 min-w-[80px]">Téléphone:</span><span className="text-gray-900">{contact.phone}</span></div>
                <div className="flex gap-2 text-sm"><span className="text-gray-500 min-w-[80px]">Invités:</span><span className="font-medium text-gray-900">{contact.guestCount} personnes</span></div>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2 text-sm"><span className="text-gray-500 min-w-[80px]">Date:</span><span className="text-gray-900">{contact.eventDate ? format(new Date(contact.eventDate), 'dd MMMM yyyy', { locale: fr }) : '-'}</span></div>
                <div className="flex gap-2 text-sm"><span className="text-gray-500 min-w-[80px]">Événement:</span><span className="text-gray-900 capitalize">{contact.eventType}</span></div>
                <div className="flex gap-2 text-sm">
                  <span className="text-gray-500 min-w-[80px]">Type menu:</span>
                  <Badge className="bg-orange-500 text-xs">{menu.type === 'dejeuner' ? 'Déjeuner' : 'Dîner'}</Badge>
                  {menu.type === 'dejeuner' && <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">-10%</Badge>}
                </div>
                <div className="flex gap-2 text-sm"><span className="text-gray-500 min-w-[80px]">Adresse:</span><span className="text-gray-900">{contact.address}</span></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MENU */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {/* ENTRÉES */}
          <Card className="h-full border border-gray-200 shadow-sm">
            <CardHeader className="pb-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-bold text-gray-900">Entrées</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setCurrentStep(3)} className="text-orange-600 h-7 px-2"><Edit className="w-3.5 h-3.5 mr-1" /><span className="text-xs">Modifier</span></Button>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {selectedEntreesList.length > 0 ? (
                selectedEntreesList.map((entree) => (
                  <div key={entree.id} className="flex items-center gap-3 text-sm">
                    <ProductImage url={entree.image_url} alt={entree.name} />
                    <span className="text-gray-900 font-medium leading-tight">{entree.name}</span>
                  </div>
                ))
              ) : <span className="text-sm text-gray-500 italic">Aucune sélection</span>}
              <Badge variant="outline" className="text-xs mt-2 bg-gray-50 w-full justify-center">{entreesIds?.length || 0}/2 sélectionnées</Badge>
            </CardContent>
          </Card>

          {/* VIANDES */}
          <Card className="h-full border border-gray-200 shadow-sm">
            <CardHeader className="pb-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-bold text-gray-900">Viandes</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setCurrentStep(4)} className="text-orange-600 h-7 px-2"><Edit className="w-3.5 h-3.5 mr-1" /><span className="text-xs">Modifier</span></Button>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {selectedViandesList.length > 0 ? (
                selectedViandesList.map((viande) => (
                  <div key={viande.id} className="flex items-start gap-3 text-sm">
                    <ProductImage url={viande.image_url} alt={viande.name} />
                    <div>
                      <p className="font-medium text-gray-900 leading-tight">{viande.name}</p>
                      <div className="flex gap-1 mt-1">
                        <Badge variant={viande.subcategory === 'premium' ? 'default' : 'secondary'} className="text-[10px] h-4 px-1">{viande.subcategory === 'premium' ? 'Premium' : 'Classique'}</Badge>
                        {viande.origin && <span className="text-[10px] text-gray-500 border px-1 rounded bg-gray-50">{viande.origin}</span>}
                      </div>
                    </div>
                  </div>
                ))
              ) : <span className="text-sm text-gray-500 italic">Aucune sélection</span>}
              <Badge variant="outline" className="text-xs mt-2 bg-gray-50 w-full justify-center">{viandesIds?.length || 0}/3 sélectionnées</Badge>
            </CardContent>
          </Card>

          {/* DESSERT */}
          <Card className="h-full border border-gray-200 shadow-sm">
            <CardHeader className="pb-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-bold text-gray-900">Dessert</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setCurrentStep(5)} className="text-orange-600 h-7 px-2"><Edit className="w-3.5 h-3.5 mr-1" /><span className="text-xs">Modifier</span></Button>
            </CardHeader>
            <CardContent className="p-4">
              {selectedDessertItem ? (
                <div className="flex items-center gap-3 text-sm">
                  <ProductImage url={selectedDessertItem.image_url} alt={selectedDessertItem.name} />
                  <span className="text-gray-900 font-medium">{selectedDessertItem.name}</span>
                </div>
              ) : <span className="text-sm text-gray-500 italic">Aucune sélection</span>}
            </CardContent>
          </Card>
        </div>

        {/* EXTRAS Y CHECKBOXES (Igual que antes) */}
        <Card className="border border-gray-200 shadow-sm max-w-6xl mx-auto">
          <CardHeader className="pb-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-bold text-gray-900">Services supplémentaires</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setCurrentStep(6)} className="text-orange-600 h-7 px-2"><Edit className="w-3.5 h-3.5 mr-1" /><span className="text-xs">Modifier</span></Button>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex justify-between p-2 bg-gray-50 rounded"><span className="text-xs font-medium">Vins rouges</span><Badge variant={extras.wines ? 'default' : 'secondary'} className="text-xs h-5">{extras.wines ? 'Oui' : 'Non'}</Badge></div>
              <div className="flex justify-between p-2 bg-gray-50 rounded"><span className="text-xs font-medium">Décoration</span><Badge variant={extras.decoration ? 'default' : 'secondary'} className="text-xs h-5">{extras.decoration ? 'Oui' : 'Non'}</Badge></div>
              <div className="flex justify-between p-2 bg-gray-50 rounded"><span className="text-xs font-medium">Matériel</span><Badge variant={getSelectedMateriel.length > 0 ? 'default' : 'secondary'} className="text-xs h-5">{getSelectedMateriel.length > 0 ? getSelectedMateriel.length : 'Aucun'}</Badge></div>
              <div className="flex justify-between p-2 bg-gray-50 rounded"><span className="text-xs font-medium">Demande sp.</span><Badge variant={extras.specialRequest ? 'default' : 'secondary'} className="text-xs h-5">{extras.specialRequest ? 'Oui' : 'Non'}</Badge></div>
            </div>
            {(getSelectedMateriel.length > 0 || extras.specialRequest) && (
              <div className="mt-3 pt-3 border-t">
                {getSelectedMateriel.length > 0 && <div className="mb-2"><span className="text-xs font-medium">Détail Matériel:</span><div className="flex flex-wrap gap-1 mt-1">{getSelectedMateriel.map((m, i) => <Badge key={i} variant="outline" className="text-[10px]">{m}</Badge>)}</div></div>}
                {extras.specialRequest && <div className="text-xs bg-orange-50 p-2 rounded text-orange-900 italic">&quot;{extras.specialRequest}&quot;</div>}
              </div>
            )}
          </CardContent>
        </Card>

        {/* CHECKBOXES FINALES */}
        <div className="text-center max-w-2xl mx-auto">
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200">
            <CardContent className="p-5 space-y-4">
              <div><h4 className="text-lg font-bold">Prêt à envoyer votre demande ?</h4><p className="text-gray-600 text-sm">Notre équipe vous contactera sous 48h.</p></div>
              <div className="flex justify-center gap-4 text-xs text-gray-600">
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-600" /> Devis gratuit</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-600" /> Réponse 48h</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-600" /> Sans engagement</span>
              </div>

              <div className="flex items-start gap-3 text-left bg-white/60 p-3 rounded border border-orange-100">
                <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(c) => setTermsAccepted(c as boolean)} className="mt-1 border-orange-500 data-[state=checked]:bg-orange-500" />
                <label htmlFor="terms" className="text-sm cursor-pointer">J&apos;ai lu et j&apos;accepte la <Link href="/politique" className="text-orange-600 underline">Politique de Confidentialité</Link></label>
              </div>

              <div className="flex items-start gap-3 text-left bg-white/60 p-3 rounded border border-orange-100">
                <Checkbox id="marketing" checked={contact.marketingConsent} onCheckedChange={(c) => updateContact({ marketingConsent: c as boolean })} className="mt-1 border-orange-500 data-[state=checked]:bg-orange-500" />
                <div className="grid gap-1"><label htmlFor="marketing" className="text-sm cursor-pointer text-gray-700">Je souhaite recevoir des offres exclusives et des nouvelles de Fuegos d&apos;azur (optionnel)</label><p className="text-xs text-gray-500">Vous pourrez vous désinscrire à tout moment.</p></div>
              </div>

              <Button onClick={handleSubmit} disabled={isSubmitting || !termsAccepted} size="lg" className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-3 shadow-md">
                {isSubmitting ? <><Clock className="w-4 h-4 mr-2 animate-spin" /> Envoi...</> : <><Send className="w-4 h-4 mr-2" /> Envoyer ma demande</>}
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </>
  )
}
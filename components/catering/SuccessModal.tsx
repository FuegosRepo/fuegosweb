'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle2, 
  Mail, 
  Clock, 
  Phone,
  X,
  Sparkles
} from 'lucide-react'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  clientEmail?: string
  clientName?: string
}

export function SuccessModal({ isOpen, onClose, clientEmail, clientName }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="border-2 border-orange-200 shadow-2xl bg-white overflow-hidden">
                {/* Header with gradient */}
                <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-6 relative overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
                  
                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Success icon with animation */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="flex justify-center mb-4"
                  >
                    <div className="bg-white rounded-full p-3 shadow-lg">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-white text-center mb-2"
                  >
                    ¡Demande envoyée !
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-orange-50 text-center text-sm"
                  >
                    Votre demande a été traitée avec succès
                  </motion.p>
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Confirmation message */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3"
                  >
                    {clientName && (
                      <p className="text-gray-700 text-center">
                        <span className="font-semibold">Merci {clientName} !</span>
                      </p>
                    )}
                    
                    <p className="text-gray-600 text-sm text-center">
                      Nous avons bien reçu votre demande de devis pour votre asado sur-mesure.
                    </p>
                  </motion.div>

                  {/* Info boxes */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-3"
                  >
                    {/* Email confirmation */}
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-900">
                          Email de confirmation envoyé
                        </p>
                        {clientEmail && (
                          <p className="text-xs text-blue-700 mt-0.5">
                            à {clientEmail}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Response time */}
                    <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <Clock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-orange-900">
                          Réponse sous 48h
                        </p>
                        <p className="text-xs text-orange-700 mt-0.5">
                          Notre équipe prépare votre devis personnalisé
                        </p>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <Phone className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-900">
                          Questions urgentes ?
                        </p>
                        <p className="text-xs text-green-700 mt-0.5">
                          Contactez-nous au +33 6 XX XX XX XX
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Features reminder */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-center gap-4 pt-2 pb-1 text-xs text-gray-500"
                  >
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                      <span>Devis gratuit</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                      <span>Sans engagement</span>
                    </div>
                  </motion.div>

                  {/* Action button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button
                      onClick={onClose}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                      size="lg"
                    >
                      Parfait, merci !
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


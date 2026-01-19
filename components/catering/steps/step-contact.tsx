'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { useCateringStore, type ContactData, type EventType } from '@/lib/catering-store'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { cn } from '@/lib/utils'

const contactSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  eventDate: z.date({
    required_error: 'Date de l\'événement requise',
  }).optional(),
  eventType: z.string().min(1, 'Type d\'événement requis'),
  address: z.string().min(5, 'Adresse complète requise'),
  guestCount: z.number().min(10, 'Minimum 10 invités requis').max(500, 'Maximum 500 invités'),
})

type ContactFormData = z.infer<typeof contactSchema>

const eventTypes = [
  { value: 'mariage', label: 'Mariage' },
  { value: 'anniversaire', label: 'Anniversaire' },
  { value: 'bapteme', label: 'Baptême' },
  { value: 'corporatif', label: 'Corporatif' },
  { value: 'autre', label: 'Autre' },
]

export function StepContact() {
  const contact = useCateringStore((s) => s.formData.contact)
  const updateContact = useCateringStore((s) => s.updateContact)
  const [open, setOpen] = React.useState(false)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      email: contact.email,
      name: contact.name,
      phone: contact.phone,
      eventDate: contact.eventDate ? new Date(contact.eventDate) : undefined,
      eventType: contact.eventType,
      address: contact.address,
      guestCount: contact.guestCount || 0,
    },
  })

  const onSubmit = (data: ContactFormData) => {
    // Validate eventType: ensure it's a valid EventType or empty string
    const validEventTypes: EventType[] = ['mariage', 'anniversaire', 'bapteme', 'corporatif', 'autre'];
    const eventType = validEventTypes.includes(data.eventType as EventType)
      ? (data.eventType as EventType)
      : '';

    const contactData: Partial<ContactData> = {
      email: data.email,
      name: data.name,
      phone: data.phone,
      eventType: eventType,
      eventDate: data.eventDate?.toISOString() || '',
      address: data.address,
      guestCount: data.guestCount || 0,
    }

    updateContact(contactData)
  }

  // Auto-save on form changes (debounced to avoid frequent updates)
  const pending = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      if (pending.current) clearTimeout(pending.current)
      pending.current = setTimeout(() => {
        // Only auto-save if we have valid data and the form is not being submitted
        if (value && Object.keys(form.formState.errors).length === 0) {
          const formData = value as ContactFormData
          // Validate eventType: ensure it's a valid EventType or empty string
          const validEventTypes: Array<EventType | ''> = ['mariage', 'anniversaire', 'bapteme', 'corporatif', 'autre', '']
          const eventType = validEventTypes.includes(formData.eventType as EventType | '') ? (formData.eventType as EventType | '') : ''

          const contactData: Partial<ContactData> = {
            email: formData.email,
            name: formData.name,
            phone: formData.phone,
            eventType: eventType,
            eventDate: formData.eventDate?.toISOString() || '',
            address: formData.address,
            guestCount: formData.guestCount || 0,
          }

          updateContact(contactData)
        }
      }, 250)
    })
    return () => {
      subscription.unsubscribe()
      if (pending.current) clearTimeout(pending.current)
    }
  }, [form, updateContact])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Adresse email *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="votre@email.com"
                      type="email"
                      {...field}
                      className="h-10 transition-all duration-200 border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 hover:border-orange-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Nom et prénom *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jean Dupont"
                      {...field}
                      className="h-10 transition-all duration-200 border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 hover:border-orange-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Téléphone *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+33 1 23 45 67 89"
                      type="tel"
                      {...field}
                      className="h-10 transition-all duration-200 border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 hover:border-orange-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Event Date */}
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => {
                // Format date for native input (YYYY-MM-DD)
                const formatForNativeInput = (date: Date | undefined) => {
                  if (!date) return ''
                  return date.toISOString().split('T')[0]
                }

                // Get tomorrow's date as minimum
                const tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                const minDate = tomorrow.toISOString().split('T')[0]

                return (
                  <FormItem className="flex flex-col overflow-hidden">
                    <FormLabel className="text-gray-700 font-medium">Date de votre événement *</FormLabel>

                    {/* Native date input for mobile - uses OS date picker (Android/iOS) */}
                    <div className="md:hidden w-full max-w-full overflow-hidden">
                      <div className="relative w-full">
                        <Input
                          type="date"
                          min={minDate}
                          value={formatForNativeInput(field.value)}
                          onChange={(e) => {
                            const dateValue = e.target.value
                            if (dateValue) {
                              // Parse the date and set to noon to avoid timezone issues
                              const [year, month, day] = dateValue.split('-').map(Number)
                              const date = new Date(year, month - 1, day, 12, 0, 0)
                              field.onChange(date)
                            } else {
                              field.onChange(undefined)
                            }
                          }}
                          className="h-12 w-full text-base transition-all duration-200 border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 hover:border-orange-300 pr-10 box-border"
                          style={{ fontSize: '16px', maxWidth: '100%' }} // Prevents iOS zoom and overflow
                        />
                        <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Custom calendar popover for desktop */}
                    <div className="hidden md:block w-full">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full h-10 pl-3 text-left font-normal transition-all duration-200 hover:bg-orange-50 hover:border-orange-300 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 border-gray-300 text-base',
                              !field.value && 'text-gray-400',
                              field.value && 'text-gray-900 font-medium'
                            )}
                            type="button"
                          >
                            {field.value ? (
                              format(field.value, 'PPP', { locale: fr })
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 shadow-lg border-gray-200"
                          align="start"
                          sideOffset={8}
                          avoidCollisions={true}
                          collisionPadding={16}
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date)
                              setOpen(false)
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* Event Type */}
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Nature de l&apos;événement *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-10 transition-all duration-200 border-gray-300 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 hover:border-orange-300">
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Guest Count */}
            <FormField
              control={form.control}
              name="guestCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Nombre d&apos;invités *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="50"
                      type="number"
                      min="10"
                      max="500"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      className="h-10 transition-all duration-200 border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 hover:border-orange-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Address - Full Width */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Adresse de l&apos;événement *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 Rue de la Paix, 75001 Paris"
                    {...field}
                    className="h-10 transition-all duration-200 border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 hover:border-orange-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-6 mt-6 border-t border-gray-200">
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <p className="text-sm text-orange-800 flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>
                  <strong>* Champs obligatoires.</strong> Toutes vos informations sont sécurisées et ne seront utilisées que pour votre commande.
                </span>
              </p>
            </div>
          </div>
        </form>
      </Form>
    </motion.div>
  )
}
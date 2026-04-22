'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { useCateringStore, type ContactData, type EventType } from '@/lib/catering-store'
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

/** Extracts YYYY-MM-DD from a local Date without UTC conversion */
function toDateString(date: Date | undefined): string {
  if (!date) return ''
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Formats Date for display as dd/mm/aaaa */
function formatForDisplay(date: Date | undefined): string {
  if (!date) return ''
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = String(date.getFullYear())
  return `${d}/${m}/${y}`
}

/** Parses dd/mm/aaaa string to Date object with strict validation */
function parseDisplayDate(value: string): Date | undefined {
  if (!value || value.length < 10) return undefined
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!match) return undefined
  
  const day = parseInt(match[1])
  const month = parseInt(match[2])
  const year = parseInt(match[3])

  // Basic range validation
  if (month < 1 || month > 12) return undefined
  if (day < 1 || day > 31) return undefined
  if (year < 2024 || year > 2100) return undefined

  // Strict date validation (handles months with < 31 days and leap years)
  const date = new Date(year, month - 1, day, 12, 0, 0)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined
  }
  
  return date
}

const contactSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  eventDate: z.date({
    required_error: 'Date de l\'événement requise',
    invalid_type_error: 'Date invalide (jj/mm/aaaa)',
  }).refine((date) => {
    // Additional validation: Date must be in the future
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
  }, 'La date doit être aujourd\'hui ou dans le futur'),
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
      eventDate: toDateString(data.eventDate),
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
            eventDate: toDateString(formData.eventDate),
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
                // Initialize local state for the input display string
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const [localValue, setLocalValue] = React.useState(formatForDisplay(field.value))

                // Keep local value in sync with field value (for form resets or external changes)
                // eslint-disable-next-line react-hooks/rules-of-hooks
                React.useEffect(() => {
                  const currentFormatted = formatForDisplay(field.value)
                  if (currentFormatted && currentFormatted !== localValue && localValue.length === 0) {
                    setLocalValue(currentFormatted)
                  }
                }, [field.value, localValue])

                return (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-gray-700 font-medium">Date de votre événement *</FormLabel>

                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="jj/mm/aaaa"
                      value={localValue}
                      onChange={(e) => {
                        const input = e.target.value
                        
                        // Only allow numbers
                        let digitsOnly = input.replace(/\D/g, '')
                        if (digitsOnly.length > 8) digitsOnly = digitsOnly.slice(0, 8)
                        
                        // Smart validation while typing
                        if (digitsOnly.length >= 1) {
                          const d1 = parseInt(digitsOnly[0])
                          if (d1 > 3) digitsOnly = '3' // Day cannot start with > 3
                        }
                        if (digitsOnly.length >= 2) {
                          const day = parseInt(digitsOnly.slice(0, 2))
                          if (day > 31) digitsOnly = '31' + digitsOnly.slice(2)
                          if (day === 0 && digitsOnly.length === 2) digitsOnly = '0' // Don't allow 00
                        }
                        if (digitsOnly.length >= 3) {
                          const m1 = parseInt(digitsOnly[2])
                          if (m1 > 1) digitsOnly = digitsOnly.slice(0, 2) + '1' // Month cannot start with > 1
                        }
                        if (digitsOnly.length >= 4) {
                          const month = parseInt(digitsOnly.slice(2, 4))
                          if (month > 12) digitsOnly = digitsOnly.slice(0, 2) + '12' + digitsOnly.slice(4)
                          if (month === 0 && digitsOnly.length === 4) digitsOnly = digitsOnly.slice(0, 2) + '0' // Don't allow 00
                        }

                        let formatted = ''
                        if (digitsOnly.length > 0) {
                          if (digitsOnly.length <= 2) {
                            formatted = digitsOnly
                          } else if (digitsOnly.length <= 4) {
                            formatted = digitsOnly.slice(0, 2) + '/' + digitsOnly.slice(2)
                          } else {
                            formatted = digitsOnly.slice(0, 2) + '/' + digitsOnly.slice(2, 4) + '/' + digitsOnly.slice(4, 8)
                          }
                        }

                        setLocalValue(formatted)
                        
                        // Only update the form state if we have a full valid date
                        if (formatted.length === 10) {
                          const dateObj = parseDisplayDate(formatted)
                          if (dateObj) {
                            field.onChange(dateObj)
                          } else {
                            // If formatted string is complete but invalid date (e.g. 31/02/2024),
                            // we send an invalid date to trigger Zod validation error
                            field.onChange(new Date('invalid'))
                          }
                        } else if (formatted.length === 0) {
                          field.onChange(undefined)
                        } else {
                        }
                      }}
                      onBlur={() => {
                        // On blur, if it's not a valid date, we can either clear it or let Zod handle it
                        // Here we just ensure the field is touched
                        field.onBlur()
                      }}
                      maxLength={10}
                      className="h-10 transition-all duration-200 border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 hover:border-orange-300 font-mono text-base"
                    />

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
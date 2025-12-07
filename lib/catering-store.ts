import { create } from 'zustand'

// Event types enum for better type safety
export type EventType = 
  | 'mariage' 
  | 'anniversaire' 
  | 'bapteme' 
  | 'corporatif' 
  | 'autre'

// Menu types for better type safety
export type MenuType = 'dejeuner' | 'diner'

export interface ContactData {
  email: string
  name: string
  phone: string
  eventDate: string
  eventType: EventType | ''
  address: string
  guestCount: number
}

export interface MenuSelection {
  type: MenuType | null
}

export interface EntreeItem {
  id: string
  name: string
  description: string
  image: string
}

export interface ViandeItem {
  id: string
  name: string
  description: string
  origin: string
  type: 'classique' | 'premium'
  image: string
}

export interface DessertItem {
  id: string
  name: string
  description: string
  image: string
}

export interface ExtraServices {
  wines: boolean
  equipment: string[]
  decoration: boolean
  specialRequest: string
  otherEquipmentDetails?: string
}

export interface CateringFormData {
  contact: ContactData
  menu: MenuSelection
  entrees: string[]
  viandes: string[]
  dessert: string | null
  extras: ExtraServices
}

export interface CateringStore {
  currentStep: number
  formData: CateringFormData
  errors: Record<string, string>
  isStepValid: (step: number) => boolean
  setCurrentStep: (step: number) => void
  updateContact: (data: Partial<ContactData>) => void
  updateMenu: (menu: MenuSelection) => void
  updateEntrees: (entrees: string[]) => void
  updateViandes: (viandes: string[]) => void
  updateDessert: (dessert: string | null) => void
  updateExtras: (extras: Partial<ExtraServices>) => void
  resetForm: () => void
  canGoNext: () => boolean
  canGoPrevious: () => boolean
  nextStep: () => void
  previousStep: () => void
  validateStep: (step: number) => Record<string, string>
  clearErrors: () => void
}

const initialFormData: CateringFormData = {
  contact: {
    email: '',
    name: '',
    phone: '',
    eventDate: '',
    eventType: '',
    address: '',
    guestCount: 0
  },
  menu: {
    type: null
  },
  entrees: [],
  viandes: [],
  dessert: null,
  extras: {
    wines: false,
    equipment: [],
    decoration: false,
    specialRequest: '',
    otherEquipmentDetails: ''
  }
}

export const useCateringStore = create<CateringStore>((set, get) => ({
  currentStep: 1,
  formData: initialFormData,
  errors: {},
  
  validateStep: (step: number) => {
    const { formData } = get()
    const errors: Record<string, string> = {}
    
    switch (step) {
      case 1: // Contact
        if (!formData.contact.email) errors.email = 'Email requis'
        if (!formData.contact.name) errors.name = 'Nom requis'
        if (!formData.contact.phone) errors.phone = 'Téléphone requis'
        if (!formData.contact.eventDate) errors.eventDate = 'Date d\'événement requise'
        if (!formData.contact.eventType) errors.eventType = 'Type d\'événement requis'
        if (!formData.contact.address) errors.address = 'Adresse requise'
        if (formData.contact.guestCount <= 0) errors.guestCount = 'Nombre d\'invités requis'
        break
      case 2: // Menu
        if (!formData.menu.type) errors.menuType = 'Type de menu requis'
        break
      case 3: // Entrees
        if (formData.entrees.length !== 2) errors.entrees = 'Veuillez sélectionner exactement 2 entrées'
        break
      case 4: // Viandes
        if (formData.viandes.length < 1) errors.viandes = 'Veuillez sélectionner au moins 1 viande'
        if (formData.viandes.length > 3) errors.viandes = 'Maximum 3 viandes autorisées'
        break
      case 5: // Desserts
        if (!formData.dessert) errors.dessert = 'Veuillez sélectionner un dessert'
        break
    }
    
    return errors
  },
  
  isStepValid: (step: number) => {
    const { validateStep } = get()
    const errors = validateStep(step)
    return Object.keys(errors).length === 0
  },
  
  clearErrors: () => {
    set({ errors: {} })
  },
  
  setCurrentStep: (step: number) => {
    set({ currentStep: step })
  },
  
  updateContact: (data: Partial<ContactData>) => {
    set((state) => ({
      formData: {
        ...state.formData,
        contact: { 
          ...state.formData.contact, 
          ...data
        }
      }
    }))
  },
  
  updateMenu: (menu: MenuSelection) => {
    set((state) => ({
      formData: {
        ...state.formData,
        menu
      }
    }))
  },
  
  updateEntrees: (entrees: string[]) => {
    set((state) => ({
      formData: {
        ...state.formData,
        entrees
      }
    }))
  },
  
  updateViandes: (viandes: string[]) => {
    set((state) => ({
      formData: {
        ...state.formData,
        viandes
      }
    }))
  },
  
  updateDessert: (dessert: string | null) => {
    set((state) => ({
      formData: {
        ...state.formData,
        dessert
      }
    }))
  },
  
  updateExtras: (extras: Partial<ExtraServices>) => {
    set((state) => ({
      formData: {
        ...state.formData,
        extras: { ...state.formData.extras, ...extras }
      }
    }))
  },
  
  resetForm: () => {
    set({ formData: initialFormData, currentStep: 1 })
  },
  
  canGoNext: () => {
    const { currentStep, isStepValid } = get()
    return currentStep < 7 && isStepValid(currentStep)
  },
  
  canGoPrevious: () => {
    const { currentStep } = get()
    return currentStep > 1
  },
  
  nextStep: () => {
    const { currentStep, canGoNext } = get()
    if (canGoNext()) {
      set({ currentStep: currentStep + 1 })
    }
  },
  
  previousStep: () => {
    const { currentStep, canGoPrevious } = get()
    if (canGoPrevious()) {
      set({ currentStep: currentStep - 1 })
    }
  }
}))
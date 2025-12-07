import { DynamicCateringForm } from '@/components/dynamic-components'
import ModernNavigation from '@/components/modern-navigation'

export default function CateringPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <ModernNavigation currentPage="contact" />
      <main>
        <DynamicCateringForm />
      </main>
    </div>
  )
}

export const metadata = {
  title: 'Asado Sur-Mesure - Catering',
  description: 'Configurez votre expérience culinaire argentine avec notre service de catering personnalisé.',
}
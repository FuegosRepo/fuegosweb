'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

type Review = {
  author: string
  date: string
  rating: number
  text: string
  isLocalGuide?: boolean
}

const REVIEWS: Review[] = [
  {
    author: 'Jenna Tounsi',
    date: 'Il y a 6 mois',
    rating: 5,
    text: "Nous recherchions un prestataire pour le brunch de notre mariage et sommes tombés sur la page de Fuegos d'Azur. Quand nous avons vu l'idée des braseros ça nous a de suite fait envie ! Jeronimo et son équipe ont fait un travail exceptionnel, ils sont d'une gentillesse incomparable, d'un professionnalisme et ont cherché à nous faire plaisir. Ils se sont adaptés à nos envies et cela s'est ressenti tout au long de la journée. Nos familles et amis étaient comblés tant la nourriture était bonne !! La cuisson de la viande était parfaite, beaucoup se sont resservis plusieurs fois 😅 Je ne suis pas du genre à laisser beaucoup de commentaires mais c'est amplement mérité, ils sont géniaux, généreux et bienveillants ! On refera appel à eux sans aucune hésitation !!",
  },
  {
    author: 'Valerie Bardine',
    date: 'Il y a 8 mois',
    rating: 5,
    isLocalGuide: true,
    text: "Très bon moment de convivialité et de découverte gustative avec un concept innovant pour nous,..tout était parfait avec des viandes et poissons excellents cuits et aromatisés à la perfection sans oublier les entrées qui nous avaient déjà réveillé les papilles !! Et surtout n'oublions pas la gentillesse et la disponibilité de Geronimo et son acolyte,..nous ne pouvons que les recommander !!!",
  },
  {
    author: 'Magali Cagnazzo',
    date: 'Il y a un an',
    rating: 5,
    text: "Traiteur choisi à l'occasion de l'anniversaire surprise de mon carnivore de chéri, et vraiment je recommande. Extrêmement ponctuels (ce qui est top quand on organise un événement), très agréables, et la nourriture était parfaite ! Hors d'œuvre au top (mention spéciale pour les petits burgers que les convives s'arrachaient), viande extraordinaire et le saumon mi-cuit était parfait ! Le brasero sur la terrasse a fait son petit effet : même le spectacle est assuré ! Vous pouvez y aller les yeux fermés ! En ce qui nous concerne, nous reviendrons !",
  },
  {
    author: 'Laure-Sophie Vian',
    date: 'Il y a 8 mois',
    rating: 5,
    text: "Nous avons fait appel à Fuegos d'Azur pour notre mariage chez nous, en extérieur, et c'était tout simplement parfait ! Le brasero a beaucoup plu à tous nos invités : c'est à la fois convivial, original et impressionnant. Les cuisiniers étaient super sympas, discrets, efficaces et très pros. Et que dire de la viande... un délice ! Côte de bœuf et picanha parfaitement cuites, tendres et savoureuses. Tout le monde s'est régalé. Merci encore pour votre professionnalisme et votre bonne humeur. On recommande les yeux fermés !",
  },
  {
    author: 'Chloé',
    date: 'Il y a 6 mois',
    rating: 5,
    isLocalGuide: true,
    text: "Vous pouvez leurs faire confiance les yeux fermés ! Les entrées, la viande, le saumon et les accompagnements étais incroyable. Nous avons reçu que des compliments de la part de nos convives ! Malgré nos soucis de dernière minutes dans notre mariage ils ont faire preuve de réactivité et d'une très grand gentillesse. Merci à Fuegos d'Azur de nous avoir régalé !! Nous recommandons plus plus plus",
  },
  {
    author: 'Aurélie Paris',
    date: 'Il y a un an',
    rating: 5,
    text: "Nous tenions sincèrement vous féliciter au nom de toutes nos équipes pour la qualité de votre travail pour notre soirée. Que ce soit pour votre professionnalisme, votre gentillesse, votre sens du service, et la qualité de la prestation, tout était parfait ! Vous avez largement contribué à la réussite de notre soirée des 10 ans de nos deux entreprises, nos clients étaient ravis. Encore un grand merci ! Nous vous souhaitons une très bonne continuation et au plaisir de se recroiser pour un nouvel évènement !",
  },
]

const TRUNCATE_LENGTH = 220

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = review.text.length > TRUNCATE_LENGTH
  const displayed = expanded || !isLong ? review.text : review.text.slice(0, TRUNCATE_LENGTH).trimEnd() + '…'

  return (
    <article className="bg-white rounded-xl shadow-sm p-6 flex flex-col h-full text-black">
      <header className="flex items-center gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0"
          style={{ backgroundColor: '#e2943a' }}
          aria-hidden="true"
        >
          {review.author.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm leading-tight truncate">{review.author}</p>
          <p className="text-xs text-gray-500 leading-tight mt-0.5">
            {review.isLocalGuide ? 'Local Guide · ' : ''}
            {review.date}
          </p>
        </div>
      </header>
      <div className="flex gap-0.5 mb-3" aria-label={`${review.rating} étoiles sur 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4"
            fill={i < review.rating ? '#e2943a' : 'none'}
            stroke={i < review.rating ? '#e2943a' : '#d1d5db'}
          />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-gray-800 flex-1 whitespace-pre-line">{displayed}</p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 text-sm font-medium self-start hover:underline"
          style={{ color: '#e2943a' }}
        >
          {expanded ? 'Lire moins' : 'Lire plus'}
        </button>
      )}
    </article>
  )
}

export default function ReviewsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {REVIEWS.map((r) => (
        <ReviewCard key={r.author} review={r} />
      ))}
    </div>
  )
}

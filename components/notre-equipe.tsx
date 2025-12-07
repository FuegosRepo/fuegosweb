'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { OptimizedImage } from './ui/optimized-image'

interface TeamMember {
  id: string
  name: string
  nationality: string
  image: string
  description: string
  speciality: string
}

const teamMembers: TeamMember[] = [
  {
    id: 'jeronimo',
    name: 'Jerónimo',
    nationality: 'Argentino',
    image: '/img-historia/jero.webp',
    description: 'Passionné par l\'art de l\'asado argentin authentique',
    speciality: 'Chef de service'
  },
  {
    id: 'agustin',
    name: 'Agustín',
    nationality: 'Uruguayo',
    image: '/img-historia/agustin.webp',
    description: 'Expert en grillades uruguayennes et service premium',
    speciality: 'Maître du brasero'
  },
  {
    id: 'martin',
    name: 'Martín',
    nationality: 'Argentino',
    image: '/img-historia/martin.webp',
    description: 'Spécialiste des saveurs argentines traditionnelles',
    speciality: 'Maître des saveurs'
  }
]

interface NotreEquipeProps {
  className?: string
}

function NotreEquipe({ className = '' }: NotreEquipeProps) {
  return (
    <section className={`py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-orange-50 to-orange-100 border-t border-orange-200 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal mb-4 sm:mb-6 text-black">
            Notre Équipe
          </h2>
          
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Trois amis unis par le rugby
          </p>
        </motion.div>

        {/* Team Photo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 sm:mb-12"
        >
          <div className="relative mx-auto flex justify-center px-4">
            <div className="relative w-full max-w-[480px] sm:max-w-[560px] lg:max-w-[600px] aspect-[4/3] rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-gray-50 to-gray-100">
              <OptimizedImage
                src="/img-historia/jero-agus-martin.webp"
                alt="Jerónimo, Agustín et Martín - Notre équipe"
                fill
                className="w-full h-full"
                imageClassName="object-cover object-center"
                sizes="(max-width: 640px) 480px, (max-width: 1024px) 560px, 600px"
                quality={85}
                placeholder="blur"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <div className="backdrop-blur-sm bg-white/10 rounded-lg border border-white/20 p-4 sm:p-6">
                  <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-semibold mb-2">
                    L&apos;équipe fondatrice
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base">
                    Unis par une passion commune pour l&apos;art culinaire sud-américain et l&apos;esprit d&apos;un équipe du rugby
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Individual Team Members */}
        <div className="flex justify-center mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: "easeOut"
                }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#e2943a]/20 w-64 sm:w-72 mx-auto">
                {/* Image Container */}
                <div className="relative bg-gradient-to-br from-stone-50 to-stone-100 overflow-hidden aspect-square w-full">
                  <OptimizedImage
                    src={member.image}
                    alt={`${member.name} - ${member.nationality}`}
                    fill
                    imageClassName="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 16rem, (max-width: 1024px) 18rem, 18rem"
                    quality={85}
                    placeholder="blur"
                  />
                
                  
                </div>
                
                {/* Content */}
                <div className="p-3 sm:p-4 lg:p-6">
                  <h3 className="text-sm sm:text-base lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#e2943a] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-[#e2943a] font-semibold text-xs sm:text-sm uppercase tracking-wide mb-2 sm:mb-3">
                    {member.speciality}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(NotreEquipe)
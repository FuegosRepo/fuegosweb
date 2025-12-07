import Link from 'next/link'
import ModernNavigation from '@/components/modern-navigation'
import { Footer } from '@/components/ui/footer'

export default function MentionsLegales() {
    return (
        <div className="min-h-screen bg-stone-50">
            <ModernNavigation />
            <div className="container mx-auto px-4 py-12 md:py-20 text-stone-800">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#e2943a]">Mentions Légales</h1>

                <div className="space-y-8 max-w-4xl">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#e2943a]">1. Éditeur du site</h2>
                        <p className="mb-2">
                            Le site internet <strong>www.fuegosdazur.com</strong> est édité par la société :
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Dénomination sociale :</strong> Fuegos d&apos;azur SAS</li>
                            <li><strong>Forme juridique :</strong> SAS (Société par Actions Simplifiée)</li>
                            <li><strong>Adresse du siège social :</strong> 3 Place Massena, 06000 Nice, France</li>
                            <li><strong>Numéro SIRET :</strong> 893 287 581 00027</li>
                            <li><strong>Numéro de TVA Intracommunautaire :</strong> FR08893287581</li>
                            <li><strong>Code NAF/APE :</strong> 5621Z - Services des traiteurs</li>
                            <li><strong>Capital Social :</strong> 2 000 €</li>
                        </ul>
                        <p className="mt-4">
                            <strong>Directeur de la publication :</strong> Jeronimo Negrotto
                        </p>
                        <p>
                            <strong>Contact :</strong> contact@fuegosdazur.com
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#e2943a]">2. Hébergement</h2>
                        <p>
                            Le site est hébergé par :
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Nom de l&apos;hébergeur :</strong> Vercel Inc.</li>
                            <li><strong>Adresse :</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, USA</li>
                            <li><strong>Site web :</strong> https://vercel.com</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#e2943a]">3. Propriété intellectuelle</h2>
                        <p>
                            L&apos;ensemble de ce site relève de la législation française et internationale sur le droit d&apos;auteur et la propriété intellectuelle.
                            Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                            La reproduction de tout ou partie de ce site sur un support électronique quel qu&apos;il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#e2943a]">4. Responsabilité</h2>
                        <p>
                            Les informations communiquées sur le site sont fournies à titre indicatif, elles sont non contractuelles et ne sauraient engager la responsabilité de Fuegos d&apos;azur SAS.
                            L&apos;éditeur se réserve le droit de modifier le contenu du site à tout moment et sans préavis.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    )
}

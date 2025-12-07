import ModernNavigation from "@/components/modern-navigation"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import Link from "next/link"
import { Footer } from "@/components/ui/footer"

export const metadata = {
  title: "Foire aux questions – Fuegos d’Azur | Traiteur au brasero sur la Côte d’Azur",
  description:
    "FAQ officielle Fuegos d’Azur: zones d’intervention, menu au feu de bois, service, matériel, personnel, options végétariennes, prix et réservation.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <ModernNavigation currentPage="faq" />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#e2943a]">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="max-w-3xl mx-auto">
            <span className="uppercase tracking-wide text-sm sm:text-base text-black font-medium">Fuegos d’Azur</span>
            <h1 className="mt-2 text-4xl sm:text-5xl lg:text-5xl font-semibold mb-4 sm:mb-6 leading-tight text-white">
              Foire aux questions
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-black leading-relaxed">
              Réponses aux questions les plus fréquentes sur nos services traiteur au brasero.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-orange-50 to-orange-100 border-t border-orange-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <Accordion type="multiple" className="divide-y">
            <AccordionItem value="q1" id="faq-q1">
              <AccordionTrigger className="text-lg sm:text-xl">
                1. Quels types d’événements proposez-vous ?
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-lg sm:text-xl leading-relaxed">
                <p className="text-gray-700 mb-4">
                  Nous organisons tous types d’événements privés et professionnels :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>🎉 mariages, anniversaires, garden parties, événements d’entreprise, lancements de marque, etc.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Partout sur la Côte d’Azur, nous créons des expériences culinaires inoubliables autour du feu.
                </p>
                <p className="text-gray-700 mt-4">
                  👉 Envie d’en savoir plus sur nos formats ?
                  {" "}
                  <Link href="/service-traiteur" className="text-orange-700 underline">Découvrez notre service traiteur</Link>.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2" id="faq-q2">
              <AccordionTrigger className="text-lg sm:text-xl">
                2. Dans quelles zones intervenez-vous ?
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-lg sm:text-xl leading-relaxed">
                <p className="text-gray-700 mb-4">Nous travaillons dans toute la Côte d’Azur, notamment à :</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>📍 Nice, Cannes, Monaco, Antibes, Grasse, Saint-Tropez et alentours.</li>
                </ul>
                <p className="text-gray-700 mt-4">Des déplacements en dehors de cette zone sont possibles selon la demande.</p>
                <p className="text-gray-700 mt-4">
                  📅 Pour vérifier la disponibilité dans votre ville, {" "}
                  <Link href="/service-traiteur" className="text-orange-700 underline">contactez-nous via la page service traiteur</Link>.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3" id="faq-q3">
              <AccordionTrigger className="text-lg sm:text-xl">
                3. Quel type de menu proposez-vous ?
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-lg sm:text-xl leading-relaxed">
                <p className="text-gray-700 mb-4">Un menu gourmand et convivial, préparé au feu de bois ! Notre formule comprend :</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Des entrées raffinées (tapas / finger food)</li>
                  <li>Un plat principal généreux avec un assortiment de viandes grillées au brasero et des accompagnements savoureux</li>
                  <li>Des sauces maison</li>
                  <li>Un dessert cuisiné au feu, pour une touche sucrée originale</li>
                </ul>
                <p className="text-gray-700 mt-4">🔥 Tout est préparé sur place, au brasero, pour garantir une saveur authentique et inimitable.</p>
                <div className="mt-6">
                  <h4 className="text-xl font-semibold mb-3" style={{ color: '#D18F43' }}>Détail du menu :</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Entrées</strong> : Servies à l’apéritif, sous forme de bouchées élégantes et gourmandes.</li>
                    <li><strong>Plats principaux</strong> : Buffet de viandes grillées (ex : bœuf, agneau, porc, volaille) + garnitures (légumes, salades, pommes de terre...) + sauces maison.</li>
                    <li><strong>Desserts</strong> : Préparés au brasero et servis à l’assiette pour clôturer le repas avec originalité.</li>
                  </ul>
                </div>
                <p className="text-gray-700 mt-4">
                  🍽️ Pour voir des exemples de formats et options, {" "}
                  <Link href="/service-traiteur" className="text-orange-700 underline">visitez la page service traiteur</Link>.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q4" id="faq-q4">
              <AccordionTrigger className="text-lg sm:text-xl">
                4. Que comprend exactement votre service ?
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-lg sm:text-xl leading-relaxed">
                <p className="text-gray-700 mb-4">Notre équipe s’occupe uniquement de la préparation des plats et du service en format buffet.</p>
                <p className="text-gray-700">👉 La vaisselle, les tables, les chaises, la décoration ou la mise en place ne sont pas inclus dans notre prestation de base.</p>
                <p className="text-gray-700 mt-4">Cependant, nous proposons :</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Un service de location de vaisselle, tables, chaises, verrerie et autres matériels</li>
                  <li>Un service de personnel de salle (serveurs/serveuses) pour : servir les boissons, débarrasser les tables, assurer le bon déroulement de l’événement</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  ✨ Besoin d’une solution clé en main ? {" "}
                  <Link href="/service-traiteur" className="text-orange-700 underline">Parlez-nous de votre événement</Link>.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q5">
              <AccordionTrigger className="text-lg sm:text-xl">
                5. Que comprend votre service (général) ?
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-lg sm:text-xl leading-relaxed">
                <p className="text-gray-700 mb-4">Nos prestations sont 100 % personnalisables, mais en général, elles incluent :</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Cuisine en direct (brasero argentin)</li>
                  <li>Équipe de cuisine</li>
                  <li>Menu sur mesure (viandes, poissons, accompagnements, sauces, options veggie et dessert)</li>
                  <li>Le matériel propre à notre travail, installation et nettoyage de notre lieu de travail</li>
                  <li>Formats possibles : cocktail dinatoire, buffet, brunch, etc.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q6" id="faq-q6">
              <AccordionTrigger className="text-lg sm:text-xl">
                6. Fournissez-vous le matériel (vaisselle, mobilier, etc.) ?
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-lg sm:text-xl leading-relaxed">
                <p className="text-gray-700 mb-4">Oui, nous proposons un service complet de location :</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Assiettes, couverts, verres</li>
                  <li>Tables, chaises, nappes, décorations</li>
                  <li>Matériel de service (présentoirs, saladiers, etc.)</li>
                </ul>
                <p className="text-gray-700 mt-4">🛠️ Attention : Si vous louez le matériel avec nous, merci de noter que la réception, l’installation (mise en place) et le rangement de celui-ci ne sont pas inclus automatiquement dans notre prestation.</p>
                <p className="text-gray-700 mt-2">👉 Si vous souhaitez que notre équipe s’en occupe, merci de nous le préciser à l’avance : un forfait de manutention sera alors appliqué et intégré à votre devis.</p>
                <p className="text-gray-700 mt-4">
                  🔗 Détails et disponibilités: {" "}
                  <Link href="/service-traiteur" className="text-orange-700 underline">voir notre page service traiteur</Link>.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q7" id="faq-q7">
              <AccordionTrigger className="text-lg sm:text-xl">
                7. Avez-vous du personnel pour servir ?
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-lg sm:text-xl leading-relaxed">
                <p className="text-gray-700 mb-4">Oui, nous pouvons fournir des serveurs/serveuses professionnels pour :</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Accueillir vos invités</li>
                  <li>Servir les plats et les boissons</li>
                  <li>Gérer le débarrassage</li>
                </ul>
                <p className="text-gray-700 mt-4">🎯 L’objectif : que vous profitiez de votre événement sans vous soucier de la logistique.</p>
                <p className="text-gray-700 mt-4">
                  👋 Demandez l&apos;option &quot;personnel de salle&quot; dans votre {" "}
                  <Link href="/service-traiteur" className="text-orange-700 underline">demande de devis</Link>.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q8" id="faq-q8">
              <AccordionTrigger className="text-lg sm:text-xl">
                8. Quel est le nombre minimum de personnes ?
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-lg sm:text-xl leading-relaxed">
                <p className="text-gray-700">En général, notre service est disponible à partir de 15 à 20 personnes, selon la formule choisie. Pour un événement plus petit, n’hésitez pas à nous contacter, nous trouvons toujours une solution adaptée.</p>
                <p className="text-gray-700 mt-4">
                  📩 Parlez-nous de votre configuration: {" "}
                  <Link href="/service-traiteur" className="text-orange-700 underline">obtenez une proposition sur mesure</Link>.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q9" id="faq-q9">
              <AccordionTrigger className="text-lg sm:text-xl">
                9. Proposez-vous des options végétariennes ou véganes ?
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-lg sm:text-xl leading-relaxed">
                <p className="text-gray-700">Oui, toujours. Nous prévoyons des alternatives végétariennes et véganes. Notre objectif : que tous vos invités se régalent.</p>
                <p className="text-gray-700 mt-4">
                  🌿 Indiquez vos préférences dans votre {" "}
                  <Link href="/service-traiteur" className="text-orange-700 underline">demande de devis</Link>.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q10" id="faq-q10">
              <AccordionTrigger className="text-lg sm:text-xl">
                10. Puis-je choisir le menu ?
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-lg sm:text-xl leading-relaxed">
                <p className="text-gray-700">Bien sûr ! Nous construisons chaque menu sur mesure, selon vos goûts, vos attentes et votre budget.</p>
                <p className="text-gray-700 mt-4">
                  🧭 Commencez ici: {" "}
                  <Link href="/service-traiteur" className="text-orange-700 underline">options et formats de menu</Link>.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q11" id="faq-q11">
              <AccordionTrigger className="text-lg sm:text-xl">
                11. Qu’est-ce qui rend Fuegos d’Azur unique ?
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-lg sm:text-xl leading-relaxed">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>🔥 Une cuisine live autour du feu, spectaculaire et conviviale</li>
                  <li>🔥 Un mélange créatif entre asado argentin et art de vivre méditerranéen</li>
                  <li>🔥 Une équipe passionnée, professionnelle et chaleureuse</li>
                  <li>🔥 Un style élégant, des produits de qualité, un service soigné</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  🤎 En savoir plus sur notre ADN: {" "}
                  <Link href="/notre-histoire" className="text-orange-700 underline">notre histoire</Link>.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q12" id="faq-q12">
              <AccordionTrigger className="text-lg sm:text-xl">
                12. Combien coûte un service traiteur ?
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-lg sm:text-xl leading-relaxed">
                <p className="text-gray-700">Nos tarifs dépendent de plusieurs critères : nombre de convives, type de menu, options, lieu, etc. 👉 Demandez votre devis gratuit via notre formulaire, réponse rapide garantie !</p>
                <p className="text-gray-700 mt-4">
                  💬 {" "}
                  <Link href="/service-traiteur" className="text-orange-700 underline">Demandez votre devis gratuit</Link>.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q13" id="faq-q13">
              <AccordionTrigger className="text-lg sm:text-xl">
                13. Quand faut-il réserver ?
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-lg sm:text-xl leading-relaxed">
                <p className="text-gray-700">Nous conseillons de réserver 6 à 8 semaines à l’avance, surtout en haute saison. Mais si votre événement est plus proche, écrivez-nous sans attendre.</p>
                <p className="text-gray-700 mt-4">
                  ⏱️ {" "}
                  <Link href="/service-traiteur" className="text-orange-700 underline">Vérifier nos disponibilités</Link>.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q14" id="faq-q14">
              <AccordionTrigger className="text-lg sm:text-xl">
                14. Comment réserver ?
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-lg sm:text-xl leading-relaxed">
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Contactez-nous via notre formulaire en ligne</li>
                  <li>On échange sur votre projet (lieu, date, ambiance, etc.)</li>
                  <li>On vous envoie une proposition personnalisée</li>
                </ol>
                <p className="text-gray-700 mt-4">
                  🚀 Prêt à vous lancer ? {" "}
                  <Link href="/service-traiteur" className="underline" style={{ color: '#e2943a' }}>Réserver / demander un devis</Link>.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <Footer />

      {/* JSON-LD FAQPage for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quels types d’événements proposez-vous ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Nous organisons tous types d’événements privés et professionnels : mariages, anniversaires, garden parties, événements d’entreprise, lancements de marque, etc. Partout sur la Côte d’Azur, nous créons des expériences culinaires inoubliables autour du feu.",
                },
              },
              {
                "@type": "Question",
                name: "Dans quelles zones intervenez-vous ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Nous travaillons dans toute la Côte d’Azur (Nice, Cannes, Monaco, Antibes, Grasse, Saint-Tropez et alentours). Des déplacements en dehors de cette zone sont possibles selon la demande.",
                },
              },
              {
                "@type": "Question",
                name: "Quel type de menu proposez-vous ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Menu au feu de bois avec entrées raffinées, plat principal généreux (viandes grillées au brasero avec accompagnements), sauces maison et dessert cuisiné au feu.",
                },
              },
              {
                "@type": "Question",
                name: "Que comprend exactement votre service ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Préparation des plats et service au buffet. Location de vaisselle et mobilier disponible. Option personnel de salle (service boissons, débarrassage) sur demande.",
                },
              },
              {
                "@type": "Question",
                name: "Que comprend votre service (général) ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Cuisine en direct au brasero, équipe de cuisine, menu sur mesure, matériel nécessaire, installation et nettoyage du poste de travail. Formats possibles : cocktail dînatoire, buffet, brunch, etc.",
                },
              },
              {
                "@type": "Question",
                name: "Fournissez-vous le matériel (vaisselle, mobilier, etc.) ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Oui, location d’assiettes, couverts, verres, tables, chaises, nappes, décorations et matériel de service. Manutention possible sur devis.",
                },
              },
              {
                "@type": "Question",
                name: "Avez-vous du personnel pour servir ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Oui, serveurs/serveuses pour accueil, service des plats et boissons, et débarrassage. Objectif : vous profiter de l’événement.",
                },
              },
              {
                "@type": "Question",
                name: "Quel est le nombre minimum de personnes ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "À partir de 15 à 20 personnes selon la formule. Pour des événements plus petits, nous proposons des solutions adaptées.",
                },
              },
              {
                "@type": "Question",
                name: "Proposez-vous des options végétariennes ou véganes ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Oui, des alternatives végétariennes et véganes sont toujours disponibles.",
                },
              },
              {
                "@type": "Question",
                name: "Puis-je choisir le menu ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Oui, chaque menu est construit sur mesure selon vos goûts, attentes et budget.",
                },
              },
              {
                "@type": "Question",
                name: "Qu’est-ce qui rend Fuegos d’Azur unique ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Cuisine live autour du feu, mélange asado argentin et art de vivre méditerranéen, équipe passionnée et style élégant avec produits de qualité.",
                },
              },
              {
                "@type": "Question",
                name: "Combien coûte un service traiteur ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Tarifs selon nombre de convives, type de menu, options et lieu. Demande de devis gratuite et réponse rapide.",
                },
              },
              {
                "@type": "Question",
                name: "Quand faut-il réserver ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Idéalement 6 à 8 semaines à l’avance, surtout en haute saison. Pour une date proche, contactez-nous rapidement.",
                },
              },
              {
                "@type": "Question",
                name: "Comment réserver ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Contact via formulaire en ligne, échange sur votre projet (lieu, date, ambiance) et envoi d’une proposition personnalisée.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  )
}
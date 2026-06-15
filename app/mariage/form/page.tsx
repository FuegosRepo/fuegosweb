import Link from "next/link"
import { CateringForm } from "@/components/catering/catering-form"
import "./mariage-form.css"

export default function MariageFormPage() {
  return (
    <div className="mariage-form-override min-h-[80vh] flex flex-col items-center justify-center px-4 py-24 bg-mariage-text/5">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="font-amsterdam-four text-5xl md:text-6xl text-mariage-text mb-4">
            Créons votre moment
          </h1>
          <p className="font-core-bandi text-mariage-text/80 text-lg">
            Personnalisez l&apos;expérience culinaire de votre mariage.
          </p>
        </div>

        <div className="font-sans">
          <CateringForm />
        </div>

        <div className="text-center mt-12">
          <Link href="/" className="font-core-bandi text-mariage-text/60 hover:text-mariage-text uppercase tracking-widest text-sm underline underline-offset-4 transition-colors">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  )
}

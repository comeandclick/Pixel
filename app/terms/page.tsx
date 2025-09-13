export default function TermsPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Conditions d'Utilisation</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Dernière mise à jour : Décembre 2024</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptation des conditions</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              En accédant et en utilisant les services de Pixel, vous acceptez et acceptez d'être lié par les termes et
              dispositions de cet accord.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Licence d'utilisation</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              L'autorisation est accordée d'utiliser temporairement les services de Pixel à des fins personnelles et non
              commerciales uniquement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Clause de non-responsabilité</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Les matériaux sur le site Web de Pixel sont fournis "en l'état". Pixel ne donne aucune garantie, expresse
              ou implicite.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Informations de contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à
              legal@pixel-tools.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

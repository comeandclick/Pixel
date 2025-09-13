export default function CookiesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Politique des Cookies</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Dernière mise à jour : Décembre 2024</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Que sont les cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Les cookies sont de petits fichiers texte qui sont placés sur votre ordinateur ou appareil mobile lorsque
              vous visitez notre site Web.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Comment nous utilisons les cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site Web, mémoriser vos préférences
              et analyser l'utilisation de notre site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Types de cookies que nous utilisons</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Cookies essentiels : Requis pour le bon fonctionnement du site Web</li>
              <li>Cookies d'analyse : Nous aident à comprendre comment les visiteurs utilisent notre site Web</li>
              <li>Cookies de préférence : Mémorisent vos paramètres et préférences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Gestion des cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vous pouvez contrôler et gérer les cookies via les paramètres de votre navigateur. Veuillez noter que la
              suppression ou le blocage des cookies peut affecter votre expérience utilisateur.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

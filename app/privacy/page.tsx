export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Politique de Confidentialité</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Dernière mise à jour : Décembre 2024</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Informations que nous collectons</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Nous collectons les informations que vous nous fournissez directement, par exemple lorsque vous créez un
              compte, utilisez nos services ou nous contactez pour obtenir de l'aide.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Comment nous utilisons vos informations</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Nous utilisons les informations que nous collectons pour fournir, maintenir et améliorer nos services,
              traiter les transactions et communiquer avec vous.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Sécurité des données</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Nous mettons en place des mesures de sécurité appropriées pour protéger vos informations personnelles
              contre l'accès non autorisé, la modification, la divulgation ou la destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Nous contacter</h2>
            <p className="text-muted-foreground leading-relaxed">
              Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à
              privacy@pixel-tools.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

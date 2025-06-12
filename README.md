# blog-frontend

## Stack technique

- **Framework principal** : [Next.js 14](https://nextjs.org/)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Formulaires** : React Hook Form + Zod
- **Rich text** : TipTap (éditeur WYSIWYG)
- **Gestion des cookies/token** : js-cookie + jwt-decode
- **HTTP client** : Axios
- **Composants UI** : Radix UI, lucide-react

## Installation

1. Cloner le dépôt
2. Installer les dépendances :

```bash
yarn install
```

3. Créer un fichier `.env.local` avec les variables suivantes :

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Développement

```bash
yarn dev
```

## Production

```bash
yarn build
yarn start
```

## Linting

```bash
yarn lint
```

## Fonctionnalités principales

- Inscription et connexion utilisateur
- Rédaction et modification d’articles avec mise en forme (TipTap)
- Affichage des articles et commentaires
- Authentification persistante via JWT
- Interface responsive et moderne

## Dépendances UI / UX

- **TailwindCSS** : design rapide et réactif
- **Radix UI** : accessibilité native et composants modulables
- **lucide-react** : icônes vectorielles modernes

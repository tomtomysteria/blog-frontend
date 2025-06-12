# Documentation Technique & Métier - blog-frontend

## Objectif du frontend

Fournir une interface utilisateur moderne, accessible et responsive pour :

- S'inscrire et se connecter
- Rédiger, consulter et modifier des articles de blog
- Lire et publier des commentaires

## Pages et composants clés

- **/login & /register** : formulaires avec validation via React Hook Form + Zod
- **/dashboard** : liste d’articles de l’utilisateur
- **/editor/[id?]** : création / édition d’un article (éditeur TipTap)
- **/article/[id]** : vue d’un article + commentaires

## Concepts techniques et librairies utilisées

### Next.js

Framework de rendu côté serveur (SSR) basé sur React. Permet la génération de pages statiques, du routing, et de l'optimisation des performances.

### React

Bibliothèque JavaScript pour construire des interfaces utilisateur. Next.js se base sur React.

### Tailwind CSS

Framework CSS utilitaire qui permet de créer des designs rapidement avec des classes prédéfinies.

### Tailwind Plugins

- `@tailwindcss/forms` : styles par défaut pour les champs de formulaire
- `@tailwindcss/typography` : pour le contenu riche (Markdown-like)
- `tailwindcss-animate` : ajoute des animations simples avec Tailwind

### React Hook Form

Permet de gérer les formulaires de manière efficace en React. Moins de re-render, validation intégrée.

### Zod

Librairie de validation de schémas TypeScript-friendly. Intégrée à React Hook Form pour valider les données utilisateurs (email, mot de passe, etc).

### TipTap

Éditeur de texte enrichi (WYSIWYG) construit sur ProseMirror. Permet à l'utilisateur d'écrire des articles formatés (gras, italique, titres, images).

### dompurify

Nettoie le HTML produit par TipTap avant envoi ou affichage pour éviter les XSS.

### Axios

Client HTTP pour effectuer les appels à l'API backend. Configure les headers automatiquement (incluant le token JWT).

### js-cookie

Permet de stocker et lire les cookies (notamment le token JWT).

### jwt-decode

Librairie pour décoder un JWT et en extraire les données (ex: ID utilisateur, expiration).

### Radix UI

Bibliothèque de composants accessibles et unstyled (dialogues, menus, tooltips) que l'on stylise via Tailwind.

### lucide-react

Jeu d'icônes modernes basé sur SVG, compatible React.

## Intégration avec le backend

- Toutes les requêtes passent par l'URL API `NEXT_PUBLIC_API_URL`
- Les routes de l’API utilisées incluent :
  - `POST /auth/login`, `POST /auth/register`
  - `GET/POST/PUT/DELETE /articles`
  - `GET/POST /comments`
- Les erreurs backend sont interceptées et affichées dans l’UI
- Le token JWT est lu depuis les cookies et ajouté dans les headers HTTP

## Expérience utilisateur

- **Formulaires** : validation dynamique avec erreurs claires
- **Accessibilité** : via Radix UI (navigable au clavier, ARIA)
- **Transitions** : animations fluides pour améliorer l’UX (via Tailwind animate)

## Points de vigilance

- Gérer proprement l'expiration du token JWT (redirection vers /login)
- Assainir le HTML TipTap avant envoi ou rendu
- Gérer les erreurs d'appel API (403, 401, etc.) pour afficher des messages explicites à l'utilisateur

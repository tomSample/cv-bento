# 🎨 CV Bento - Portfolio Minimaliste Bilingue

Portfolio moderne et minimaliste avec design long-scroll, animations fluides et support bilingue FR/EN.

## ✨ Features

### 🌍 Internationalisation
- Support complet FR/EN avec `next-intl`
- Bouton de changement de langue en temps réel
- URLs localisées (`/en`, `/fr`)
- Traductions complètes de tout le contenu

### 🎭 Design & UX
- **Navigation fixe** : Menu pill desktop + hamburger mobile
- **Barre de progression** : Indicateur visuel du scroll
- **Curseur personnalisé** : Dot + ring avec animations fluides
- **Parallax effects** : Titre hero avec scroll parallax
- **Micro-interactions** : Hover/tap animations sur tous les éléments
- **Timeline visuelle** : Affichage chronologique de l'expérience
- **Badges de compétences** : Skills interactifs avec hover effects
- **Photo de profil** : Placeholder avec initiales et gradient

### ♿ Accessibilité
- **WCAG AA compliant** : Standards d'accessibilité respectés
- **Skip links** : Navigation clavier optimisée
- **Focus visible** : États de focus bien marqués
- **Touch targets** : Minimum 44x44px partout
- **Reduced motion** : Support des préférences utilisateur
- **Screen reader friendly** : ARIA labels et structure sémantique

### 🚀 Performance
- **Font preloading** : Fonts optimisées avec `display: swap`
- **Lazy loading** : Animations chargées au scroll (Framer Motion)
- **Reduced motion** : Désactivation automatique si préféré
- **Optimized animations** : GPU-accelerated (transform/opacity)
- **Mobile-first** : Design responsive performant

### 🎨 Animations
- Parallax scroll effects (Framer Motion)
- Spring physics pour le curseur
- Stagger animations sur les badges
- whileInView pour lazy loading
- Hover/tap micro-interactions
- AnimatePresence pour le menu mobile

## 🛠️ Tech Stack

- **Framework** : Next.js 16.0.1 (App Router, Turbopack)
- **React** : 19.x
- **Styling** : Tailwind CSS v4 (@theme inline)
- **Animations** : Framer Motion
- **i18n** : next-intl v3
- **Icons** : Lucide React
- **TypeScript** : Full type safety
- **Fonts** : Geist Sans & Geist Mono

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour production
npm run build

# Démarrer en production
npm start
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## 📁 Structure du Projet

```
cv-bento/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Routes localisées
│   │   │   ├── layout.tsx     # Layout avec i18n
│   │   │   └── page.tsx       # Page principale
│   │   ├── globals.css        # Styles globaux + CSS vars
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Redirect vers locale
│   ├── components/
│   │   ├── custom-cursor.tsx  # Curseur personnalisé
│   │   ├── language-switcher.tsx  # Toggle FR/EN
│   │   ├── minimal-portfolio.tsx  # Composant principal
│   │   └── navigation.tsx     # Navigation fixe
│   ├── i18n/
│   │   ├── request.ts         # Config next-intl
│   │   └── routing.ts         # Routes i18n
│   └── proxy.ts               # Middleware Next.js 16
├── messages/
│   ├── en.json                # Traductions anglaises
│   └── fr.json                # Traductions françaises
├── public/                    # Assets statiques
└── package.json
```

## 🎯 Sections du Portfolio

1. **Hero** : Titre avec parallax, photo de profil, CTA "Hire Me"
2. **About** : Présentation avec statistiques
3. **Experience** : Timeline visuelle des expériences professionnelles
4. **Skills** : Badges interactifs par catégorie (Frontend, Backend, Tools)
5. **Contact** : Liens email, GitHub, LinkedIn avec animations
6. **Footer** : Copyright et crédits

## 🌈 Personnalisation

### Modifier les couleurs

Éditer `src/app/globals.css` :

```css
:root {
  --background: #ffffff;
  --foreground: #000000;
  --accent-primary: #2563eb;  /* Changer ici */
}
```

### Ajouter du contenu

Éditer les fichiers de traduction :
- `messages/en.json` pour l'anglais
- `messages/fr.json` pour le français

### Modifier le design

Le composant principal est dans `src/components/minimal-portfolio.tsx`.
Les styles Tailwind peuvent être modifiés directement dans les classes.

## 📝 Features Détaillées

### Navigation
- **Desktop** : Menu pill centré avec indicateur de section active
- **Mobile** : Hamburger menu avec slide-in drawer
- **Scroll progress** : Barre de progression en haut de la page
- **Skip link** : Lien "Skip to content" pour accessibilité

### Curseur Personnalisé
- Dot central (2px) + ring (32px)
- Agrandissement au hover des liens/boutons
- Caché automatiquement sur appareils tactiles
- Spring animations pour fluidité

### Timeline d'Expérience
- Ligne verticale avec dots
- Hover effect : dot scale + border-left coloré
- Grid responsive (mobile stack, desktop grid)
- Animation stagger par job

### Badges de Compétences
- Conversion de listes en badges interactifs
- Hover : scale + shadow + border-color
- Tap feedback : scale down
- Animation stagger au scroll
- Flex-wrap responsive

### Optimisations Performance
- Font preloading avec display swap
- Preconnect aux CDNs
- Lazy loading via whileInView
- Reduced motion support
- GPU-accelerated animations

## 🔧 Configuration

### Next.js 16
Le projet utilise Next.js 16 avec **proxy.ts** au lieu de middleware.ts :

```typescript
// src/proxy.ts
import { createI18nMiddleware } from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createI18nMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

### Tailwind CSS v4
Configuration inline avec `@theme` :

```css
@theme inline {
  --color-black: #000000;
  --color-white: #ffffff;
  /* ... */
}
```

## 🎨 Design System

### Typographie
- **Hero** : 6xl → 8xl → 9xl
- **Sections** : 5xl → 6xl
- **Subtitles** : 2xl → 4xl
- **Body** : lg (18px)
- **Labels** : sm (14px)

### Espacement
- **Sections** : py-16 md:py-32
- **Titres** : mb-20
- **Paragraphes** : mb-12
- **Grid gaps** : gap-8, gap-12, gap-16

### Palette
- **Base** : Noir/Blanc/Gris (50-900)
- **Accents** : Blue-500, Blue-600, Blue-700
- **Backgrounds** : White, Gray-50

## 📱 Responsive Breakpoints

- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

Tous les éléments sont mobile-first avec breakpoints `md:` et `lg:`.

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
vercel deploy
```

### Build local

```bash
npm run build
npm start
```

Le site sera accessible sur `http://localhost:3000`.

## 📄 License

MIT License - Feel free to use for your own portfolio!

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou PR.

## 📞 Contact

Pour toute question, consultez le fichier `IMPROVEMENTS.md` pour voir toutes les améliorations implémentées.

---

**Développé avec** ❤️ **par GitHub Copilot**
**Design** : Minimaliste long-scroll responsive
**i18n** : FR/EN avec next-intl
**Animations** : Framer Motion


A modern, colorful portfolio website built with Next.js 15, featuring a Bento Grid layout with glassmorphism effects and vibrant animations.

## 🎨 Design Features

- **Bento Grid Layout**: Asymmetric grid system inspired by Apple and Figma
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Colorful Palette**: 
  - Primary: Indigo (#6366f1)
  - Secondary: Pink (#ec4899)
  - Accent: Amber (#f59e0b)
  - Tertiary: Teal (#14b8a6)
- **Animated Mesh Gradients**: Dynamic background with radial gradients
- **3D Hover Effects**: Cards with subtle rotation and scale animations
- **Colored Shadows**: Shadows that match the card's color theme

## 🚀 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS with custom theme
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon set

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📁 Project Structure

```
cv-bento/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with fonts
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles & custom CSS
│   └── components/
│       ├── bento-card.tsx   # Reusable glassmorphic card
│       └── bento-grid.tsx   # Main grid layout with all sections
├── public/                  # Static assets
└── package.json
```

## 🎯 Sections

1. **Hero** - Large card with name, title, and CTAs
2. **About** - Medium card with brief introduction
3. **Contact** - Small card with email and social links
4. **Experience** - Three cards showing work history
5. **Skills** - Wide card with tech stack tags

## 🎭 Customization

### Colors
Edit `src/app/globals.css` to change the color palette:

```css
--color-primary: #6366f1;    /* Indigo */
--color-secondary: #ec4899;  /* Pink */
--color-accent: #f59e0b;     /* Amber */
--color-tertiary: #14b8a6;   /* Teal */
```

### Content
Edit `src/components/bento-grid.tsx` to update:
- Personal information
- Work experience
- Skills and tech stack
- Contact details

### Layout
Modify the grid layout in `bento-grid.tsx` using Tailwind's grid classes:
- `md:col-span-X` - Column width
- `md:row-span-X` - Row height
- Reorder cards as needed

## ✨ Features

- 🎨 Funky, modern design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast performance with Next.js
- 🎭 Smooth animations with Framer Motion
- 🌈 Vibrant color scheme
- 💎 Glassmorphism effects
- 🔥 3D hover interactions
- 🌊 Animated mesh gradient background

## 📝 License

Feel free to use this template for your own portfolio!

---

Built with ❤️ using Next.js and Tailwind CSS

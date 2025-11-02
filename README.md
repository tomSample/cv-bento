# CV-Bento - Funky Portfolio with Bento Grid

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

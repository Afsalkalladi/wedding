import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        ivory: 'hsl(var(--ivory))',
        cream: 'hsl(var(--cream))',
        sage: {
          DEFAULT: 'hsl(var(--sage))',
          dark: 'hsl(var(--sage-dark))',
          light: 'hsl(var(--sage-light))',
        },
        gold: {
          DEFAULT: 'hsl(var(--gold))',
          soft: 'hsl(var(--gold-soft))',
        },
        champagne: {
          DEFAULT: 'hsl(var(--champagne))',
          dark: 'hsl(var(--champagne-dark))',
          light: 'hsl(var(--champagne-light))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        // Latin glyphs come from the Typekit faces; Arabic falls through to
        // Amiri automatically, glyph by glyph.
        display: ['parfumerie-script', 'Amiri', 'Snell Roundhand', 'cursive'],
        script: ['parfumerie-script', 'Snell Roundhand', 'cursive'],
        body: ['mrs-eaves', 'Baskerville', 'Georgia', 'serif'],
        arabic: ['Amiri', 'Noto Naskh Arabic', 'serif'],
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        elegant: 'var(--shadow-elegant)',
        lifted: 'var(--shadow-lifted)',
      },
    },
  },
  plugins: [],
} satisfies Config

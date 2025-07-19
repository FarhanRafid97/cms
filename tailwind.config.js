/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ['class', 'class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    '.popover-content-width-same-as-its-trigger': {
      width: 'var(--radix-popover-trigger-width)',
      'max-height': 'var(--radix-popover-content-available-height)',
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        'background-new': '#F5F5F5',
        foreground: 'hsl(var(--foreground))',
        'vercel-seconday': '#FAFAFA',
        'my-blue': '#2463EB',
        'my-green': '#21C55D',
        'my-red': '#DC2625',
        'my-orange': '#CA8A03',
        'black-shadow': '#5E6E82',
        // Custom box shadow
        'box-shadow-clean': '0px 3px 6px -2px lch(0 0 0 / 0.022), 0px 1px 1px lch(0 0 0 / 0.044)',
        // Custom border colors for clean borders
        'border-clean': 'lch(86.22 0 282.863)',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          primary: 'hsl(var(--chart-1))',
          secondary: 'hsl(var(--chart-2))',
          error: 'hsl(var(--chart-3))',
          warning: 'hsl(var(--chart-4))',
          purple: 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.1s ease-out',
        'accordion-up': 'accordion-up 0.1s ease-out',
      },
      transitionTimingFunction: {
        'ease-in-quad': 'cubic-bezier(.55, .085, .68, .53)',
        'ease-in-cubic': 'cubic-bezier(.550, .055, .675, .19)',
        'ease-in-quart': 'cubic-bezier(.895, .03, .685, .22)',
        'ease-in-quint': 'cubic-bezier(.755, .05, .855, .06)',
        'ease-in-expo': 'cubic-bezier(.95, .05, .795, .035)',
        'ease-in-circ': 'cubic-bezier(.6, .04, .98, .335)',
        'ease-out-quad': 'cubic-bezier(.25, .46, .45, .94)',
        'ease-out-cubic': 'cubic-bezier(.215, .61, .355, 1)',
        'ease-out-quart': 'cubic-bezier(.165, .84, .44, 1)',
        'ease-out-quint': 'cubic-bezier(.23, 1, .32, 1)',
        'ease-out-expo': 'cubic-bezier(.19, 1, .22, 1)',
        'ease-out-circ': 'cubic-bezier(.075, .82, .165, 1)',
        'ease-in-out-quad': 'cubic-bezier(.455, .03, .515, .955)',
        'ease-in-out-cubic': 'cubic-bezier(.645, .045, .355, 1)',
        'ease-in-out-quart': 'cubic-bezier(.77, 0, .175, 1)',
        'ease-in-out-quint': 'cubic-bezier(.86, 0, .07, 1)',
        'ease-in-out-expo': 'cubic-bezier(1, 0, 0, 1)',
        'ease-in-out-circ': 'cubic-bezier(.785, .135, .15, .86)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // PragatiPath Brand
        brand: {
          navy:    '#1a2744',   // primary text / deep headings
          blue:    '#1d4ed8',   // primary actions / CTA / nav active
          'blue-mid': '#2563eb',// hover states / links
          'blue-light': '#dbeafe', // soft blue surfaces / card bg
          'blue-xlight': '#eff6ff', // very light blue bg / page bg
        },
        // Warm Cream & Orange Design System (Clienter-inspired)
        warm: {
          50: '#FDFBF9',
          100: '#FAF8F5',
          200: '#F5F1E8',
          300: '#ECE5D8',
          400: '#DDD3C1',
          card: '#FFFFFF',
          'card-warm': '#F7F3EB',
          border: '#E8E1D5',
          'border-dark': '#D5CBB9',
          dark: '#0B1320',
          navy: '#0F1A2C',
          charcoal: '#1A2332',
          muted: '#626D7F',
        },
        accent: {
          orange: '#FF5500',
          'orange-hover': '#E64D00',
          'orange-deep': '#D44400',
          'orange-light': '#FFF2EB',
          'orange-border': '#FFD8C7',
          'orange-subtle': '#FEF7F2',
        },
        // Surfaces
        surface: {
          white:   '#ffffff',
          light:   '#f8fafc',
          muted:   '#f1f5f9',
          border:  '#e2e8f0',
          'border-strong': '#cbd5e1',
        },
        // Status Colors
        status: {
          green:        '#16a34a',
          'green-bg':   '#dcfce7',
          orange:       '#d97706',
          'orange-bg':  '#fef3c7',
          red:          '#dc2626',
          'red-bg':     '#fee2e2',
          purple:       '#7c3aed',
          'purple-bg':  '#ede9fe',
          blue:         '#2563eb',
          'blue-bg':    '#dbeafe',
          gray:         '#64748b',
          'gray-bg':    '#f1f5f9',
        },
        // Text scale
        ink: {
          primary:   '#1a2744',
          secondary: '#475569',
          muted:     '#94a3b8',
          disabled:  '#cbd5e1',
          inverse:   '#ffffff',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs':  ['0.75rem',  { lineHeight: '1rem' }],
        'sm':  ['0.875rem', { lineHeight: '1.25rem' }],
        'base':['1rem',     { lineHeight: '1.5rem' }],
        'lg':  ['1.125rem', { lineHeight: '1.75rem' }],
        'xl':  ['1.25rem',  { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem',   { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem',  { lineHeight: '2.5rem' }],
      },
      borderRadius: {
        'none': '0',
        'sm':   '0.25rem',
        DEFAULT:'0.375rem',
        'md':   '0.5rem',
        'lg':   '0.625rem',
        'xl':   '0.75rem',
        '2xl':  '1rem',
        'full': '9999px',
      },
      boxShadow: {
        'card':   '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'card-md':'0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'card-lg':'0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
        'sidebar':'2px 0 8px 0 rgb(0 0 0 / 0.06)',
        'header': '0 1px 4px 0 rgb(0 0 0 / 0.08)',
        'dropdown':'0 8px 20px -4px rgb(0 0 0 / 0.12), 0 4px 8px -4px rgb(0 0 0 / 0.08)',
        'none': 'none',
      },
      spacing: {
        '4.5':  '1.125rem',
        '13':   '3.25rem',
        '15':   '3.75rem',
        '18':   '4.5rem',
        '22':   '5.5rem',
        '64':   '16rem',     // sidebar width
        '72':   '18rem',
        '80':   '20rem',
      },
      minHeight: {
        'dvh': '100dvh',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.2s ease-out',
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        skeleton: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
      },
      zIndex: {
        'sidebar':  '40',
        'header':   '50',
        'dropdown': '60',
        'modal':    '70',
        'toast':    '80',
      },
    },
  },
  plugins: [],
}

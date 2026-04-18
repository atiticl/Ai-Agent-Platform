/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'on-tertiary-fixed-variant': '#62259b',
        'secondary-container': '#00cbe6',
        'primary-fixed': '#e9ddff',
        'on-tertiary-container': '#400071',
        'tertiary': '#ddb8ff',
        'on-secondary-fixed-variant': '#004e5a',
        'surface-tint': '#d0bcff',
        'inverse-on-surface': '#2c303a',
        'outline-variant': '#494454',
        'surface-container-highest': '#31353f',
        'primary-container': '#a078ff',
        'surface-dim': '#0f131c',
        'outline': '#958ea0',
        'on-surface': '#dfe2ef',
        'on-error': '#690005',
        'on-background': '#dfe2ef',
        'secondary-fixed-dim': '#2fd9f4',
        'tertiary-fixed': '#f0dbff',
        'on-secondary-container': '#00515d',
        'tertiary-container': '#b175ec',
        'tertiary-fixed-dim': '#ddb8ff',
        'inverse-surface': '#dfe2ef',
        'surface-container-high': '#262a34',
        'on-secondary': '#00363e',
        'surface-container-lowest': '#0a0e17',
        'secondary': '#5de6ff',
        'surface-container': '#1c1f29',
        'background': '#0f131c',
        'on-tertiary-fixed': '#2c0051',
        'on-surface-variant': '#cbc3d7',
        'on-primary-container': '#340080',
        'surface-variant': '#31353f',
        'error': '#ffb4ab',
        'secondary-fixed': '#a2eeff',
        'surface': '#0f131c',
        'surface-bright': '#353943',
        'inverse-primary': '#6d3bd7',
        'error-container': '#93000a',
        'primary': '#d0bcff',
        'primary-fixed-dim': '#d0bcff',
        'on-primary-fixed-variant': '#5516be',
        'on-primary': '#3c0091',
        'on-primary-fixed': '#23005c',
        'surface-container-low': '#181b25',
        'on-tertiary': '#490081',
        'on-error-container': '#ffdad6',
        'on-secondary-fixed': '#001f25',
        'accent': '#8B5CF6'
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px'
      },
      fontFamily: {
        headline: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Manrope', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ]
}

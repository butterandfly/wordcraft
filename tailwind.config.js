/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#F8FAF9',
          darker: '#EEF3F0',
        },
        paper: '#FFFFFF',
        slatebrand: {
          50: '#F4F7F9',
          100: '#E4ECF1',
          200: '#CADBE6',
          300: '#9FBECD',
          400: '#6D99B0',
          500: '#4A7C96',
          600: '#38637B',
          700: '#2A4C60',
          800: '#1F3847',
          900: '#162732',
        },
        sagebrand: {
          50: '#F2F8F5',
          100: '#DDEFE6',
          200: '#BFE1D0',
          300: '#94CBB2',
          400: '#64AC8C',
          500: '#438F6E',
          600: '#327256',
          700: '#265742',
        },
        warmamber: {
          50: '#FFF9F0',
          100: '#FEF0D8',
          200: '#FDDCAC',
          300: '#FCC178',
          400: '#F59E38',
          500: '#D97A1E',
          600: '#B45A12',
        },
        softpurple: {
          50: '#F7F5FB',
          100: '#ECE6F6',
          200: '#D9CCED',
          500: '#836AA8',
          700: '#5C4480',
        },
        softcoral: {
          50: '#FDF6F5',
          100: '#FCE7E4',
          500: '#D96B5B',
        }
      },
      fontFamily: {
        sans: [
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        serif: [
          'Songti SC',
          'STSong',
          'Noto Serif SC',
          'serif',
        ]
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(38, 74, 98, 0.06), 0 1px 4px -1px rgba(38, 74, 98, 0.04)',
        'soft-md': '0 6px 16px -4px rgba(38, 74, 98, 0.08), 0 2px 6px -2px rgba(38, 74, 98, 0.05)',
        'soft-lg': '0 12px 28px -6px rgba(38, 74, 98, 0.10), 0 4px 10px -3px rgba(38, 74, 98, 0.06)',
        'block-tactile': '0 4px 0 #CADBE6, 0 6px 12px rgba(0,0,0,0.06)',
        'block-active': '0 1px 0 #CADBE6, 0 2px 4px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}

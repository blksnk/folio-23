import localFont from 'next/font/local'

const fraktionMono = localFont({
  src: [
    {
      path: '../fonts/PPFraktionMono-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/PPFraktionMono-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../fonts/PPFraktionMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/PPFraktionMono-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/PPFraktionMono-Bold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/PPFraktionMono-BoldItalic.woff2',
      weight: '600',
      style: 'italic',
    }
  ],
  display: 'swap',
  fallback: ['ui-monospace', 'Menlo', 'Monaco', 'Cascadia Mono', 'Segoe UI Mono',
    'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro',
    'Fira Mono', 'Droid Sans Mono', 'Courier New', 'monospace']
})

const neueBit = localFont({
  src: [
    {
      path: '../fonts/PPNeueBit-Regular.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/PPNeueBit-Bold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap'
})

const neueMontreal = localFont({
  src: [
    {
      path: '../fonts/PPNeueMontreal-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/PPNeueMontreal-Medium.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap'
})

const fontRepo = {
  body: fraktionMono,
  title: {
    bitmap: neueBit,
    sans: neueMontreal,
  }
}

export default fontRepo
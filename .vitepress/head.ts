import fs from 'fs'
import path from 'path'

export default [
  [
    'link',
    {
      rel: 'icon',
      href: 'https://c18e-1257416358.cos.accelerate.myqcloud.com/image/32x32.png'
    }
  ],
  [
    'link',
    {
      rel: 'stylesheet',
      href: 'https://embed.trydyno.com/embedder.css'
    }
  ],
  ['meta', { name: 'theme-color', content: '#fff' }],
  ['meta', { name: 'twitter:site', content: '@rrirh' }],
  ['meta', { name: 'twitter:card', content: 'summary' }],
  [
    'meta',
    {
      name: 'twitter:image',
      content:
        'https://c18e-1257416358.cos.accelerate.myqcloud.com/image/32x32.png'
    }
  ],
  [
    'link',
    {
      rel: 'preconnect',
      href: 'https://www.tigerzh.com/document'
    }
  ],
  [
    'script',
    {},
    fs.readFileSync(path.resolve(__dirname, './scripts/index.js'), 'utf-8')
  ],
  [
    'script',
    {
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-YBC8HCMM3X'
    }
  ],
  [
    'script',
    {
      defer: true,
      src: 'https://embed.trydyno.com/embedder.js'
    }
  ]
] as any

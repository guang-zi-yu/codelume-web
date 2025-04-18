import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@codelume/theme'
import baseConfig from '@codelume/theme/config'
import { headerPlugin } from './headerMdPlugin'

const nav: ThemeConfig['nav'] = [
  {
    text: '动态壁纸',
    link: `^/wallpaper/`
  },
  {
    text: '软件下载',
    activeMatch: `^/download/`,
    items: [
      { text: '最新版本', link: '/download/' },
      { text: '历史版本', link: '/download/history' },
      { text: '软件推荐', link: '/download/recommend' }
    ]
  },
  {
    text: '关于',
    activeMatch: `^/about/`,
    items: [
      { text: '常见问题', link: '/about/faq' }
    ]
  },
  {
    text: '打赏',
    link: '/tip/'
  }
]

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  sitemap: {
    hostname: 'https://codelume.cn'
  },

  lang: 'zh-CN',
  title: '码镜(CodeLume)',
  description: '码镜(CodeLume) - MacOS 平台动态壁纸软件',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:url', content: 'https://codelume.com/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'CodeLume' }],
    [
      'meta',
      {
        property: 'og:description',
        content: '码镜(CodeLume) - MacOS 平台动态壁纸软件'
      }
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://codelume.cn/images/logo.png'
      }
    ],
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://codelume.cn'
      }
    ],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/restorePreference.js'),
        'utf-8'
      )
    ],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/uwu.js'),
        'utf-8'
      )
    ],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'ZPMMDSYA',
        'data-spa': 'auto',
        defer: ''
      }
    ],
    [
      'script',
      {
        src: 'https://vueschool.io/banner.js?affiliate=vuejs&type=top',
        async: 'true'
      }
    ]
  ],

  themeConfig: {
    nav,

    socialLinks: [
      { icon: 'bilibili', link: 'https://space.bilibili.com/389912471' },
      { icon: 'github', link: 'https://github.com/lyke3028' },
      { icon: 'douyin', link: 'https://www.douyin.com/user/MS4wLjABAAAAl1srMN6bnoQL8gBUFGUa3wQZp7KJ4WHfXyfz16Us2syzqhhKKM-iDCW64v5enW9w' }
    ],

    footer: {
      license: {
        text: '版权声明',
        link: 'https://github.com/lyke3028/CodeLume-Web#'
      },
      copyright:
        'Copyright (c) 2025-present guangziyu.'
    }
  },

  markdown: {
    theme: 'github-dark',
    config(md) {
      md.use(headerPlugin)
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  }
})

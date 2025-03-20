import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import postcssPX2viewport from 'postcss-px-to-viewport'
import { babelPluginZhReplacer } from '@ola/zh-scanner'
import babelPluginReactScopedCSS from '@ola/babel-plugin-react-scoped-css'
import rollupPluginScopedCSS from '@ola/rollup-plugin-scoped-css'
import { execSync } from 'child_process'
import { defineConfig } from 'vite'

function genBase() {
  const $ = (cmd: string) => execSync(cmd, { encoding: 'utf-8' })
  const relativePath = $('git rev-parse --show-prefix').trim()
  return `/${relativePath}`
}

// https://vitejs.dev/config/
export default defineConfig({
  // base: genBase(),
  base:'',
  plugins: [
    react({
      babel: {
        plugins: [babelPluginReactScopedCSS, babelPluginZhReplacer]
      }
    }),
    rollupPluginScopedCSS(),
    legacy({ targets: ['iOS 11', 'Android 4.4'], modernPolyfills: true })
  ],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/vite/proxy': {
        target: 'https://api.yinjietd.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/vite\/proxy/, '')
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        postcssPX2viewport({
          unitToConvert: 'px',
          viewportWidth: 750,
          unitPrecision: 5,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: [],
          minPixelValue: 2,
          mediaQuery: false,
          replace: true,
          exclude: undefined,
          include: undefined,
          landscape: false,
          landscapeUnit: 'vw',
          landscapeWidth: 568
        })
      ]
    }
  }
})

import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [preprocess(), mdsvex(mdsvexConfig)],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      strict: false
    }),
    paths: {
      base: process.argv.includes('dev') ? '' : '/evolucao-fitness'
      // base: process.env.NODE_ENV === 'production' ? '/evolucao-fitness' : ''
      // base: ''
    }
  }
}

export default config

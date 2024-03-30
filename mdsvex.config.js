import { defineMDSveXConfig as defineConfig } from 'mdsvex'
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkToc from 'remark-toc'
import remarkFootnotes from 'remark-footnotes'
import remarkGithub from 'remark-github'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const config = defineConfig({
  extensions: ['.svelte.md', '.md', '.svx'],
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }], remarkGithub, remarkFootnotes],
  rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
})

export default config

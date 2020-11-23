import path from 'path'
import { GatsbyNode } from 'gatsby'

import { localize } from '../src/i18n/localize'
import { locales } from '../src/i18n/locales'

export const onCreatePage: GatsbyNode['onCreatePage'] = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  locales.map(locale => {
    return createPage({
      ...page,
      path: localize(locale, page.path),
      context: {
        ...page.context,
        locale,
      },
    })
  })
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'Mdx') {
    if (typeof node.fileAbsolutePath !== `string`)
      throw new Error(`mdx file ${JSON.stringify(node)} not loaded correctly!`)
    const locale = path.basename(node.fileAbsolutePath, '.mdx')
    const slug = path.basename(path.dirname(node.fileAbsolutePath))
    createNodeField({ node, name: 'locale', value: locale })
    createNodeField({ node, name: 'slug', value: slug })
    createNodeField({ node, name: 'endpoint', value: `/posts/${slug}` })
  }
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const templatePath = path.resolve(
    path.dirname(__dirname),
    `src`,
    `template`,
    `blog.tsx`
  )
  const { createPage } = actions
  const blogs = await graphql<{
    blog: {
      edges: {
        node: {
          fields: { locale: string; endpoint: string }
          frontmatter: { title: string }
        }
      }[]
    }
  }>(`
    {
      blog: allMdx {
        edges {
          node {
            fields {
              locale
              endpoint
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)
  if (blogs.errors) {
    console.error(blogs.errors)
    return
  }
  const postList = blogs.data.blog.edges
  postList.forEach(({ node: post }) => {
    const endpoint = post.fields.endpoint
    const locale = post.fields.locale
    const { title } = post.frontmatter
    createPage({
      path: localize(locale, endpoint),
      component: templatePath,
      context: {
        locale,
        title,
      },
    })
  })
}

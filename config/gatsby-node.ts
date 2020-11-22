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
    const name = path.basename(path.dirname(node.fileAbsolutePath))
    createNodeField({ node, name: 'locale', value: locale })
    createNodeField({ node, name: 'name', value: name })
  }
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const template = require.resolve('./src/template/blog')
  const { createPage } = actions
  const blogs = await graphql<{
    blog: {
      edges: {
        node: {
          relativeDirectory: string
          childMdx: {
            fields: { locale: string }
            frontmatter: { title: string; author: string }
          }
        }
      }[]
    }
  }>(`
    {
      blog: allFile(filter: { sourceInstanceName: { eq: "post" } }) {
        edges {
          node {
            relativeDirectory
            childMdx {
              fields {
                locale
              }
              frontmatter {
                title
                author
                date
              }
            }
          }
        }
      }
    }
  `)
  if (blogs.errors) {
    console.log(blogs.errors)
    return
  }
  const postList = blogs.data.blog.edges
  postList.forEach(({ node: post }) => {
    const slug = post.relativeDirectory
    const locale = post.childMdx.fields.locale
    const { title, author } = post.childMdx.frontmatter
    createPage({
      path: localize(locale, `/posts/${slug}`),
      component: template,
      context: {
        locale,
        title,
        author,
      },
    })
  })
}

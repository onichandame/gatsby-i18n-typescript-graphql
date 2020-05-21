require("ts-node").register({ files: true })

const { localize } = require("./src/i18n/localize")
const { locales } = require("./src/i18n/locales")

const { basename, dirname } = require("path")

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  locales.map(locale => {
    return createPage({
      ...page,
      path: localize(locale, page.path),
      context: {
        ...page.context,
        locale
      }
    })
  })
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "Mdx") {
    const locale = basename(node.fileAbsolutePath, ".mdx")
    const name = basename(dirname(node.fileAbsolutePath))
    createNodeField({ node, name: "locale", value: locale })
    createNodeField({ node, name: "name", value: name })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const template = require.resolve("./src/template/blog")
  const { createPage } = actions
  const blogs = await graphql(`
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
        author
      }
    })
  })
}

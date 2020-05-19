require("ts-node").register({ files: true })

const { basename, dirname } = require("path")
const locales = require("./src/i18n/locales").default

exports.onCreatePage = ({ page, actions }) => {
  console.log(page.path)
  const { createPage, deletePage } = actions
  deletePage(page)
  locales.map(locale => {
    let localizedPath = locale ? `${locale}${page.path}` : page.path
    localizedPath =
      localizedPath[localizedPath.length - 1] === "/"
        ? localizedPath.substr(0, localizedPath.length - 1)
        : localizedPath

    return createPage({
      ...page,
      path: localizedPath,
      context: {
        ...page.context,
        locale
      }
    })
  })
  console.log(page.path)
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
  const template = require.resolve("./src/template/blog.tsx")
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
      path: `${locale}/posts/${slug}`,
      component: template,
      context: {
        locale,
        title,
        author
      }
    })
  })
}

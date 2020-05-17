const { basename } = require("path")
const { useIntl } = require("gatsby-plugin-intl")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "Mdx") {
    const locale = basename(node.fileAbsolutePath, ".mdx")
    createNodeField({ node, name: "locale", value: locale })
  }
}

exports.createPages = async ({ graphql, actions }) => {
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
                path
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
    const title = post.relativeDirectory
    const locale = post.childMdx.fields.locale
    createPage({
      path: `/posts/${title}/${locale}`
    })
  })
}

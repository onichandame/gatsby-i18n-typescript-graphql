import React from "react"
import { Link, graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import { Layout } from "../components/Layout"
import { Image } from "../components/Image"

const IndexPage = ({ data: { allMdx } }) => {
  const intl = useIntl()
  return (
    <Layout title="Home">
      <h1>Hi</h1>
      <p>Welcome to my site.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
      <div>
        {allMdx.edges.map(({ node: post }) => (
          <div>
            <h5>{post.frontmatter.title}</h5>
            <a href={`/posts/${post.parent.relativeDirectory}/${intl.locale}`}>
              {post.parent.relativeDirectory}
            </a>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query Toc($locale: String!) {
    allMdx(filter: { fields: { locale: { eq: $locale } } }) {
      edges {
        node {
          frontmatter {
            title
            date
          }
          fields {
            name
            locale
          }
          parent {
            ... on File {
              relativeDirectory
            }
          }
        }
      }
    }
  }
`

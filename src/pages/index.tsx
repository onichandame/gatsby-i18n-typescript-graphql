import React, { FC } from 'react'
import { graphql, PageProps } from 'gatsby'

import { Image } from '../components/Image'
import { LocalizedLink } from '../i18n'
import { TocQuery } from '../../graphql-types'

type Props = PageProps<TocQuery>

const IndexPage: FC<Props> = ({ data: { allMdx } }) => {
  return (
    <>
      <h1>Hi</h1>
      <p>Welcome to my site.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <div>
        {allMdx.edges.map(({ node: post }) => (
          <div>
            <h5>{post.frontmatter.title}</h5>
            <LocalizedLink to={`posts/${post.parent.relativeDirectory}`}>
              {post.parent.relativeDirectory}
            </LocalizedLink>
          </div>
        ))}
      </div>
    </>
  )
}

export default IndexPage

export const pageQuery = graphql`
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

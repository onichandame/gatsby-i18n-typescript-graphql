import React, { FC } from 'react'
import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { PostQuery } from '../../graphql-types'

type Props = PageProps<PostQuery>

const Post: FC<Props> = ({ data: { mdx } }) => {
  return (
    <>
      <h1>{mdx.frontmatter.title}</h1>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </>
  )
}

export default Post

export const query = graphql`
  query Post($locale: String!, $title: String!) {
    mdx(
      frontmatter: { title: { eq: $title } }
      fields: { locale: { eq: $locale } }
    ) {
      frontmatter {
        title
      }
      body
    }
  }
`

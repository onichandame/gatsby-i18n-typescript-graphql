import React, { FC } from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

type Props = {
  data: {
    mdx: {
      frontmatter: {
        title: string
      }
      body: string
    }
  }
}

const Post: FC<Props> = ({ data: { mdx } }) => {
  return (
    <div>
      <h1>{mdx.frontmatter.title}</h1>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </div>
  )
}

export default Post

export const query = graphql`
  query Post($title: String!, $locale: String!) {
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

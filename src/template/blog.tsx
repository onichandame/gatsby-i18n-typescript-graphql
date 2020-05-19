import React, { FC } from "react"
import { graphql, PageProps } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import { Layout } from "../components/Layout"

type Props = PageProps<
  {
    mdx: {
      frontmatter: {
        title: string
      }
      body: string
    }
  },
  {
    locale: string
    title: string
    author: string
  }
>

const Post: FC<Props> = ({ data: { mdx }, pageContext: { locale } }) => {
  return (
    <Layout title={mdx.frontmatter.title} locale={locale}>
      <h1>{mdx.frontmatter.title}</h1>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </Layout>
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

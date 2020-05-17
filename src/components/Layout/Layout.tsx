import React, { FC, ComponentProps } from "react"
import { useIntl } from "gatsby-plugin-intl"

import "./Layout.css"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { SEO } from "./SEO"

type Props = ComponentProps<typeof SEO>

export const Layout: FC<Props> = ({ children, ...other }) => {
  const intl = useIntl()

  return (
    <>
      <Header siteTitle={intl.formatMessage({ id: "title" })} />
      <SEO {...other} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`
        }}
      >
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

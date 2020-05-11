import React, { FC } from "react"
import PropTypes from "prop-types"
import { useIntl } from "gatsby-plugin-intl"

import Header from "./header"
import "./layout.css"

const Layout: FC = ({ children }) => {
  const intl = useIntl()

  return (
    <>
      <Header siteTitle={intl.formatMessage({ id: "title" })} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout

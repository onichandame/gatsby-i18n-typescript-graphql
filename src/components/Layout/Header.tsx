import React, { FC } from "react"
import { Link } from "gatsby"

import { Lang } from "./Lang"

type Props = {
  siteTitle?: string
}

export const Header: FC<Props> = ({ siteTitle = "" }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
      }}
    >
      <h1 style={{ display: "flex", margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <Lang />
    </div>
  </header>
)

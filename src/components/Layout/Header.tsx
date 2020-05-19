import React, { FC } from "react"

import { Lang } from "./Lang"
import { LocalizedLink } from "../../i18n/LocalizedLink"
import { useTranslation } from "../../i18n"

export const Header: FC = () => {
  const { home } = useTranslation()
  return (
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
          <LocalizedLink
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`
            }}
          >
            {home}
          </LocalizedLink>
        </h1>
        <Lang />
      </div>
    </header>
  )
}

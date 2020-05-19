import React, { FC, ComponentProps, useContext } from "react"
import { Link } from "gatsby"

import { LocaleContext, localize } from "../i18n"

type Props = ComponentProps<typeof Link>

export const LocalizedLink: FC<Props> = ({ to, ref, ...other }) => {
  const locale = useContext(LocaleContext)
  return <Link to={localize(locale, to)} {...other} />
}

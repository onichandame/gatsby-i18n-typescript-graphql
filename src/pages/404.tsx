import React, { FC, useContext } from "react"

import { LocaleContext } from "../i18n"
import { Layout } from "../components/Layout"

const NotFoundPage: FC = () => {
  const locale = useContext(LocaleContext)

  return (
    <Layout title="404: Not found" locale={locale}>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

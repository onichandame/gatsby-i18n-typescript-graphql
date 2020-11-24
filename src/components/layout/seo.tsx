import React, { FC } from "react"
import { Helmet } from "react-helmet"
import { useTranslation } from "../../i18n"

type Props = {
  title: string
  description?: string
  lang?: string
  meta?: []
}

export const SEO: FC<Props> = ({
  description = "",
  lang = "en",
  meta = [],
  title
}) => {
  const { home, author } = useTranslation()

  const metaDescription = description || ""

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={`${home}-${title}`}
      titleTemplate={`%s | ${home}`}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: author
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        }
      ].concat(meta)}
    />
  )
}

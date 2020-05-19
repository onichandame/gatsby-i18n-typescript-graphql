import React, { createContext, useContext } from "react"
import { graphql, useStaticQuery } from "gatsby"

import locales from "./locales"

export { locales }
export const defaultLocale = locales[0]

export const LocaleContext = createContext(defaultLocale)

export const useTranslation = (): {
  locale: string
  translations: { [key: string]: string }
} => {
  const currentLocale = useContext(LocaleContext)
  const { rawData } = useStaticQuery(query)
  const simplified = rawData.edges.map(({ node: { name, translations } }) => ({
    locale: name,
    translations
  }))
  const result = simplified.filter(({ locale }) => locale === currentLocale)[0]
  return result
}

const query = graphql`
  query useTranslations {
    rawData: allFile(filter: { sourceInstanceName: { eq: "translations" } }) {
      edges {
        node {
          name
          translations: childTranslationsJson {
            title
          }
        }
      }
    }
  }
`

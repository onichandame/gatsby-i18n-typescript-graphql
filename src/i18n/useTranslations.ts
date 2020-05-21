import { useContext } from "react"
import { graphql, useStaticQuery } from "gatsby"

import { LocaleContext } from "./LocaleContext"

export const useTranslation = (): { [key: string]: string } => {
  const currentLocale = useContext(LocaleContext)
  const { rawData } = useStaticQuery(query)
  const simplified = rawData.edges.map(({ node: { name, translations } }) => ({
    locale: name,
    translations
  }))
  const result = simplified.filter(({ locale }) => locale === currentLocale)[0]
  return result.translations
}

const query = graphql`
  query useTranslations {
    rawData: allFile(filter: { sourceInstanceName: { eq: "translations" } }) {
      edges {
        node {
          name
          translations: childTranslationsJson {
            home
            author
            error404
            error404_desc
          }
        }
      }
    }
  }
`

import { createContext } from "react"

import { defaultLocale } from "./locales"

const LocaleContext = createContext<string>(defaultLocale)
export { LocaleContext }

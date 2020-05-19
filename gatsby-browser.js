const React = require("react")
const { localize } = require("./src/i18n/localize")
const { locales } = require("./src/i18n/locales")

exports.wrapPageElement = ({ element, props }, pluginOptions) => {
  if (typeof window !== "undefined") {
    const paths = window.location.pathname.split("/").filter(path => !!path)
    if (paths.length) {
      if (locales.indexOf(paths[0]) < 0) {
        window.location.replace(localize("en", window.location.pathname))
      }
    } else {
      window.location.replace(localize("en", window.location.pathname))
    }
  }
  return <div>{element}</div>
}

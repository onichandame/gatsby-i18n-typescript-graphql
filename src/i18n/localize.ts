export const localize = (...subpaths: string[]) => {
  let result = ""
  subpaths = subpaths.map(subpath =>
    subpath[0] === "/" ? subpath.substr(1, subpath.length) : subpath
  )
  subpaths = subpaths.map(subpath =>
    subpath[subpaths.length - 1] === "/"
      ? subpath.substr(0, subpath.length - 1)
      : subpath
  )
  result = subpaths.join("/")
  result = "/" + result
  return result
}

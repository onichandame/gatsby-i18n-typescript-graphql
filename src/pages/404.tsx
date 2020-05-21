import React, { FC } from "react"

import { useTranslation } from "../i18n"

const NotFoundPage: FC = () => {
  const trans = useTranslation()

  return (
    <>
      <h1>{trans["404"]}</h1>
      <p>{trans["404_desc"]}</p>
    </>
  )
}

export default NotFoundPage

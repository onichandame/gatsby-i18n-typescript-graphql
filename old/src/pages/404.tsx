import React, { FC } from "react"

import { useTranslation } from "../i18n"

const NotFoundPage: FC = () => {
  const { error404, error404_desc } = useTranslation()

  return (
    <>
      <h1>{error404}</h1>
      <p>{error404_desc}</p>
    </>
  )
}

export default NotFoundPage

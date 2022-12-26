import React from "react"
import NextHead from "next/head"

function Head() {
  const title = "Alex Mazurenko - Developer"
  const description = "Web developer with experience on both sides of the stack."
  const author = "@stonekite"

  return (
    <NextHead>
      <title>{ title }</title>
      <meta property="og:title" content={ title } />
      <meta property="description" content={ description } />
      <meta property="og:description" content={ description } />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={ title } />
      <meta property="twitter:description" content={ title } />
      <meta property="twitter:creator" content={ author } />
      <meta name="google-site-verification" content="MylwfcPhMS_xj-mKDNp4ihXioejVQgjsbMjeE6Dfw7g" />
    </NextHead>
  )
}

export default Head

import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '../styles/styles.css'

library.add(fab, fas)

// suppress warnings concerning useLayoutEffect during static generation
if (typeof window === "undefined") React.useLayoutEffect = () => {}

function MyApp({ Component, pageProps }) {
  return <Component { ...pageProps } />
}

export default MyApp

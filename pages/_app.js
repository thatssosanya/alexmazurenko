import React from 'react'
import '../styles/styles.css'

// import fontawesome icons
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGithub, faLinkedin, faWhatsapp, faTelegram
} from '@fortawesome/free-brands-svg-icons'
import {
  faAngleUp, faAngleDown, faAngleLeft, faAngleRight, faHouseUser, faTasks,
  faFistRaised, faUser, faAt, faEnvelope 
} from '@fortawesome/free-solid-svg-icons'
library.add(
  faGithub, faLinkedin, faWhatsapp, faTelegram, faAngleUp, faAngleDown,
  faAngleLeft, faAngleRight, faHouseUser, faTasks, faFistRaised, faUser, faAt,
  faEnvelope
)
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

// suppress warnings concerning useLayoutEffect during static generation
if (typeof window === "undefined") React.useLayoutEffect = () => {}

function MyApp({ Component, pageProps }) {
  return <Component { ...pageProps } />
}

export default MyApp

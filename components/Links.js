import React, { useMemo } from "react"
import Section from "./Section"
import PropTypes from "prop-types"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin, faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

const StyledLink = styled.a`
  color: #fff;
  font-size: 2em;

  :not(:first-child) {
    margin-left: 0.25em;
  }
`

const Links = ({ selected }) => {
  const links = useMemo(() => [
    {
      icon: faLinkedin,
      href: "https://linkedin.com/in/alexandermazurenko"
    },
    {
      icon: faGithub,
      href: "https://github.com/stonekite"
    },
    {
      icon: faWhatsapp,
      href: "https://api.whatsapp.com/send?phone=79818482332"
    },
    {
      icon: faTelegram,
      href: "https://t.me/stonekite"
    },
    {
      icon: faEnvelope,
      href: "mailto:feelsknight@gmail.com"
    }
  ], [])

  return (
    <Section selected={ selected }>
      {
        links.map(link => (
          <StyledLink
            href={ link.href }
            key={ link.href }
          >
            <FontAwesomeIcon 
              icon={ link.icon }
            />
          </StyledLink>
        ))
      }
    </Section>
  )
}

Links.propTypes = {
  selected: PropTypes.bool
}

export default Links

import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import withSection from "./withSection"

const StyledLink = styled.a`
  color: #fff;
  font-size: 2em;

  :not(:first-child) {
    margin-left: 0.25em;
  }
`

const Links = ({ links }) => {
  return (
    <>
      {
        links.map(link => (
          <StyledLink
            href={ link.href }
            key={ link.href }
          >
            <FontAwesomeIcon icon={ link.icon } />
          </StyledLink>
        ))
      }
    </>
  )
}

Links.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      icon: PropTypes.arrayOf(PropTypes.string)
    }))
}

export default withSection(Links)

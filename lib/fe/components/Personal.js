import React from "react"
import withSection from "./withSection"
import PropTypes from "prop-types"
import styled from "styled-components"

const Personal = ({ html }) => {
  return (
    <StyledContainer dangerouslySetInnerHTML={ { __html: html } } />
  )
}

const StyledContainer = styled.div`
  font-size: 0.6em;
  color: var(--white, #fff);
  background-color: var(--black, #000);
  width: 18em;
  padding: 1em;

  p {
    margin-block-start: 0;
    margin-block-end: 0.5em;

    :last-child {
      margin-block-end: 0;
    }
  }
`

Personal.propTypes = {
  html: PropTypes.string
}

export default withSection(Personal)

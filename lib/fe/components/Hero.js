import React, { useMemo } from "react"
import withSection from "./withSection"
import styled from "styled-components"
import PropTypes from "prop-types"
import TypeMe, { Delete } from "react-typeme"

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 481px) {
    display: grid;
    column-gap: 0.5em;
  }
`

const StyledTitle = styled.div`
  font-family: Montserrat;
  font-size: 1.3em;
  vertical-align: bottom;
  grid-area: 1 / 2;
`

const StyledTyping = styled.div`
  font-family: Roboto Mono;
  font-size: 0.55em;
  max-width: 20em;
  white-space: nowrap;
  overflow: hidden;
  grid-area: 2 / 2;
`

const Hero = ({ lines }) => {
  const typingLines = useMemo(() => (
    lines.reduce((a, v) => [
      ...a, v, <Delete characters={ v.length } key={ v } />
    ], [])
  ), [lines])

  return (
    <StyledContainer>
      <StyledTitle>
        Alex Mazurenko
      </StyledTitle>
      {
        typingLines &&
        <StyledTyping>
          $ <TypeMe strings={ typingLines } loop />
        </StyledTyping>
      }
    </StyledContainer>
  )
}

Hero.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.string)
}

export default withSection(Hero)

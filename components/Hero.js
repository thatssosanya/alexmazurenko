import React, { useMemo, useState, useEffect } from "react"
import Section from "./Section"
import styled from "styled-components"
import PropTypes from "prop-types"
// import { StaticImage } from "gatsby-plugin-image"
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

const Hero = ({ selected }) => {
  const [isNonPhoneWidth, setIsNonPhoneWidth] = useState(true)

  useEffect(() => {
    const matchNonPhoneWidth =  window.matchMedia("(min-width: 481px)")
    const handler = (e) => setIsNonPhoneWidth(e.matches)
    matchNonPhoneWidth.addEventListener("change", handler)
  }, [])

  const lines = useMemo(() => [
    "develop --frontend --backend",
    "learn --new tech --fast",
    "perform IN_A_TEAM --or SOLO",
    "help teammates --grow"
  ], [])

  const typingLines = useMemo(() => (
    lines.reduce((acc, value) => [
      ...acc,
      value,
      <Delete characters={ value.length } />
    ], [])
  ), [lines])

  return (
    <Section selected={ selected }>
      <StyledContainer>
        {/* {
          isNonPhoneWidth ?
          <StaticImage
            src="../images/face.png"
            alt="My beautiful face"
            aspectRatio={ 1 / 1 }
            height={ 100 }
            style={{
              gridArea: "1 / 1 / 3 / 1"
            }}
          /> :
          <StaticImage
            src="../images/face.png"
            alt="My beautiful face"
            aspectRatio={ 1 / 1 }
            width={ 300 }
            style={{
              marginBottom: "1em"
            }}
          />
        } */}
        <StyledTitle>
          Alex Mazurenko
        </StyledTitle>
        <StyledTyping>
          $ <TypeMe strings={ typingLines } loop />
        </StyledTyping>
      </StyledContainer>
    </Section>
  )
}

Hero.propTypes = {
  selected: PropTypes.bool
}

export default Hero

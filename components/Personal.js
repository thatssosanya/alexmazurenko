import React from "react"
import Section from "./Section"
import PropTypes from "prop-types"
import styled from "styled-components"

const StyledContainer = styled.div`
  font-size: 0.6em;
  color: #fff;
  background-color: #000;
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

const Personal = ({ selected }) => {
  return (
    <Section selected={ selected }>
      <StyledContainer>
        <p>
          I&apos;m a young and ambitious developer currently based in Saint Petersburg, Russia.
        </p>
        <p>
          I love creating things that make peoples&apos; lives better, be it because they&apos;re useful or just plain fun.
          For that, I&apos;m always eager to learn new technologies and hone my craft.
        </p>
        <p>
          I&apos;m also good with people and consistently well liked in all teams I&apos;ve worked with.
        </p>
        <br />
        <p>
          I hope you&apos;ve enjoyed this so far, and if you have, head on over to the last page to learn more or get in touch with me. :)
        </p>
      </StyledContainer>
    </Section>
  )
}

Personal.propTypes = {
  selected: PropTypes.bool
}

export default Personal

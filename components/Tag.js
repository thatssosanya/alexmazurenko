import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const StyledTag = styled.div`
  ${ ({ inline }) => inline && "display: inline-block; margin-right: 0.2em;" }
  ${ ({ rounded }) => rounded && "border-radius: 1em;" }
  border: 1px solid currentColor;
  padding: 0 0.3em;
  height: 1.5em;
  line-height: 1.2em;
`

const Tag = React.forwardRef(({ text, inline, rounded }, ref) => {
  return (
    <StyledTag
      inline={ inline }
      rounded={ rounded }
      ref={ ref }
    >
      { text }
    </StyledTag>
  )
})

Tag.propTypes = {
  text: PropTypes.string
}

export default Tag

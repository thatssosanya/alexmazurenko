import React, { useRef, useMemo, useEffect } from "react"
import Tag from "../Tag"
import styled from "styled-components"
import PropTypes from "prop-types"
import Xarrow from "react-xarrows"

const StyledSkill = styled.div`
  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin-top: 0.3em;
  }
`

const StyledTagContainer = styled.div`
  width: 10em;
  display: flex;
`

const StyledChildren = styled.div`
  display: flex;
  flex-direction: column;
`

const Skill = React.forwardRef(({ name, children }, forwardedRef) => {
  const childrenEntries = useMemo(() => Object.entries(children), [children])

  const ref = useRef(null)
  const refs = useRef(Array(childrenEntries.length).fill().map(() => React.createRef(null)))

  const result = (
    <StyledSkill>
      <StyledTagContainer>
        <Tag
          text={ name }
          ref={ forwardedRef || ref }
        />
      </StyledTagContainer>
      <StyledChildren>
      {
        childrenEntries.map(([name, children], i) => (
          <React.Fragment key={ name }>
            <Skill
              name={ name }
              children={ children }
              ref={ refs.current[i] }
            />
            <Xarrow
              start={ forwardedRef || ref }
              end={ refs.current[i] }
              color="#fff"
              startAnchor="right"
              endAnchor="left"
              strokeWidth={ 2 }
              headSize={ 0 }
              curveness={ 0.4 }
            />
          </React.Fragment>
        ))
      }
      </StyledChildren>
    </StyledSkill>
  )

  return result
})

Skill.propTypes = {
  name: PropTypes.string,
  children: PropTypes.any
}

export default Skill

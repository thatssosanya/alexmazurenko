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

const Skill = React.forwardRef(({ name, childSkills }, forwardedRef) => {
  const childEntries = useMemo(() => Object.entries(childSkills), [childSkills])

  const ref = useRef(null)
  const refs = useRef(Array(childEntries.length).fill().map(() => React.createRef(null)))

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
        childEntries.map(([name, children], i) => (
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

Skill.displayName = "Skill"

Skill.propTypes = {
  name: PropTypes.string,
  children: PropTypes.any
}

export default Skill

import React from "react"
import withSection from "../withSection"
import styled from "styled-components"
import PropTypes from "prop-types"
import Skill from "./Skill"

const StyledContainer = styled.div`
  font-size: 0.35em;
`

const Skills = ({ skills }) => {
  return (
    <StyledContainer>
      {
        Object.entries(skills).map(([name, childSkills]) => (
          <Skill
            name={ name }
            childSkills={ childSkills }
            key={ name }
          />
        ))
      }
    </StyledContainer>
  )
}

Skills.propTypes = {
  skills: PropTypes.object,
}

export default withSection(Skills)

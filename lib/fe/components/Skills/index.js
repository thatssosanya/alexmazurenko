import React from "react"
import withSection from "../withSection"
import styled from "styled-components"
import PropTypes from "prop-types"
import Skill from "./Skill"

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

const StyledContainer = styled.div`
  font-size: 0.35em;
`

Skills.propTypes = {
  skills: PropTypes.object,
}

export default withSection(Skills)

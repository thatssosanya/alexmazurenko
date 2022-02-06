import React, { useMemo } from "react"
import Section from "../Section"
import styled from "styled-components"
import PropTypes from "prop-types"
import Skill from "./Skill"

const StyledContainer = styled.div`
  font-size: 0.4em;
`

const Skills = ({ selected }) => {
  const skills = useMemo(() => ({
    "Frontend": {
      "React": {
        "Next": {},
        "Gatsby": {},
        "styled-components": {}
      },
      "TypeScript": {},
      "ES6+": {},
      "Vue": {},
      "Redux": {
        "redux-saga": {}
      },
      "Sass": {}
    },
    "Backend": {
      "Python": {
        "Django": {},
        "Bottle": {},
        "Selenium": {},
        "Beautiful Soup": {},
        "PIL": {}
      },
      "Node.js": {
        "Next": {},
        "knex": {}
      },
      "C#": {
        ".NET 5": {},
        ".NET Core": {},
        ".NET MVC": {}
      },
      "DB": {
        "PostgreSQL": {},
        "MongoDB": {},
        "MS SQL Server": {}
      }
    },
    "Also": {
      "C2 English": {},
      "git": {},
      "Docker": {},
      "Linux": {}
    }
  }), [])

  return (
    <Section selected={ selected }>
      <StyledContainer>
        {
          Object.entries(skills).map(([name, children]) => (
            <Skill
              name={ name }
              children={ children }
              key={ name }
            />
          ))
        }
      </StyledContainer>
    </Section>
  )
}

Skills.propTypes = {
  selected: PropTypes.bool
}

export default Skills

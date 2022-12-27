import React, { useState } from "react"
import withSection from "../withSection"
import Project from "./Project"
import PropTypes from "prop-types"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const StyledIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  transition: opacity 0.3s;
  ${ ({ disabled }) => disabled && "opacity: 0; cursor: default;" }
`

const StyledCarousel = styled.div`
  font-size: 0.55em;
  margin: 0 0.5em;
  width: 18em;
  overflow: hidden;
  display: flex;
  align-items: stretch;
`

const Projects = ({ projects }) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)

  const handleSetSelectedProjectIndex = (value) => 
    setSelectedProjectIndex(Math.min(Math.max(value, 0), projects.length - 1))

  return (
    <>
      <StyledIcon
        icon={ ["fas", "angle-left"] }
        onClick={ () => handleSetSelectedProjectIndex(selectedProjectIndex - 1) }
        disabled={ selectedProjectIndex === 0 }
      />
      <StyledCarousel>
        {
          projects.map((project, i) => (
            <Project
              project={ project }
              selected={ i === selectedProjectIndex }
              key={ i }
            />
          ))
        }
      </StyledCarousel>
      <StyledIcon
        icon={ ["fas", "angle-right"] }
        onClick={ () => handleSetSelectedProjectIndex(selectedProjectIndex + 1) }
        disabled={ selectedProjectIndex === projects.length - 1 }
      />
    </>
  )
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    github: PropTypes.arrayOf(PropTypes.string),
    collaborators: PropTypes.arrayOf(PropTypes.string),
    when: PropTypes.string,
    description: PropTypes.string,
    frontend: PropTypes.arrayOf(PropTypes.string),
    backend: PropTypes.arrayOf(PropTypes.string),
    other: PropTypes.arrayOf(PropTypes.string),
  }))
}

export default withSection(Projects)
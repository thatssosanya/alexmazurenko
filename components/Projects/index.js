import React, { useState, useMemo } from "react"
import Section from "../Section"
import Project from "./Project"
import PropTypes from "prop-types"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"

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

const Projects = ({ selected }) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)

  const projects = useMemo(() => [
    {
      // imgSrc: "/images/projects/face.png",
      title: "Supasession",
      collaborators: ["seenyat"],
      github: ["/stonekite/supasession"],
      when: "November 2022 (in development)",
      description: "Extension for Spicetify (Spotify desktop client modding platform) plus companion app " +
        "for the ultimate IRL Social Session experience.",
      frontend: ["React", "Tailwind"],
      backend: ["Node.js", "socket.io"]
    },
    {
      // imgSrc: "/images/projects/face.png",
      title: "Bright Data",
      when: "Commercial, April 2022 - Current",
      description: "Frontend and backend work focusing around the control panel (stats and such) " +
        "and third-party service integrations.",
      frontend: ["React", "Sass"],
      backend: ["Node.js", "Express", "MongoDB"]
    },
    {
      // imgSrc: "/images/projects/face.png",
      title: "thomas-says",
      collaborators: ["ooohrayyy"],
      github: [
        "/ooohrayyy/thomas-says",
        "/stonekite/thomas-says-api",
        "/stonekite/thomas-says-bot"
      ],
      when: "February 2022",
      description: "A fun Tampermonkey extension that replaces ClickUp quotes with your own quotes - " +
        "we did our Project Manager's quotes. Plus, a Telegram bot to respond to messages with relevant quotes.",
      frontend: ["ES6"],
      backend: ["Node.js", "Next", "knex", "PostgreSQL"]
    },
    {
      // imgSrc: "/images/projects/face.png",
      title: "This website",
      github: ["/stonekite/alexmazurenko"],
      when: "January 2022",
      description: "Looks fun, huh? :)",
      frontend: ["React", "Next", "styled-components"]
    },
    {
      // imgSrc: "/images/projects/face.png",
      title: "eshkoleso_bot",
      github: ["/stonekite/eshkoleso_bot"],
      when: "January 2022",
      description: "A Telegram bot that reminds you to take your meds on time and quizzes you on the effects.",
      backend: ["Python", "MongoDB", "python-telegram-bot", "Google Time Zone API"]
    },
    {
      // imgSrc: "/images/projects/face.png",
      title: "innoscripta",
      when: "Commercial, November 2021 - April 2022",
      description: "Frontend work ranging from fixing bugs and refactoring existing apps " +
        "to implementing all-new functionality in a very dynamic startup environment.",
      frontend: ["React", "Redux", "Sass"]
    },
    {
      // imgSrc: "/images/projects/face.png",
      title: "Odoo",
      when: "Commercial, March 2021 - November 2021",
      description: "Building custom Odoo modules on both sides of the stack for Odoo clients. " + 
        "Technical analysis and time estimates. " +
        "Knowledge flow with teammates.",
      frontend: ["Owl.js (Vue-like)", "Sass"],
      backend: ["Odoo.py (Django-like)", "PostgreSQL"]
    },
    {
      // imgSrc: "/images/projects/face.png",
      title: "herzen-ics",
      github: ["/arseniiarsenii/herzen-schedule-to-ics"],
      when: "April 2021",
      description: "My friend's app that parses their university's schedule page and converts " +
        "it to an .ics file. I did the frontend and also helped with the backend.",
      frontend: ["ES6", "Bootstrap"],
      backend: ["Python", "Bottle", "BeautifulSoup4"]
    },
    {
      // imgSrc: "/images/projects/face.png",
      title: "NSYS Tools",
      when: "Commercial, January 2020 - March 2021",
      description: "Developing new apps, refactoring old monolithic apps to microservices, performing " +
        "framework version and data shape migrations.",
      frontend: ["ES6", "Vue", "Bootstrap", "Less"],
      backend: ["C#", ".NET MVC", ".NET Core", "EF", "MS SQL"]
    }
  ], [])

  const handleSetSelectedSectionIndex = (value) => 
    setSelectedProjectIndex(Math.min(Math.max(value, 0), projects.length - 1))

  return (
    <Section selected={ selected }>
      <StyledIcon
        icon={ faAngleLeft }
        onClick={ () => handleSetSelectedSectionIndex(selectedProjectIndex - 1) }
        disabled={ selectedProjectIndex === 0 }
      />
      <StyledCarousel>
        {
          projects.map((project, i) => (
            <Project
              project={ project }
              selected={ selected && i === selectedProjectIndex }
              key={ i }
            />
          ))
        }
      </StyledCarousel>
      <StyledIcon
        icon={ faAngleRight }
        onClick={ () => handleSetSelectedSectionIndex(selectedProjectIndex + 1) }
        disabled={ selectedProjectIndex === projects.length - 1 }
      />
    </Section>
  )
}

Projects.propTypes = {
  selected: PropTypes.bool
}

export default Projects

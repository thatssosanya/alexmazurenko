import React, { useMemo, useState } from "react"
import Head from "../components/Head"
import Navigation from "../components/Navigation"
import Hero from "../components/Hero"
import Projects from "../components/Projects"
import Skills from "../components/Skills"
import Personal from "../components/Personal"
import Links from "../components/Links"
import HeightHandler from "../components/HeightHandler"
import KeyboardHandler from "../components/KeyboardHandler"
import { faHouseUser, faTasks, faFistRaised, faUser, faAt } from "@fortawesome/free-solid-svg-icons"

export default function Index() {
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0)

  const sections = useMemo(() => [
    Hero,
    Projects,
    Skills,
    Personal,
    Links
  ], [])

  const handleSetSelectedSectionIndex = (value) => 
    setSelectedSectionIndex(Math.min(Math.max(value, 0), sections.length - 1))

  const sectionIconsAndTitles = useMemo(() => [{
    icon: faHouseUser,
    title: ""
  }, {
    icon: faTasks,
    title: "Projects"
  }, {
    icon: faFistRaised,
    title: "Skills"
  }, {
    icon: faUser,
    title: "About me"
  }, {
    icon: faAt,
    title: "Links"
  }], [])

  return (
    <>
      <Head />
      <Navigation
        sections={ sectionIconsAndTitles }
        selectedSectionIndex={ selectedSectionIndex }
        setSelectedSectionIndex={ handleSetSelectedSectionIndex }
      />
      {
        sections.map((Section, i) => (
          <Section
            selected={ i === selectedSectionIndex }
            key={ i }
          />
        ))
      }
      <HeightHandler />
      <KeyboardHandler
        selectedSectionIndex={ selectedSectionIndex }
        setSelectedSectionIndex={ handleSetSelectedSectionIndex }
      />
    </>
  )
}

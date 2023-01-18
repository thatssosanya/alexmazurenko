import React, { useState } from "react"
import Head from "../lib/fe/components/Head"
import Hero from "../lib/fe/components/Hero"
import Projects from "../lib/fe/components/Projects"
import Skills from "../lib/fe/components/Skills"
import Personal from "../lib/fe/components/Personal"
import Links from "../lib/fe/components/Links"
import useVhWatcher from "../lib/fe/hooks/useVhWatcher"
import Navigation from "../lib/fe/components/Navigation"
import { getSectionData, getHeroLines, getProjects, getSkills, getAboutMe, getLinks } from "../lib/be/fetchers"

const Index = ({ sections }) => {
  useVhWatcher()
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null)

  return (
    <>
      <Head />
      <Navigation
        sections={ sections }
        selectedSectionIndex={ selectedSectionIndex }
        setSelectedSectionIndex={ setSelectedSectionIndex }
      />
      {
        sections.map((section, i) => {
          const Comp = titlesToComps[section.title]
          return (
            <Comp
              selected={ i === selectedSectionIndex }
              key={ i }
              { ...section.props }
            />
          )
        })
      }
    </>
  )
}

const titlesToComps = {
  "": Hero,
  "Projects": Projects,
  "Skills": Skills,
  "About me": Personal,
  "Links": Links
}

export const getStaticProps = async () => {
  const titlesToProps = {
    "": { lines: getHeroLines },
    "Projects": { projects: getProjects },
    "Skills": { skills: getSkills },
    "About me": { html: getAboutMe },
    "Links": { links: getLinks }
  }

  const sectionData = await getSectionData();
  const fullSectionData = await Promise.all(
    sectionData
      .map(async (s) => {
        const props = titlesToProps[s.title]
        return {
          ...s,
          props: await
            Object.keys(props)
              .reduce(async (a, p) => ({
                ...a,
                [p]: await (props[p]())
              }), {})
        }}))

  return {
    props: {
      sections: fullSectionData
  }}
}

export default Index

import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"

const StyledNavigation = styled.div`
  position: fixed;
  bottom: 0;
  height: 1.8rem;
  width: 100%;
  mix-blend-mode: difference;
`

const StyledBorder = styled.div`
  height: 0.1rem;
  background: linear-gradient(
    90deg,
    rgba(0,255,255,1) 0%,
    rgba(0,0,255,1) 17%,
    rgba(255,0,255,1) 33%,
    rgba(255,0,0,1) 50%,
    rgba(255,255,0,1) 67%,
    rgba(0,255,0,1) 83%,
    rgba(0,255,255,1) 100%);
`

const StyledContent = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0.3rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledIcon = styled(FontAwesomeIcon)`
  flex-shrink: 1;
  transition: opacity 0.7s;
  opacity: ${ ({ disabled }) => disabled ? "0" : "1" };
  cursor: ${ ({ disabled }) => disabled ? "default" : "pointer" };
`

const StyledItems = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7em;
`

const StyledItem = styled.div`
  color: ${ ({ selected }) => selected? "#fff" : "#999" };
  margin: 0 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 1s;
  cursor: pointer;

  @media (min-width: 320px) {
    margin: 0 0.4rem;
  }
`

const StyledTitle = styled.div`
  display: inline-block;
  overflow: hidden;
  font-family: "Montserrat";
  white-space: nowrap;
  transition: margin-left 0.7s, max-width 0.7s;
  margin-left: ${ ({ selected }) => selected ? "0.4rem" : "0" };
  max-width: ${ ({ selected }) => selected ? "100vw" : "0" };
  direction: ${ ({ selected }) => selected ? "ltr" : "rtl"};

  @media (max-width: 480px) {
    display: none;
  }
`

const Navigation = ({
  sections,
  selectedSectionIndex,
  setSelectedSectionIndex
}) => {
  const disableBack = selectedSectionIndex === 0
  const disableNext = selectedSectionIndex === sections.length - 1

  return (
    <StyledNavigation>
      <StyledBorder />
      <StyledContent>
        <StyledIcon
          icon={ faAngleUp }
          onClick={ () => setSelectedSectionIndex(selectedSectionIndex - 1) }
          disabled={ disableBack }
        />
        <StyledItems>
          { 
            sections.map(({ icon, title }, i) => {
              const selected = i === selectedSectionIndex
              return (
                <StyledItem
                  onClick={ () => setSelectedSectionIndex(i) }
                  key={ i }
                  selected={ selected }
                >
                  <StyledIcon
                    icon={ icon }
                  />
                  {
                    title &&
                    <StyledTitle selected={ selected }>
                      { title }
                    </StyledTitle>
                  }
                </StyledItem>
              )
            })
          }
        </StyledItems>
        <StyledIcon
          icon={ faAngleDown }
          onClick={ () => setSelectedSectionIndex(selectedSectionIndex + 1) }
          disabled={ disableNext }
        />
      </StyledContent>
    </StyledNavigation>
  )
}

Navigation.propTypes = {
  sectionIconsAndTitles: PropTypes.arrayOf(PropTypes.exact({
    icon: PropTypes.instanceOf(typeof faAngleDown),
    title: PropTypes.string
  })),
  selectedSectionIndex: PropTypes.number,
  setSelectedSectionIndex: PropTypes.func
}

export default Navigation

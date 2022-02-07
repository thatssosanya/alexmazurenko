import React, { useRef, useEffect } from "react"
import Tag from "../Tag"
import PropTypes from "prop-types"
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const StyledProject = styled.div`
  // ${ ({ selected }) => !selected && "display: none;" }
  width: 18em;
  padding: 1em;
  color: #fff;
  background-color: #000;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const StyledHeader = styled.div`
  ${ ({ withImg }) => withImg && "display: grid;" }
  column-gap: 0.8em;
  grid-template-columns: 1fr;
  margin-bottom: 0.5em;

  img {
    height: 4em;
    width: 4em;
    grid-area: 1 / 2;
  }

  .Title {
    grid-area: 1 / 1;
    font-size: 1.5em;
    font-family: "Montserrat";
  }

  .Github {
    grid-area: 2 / 1;
    font-size: 0.5em;

    a {
      display: block;
      color: #fff;
      text-decoration: none;
    }
  }

  .When {
    grid-area: 3 / 1;
    font-size: 0.5em;
  }
`

const StyledSection = styled.div`
  ${ ({ regularLineHeight }) => !regularLineHeight && "line-height: 1.7em;" }
  ${ ({ wideMargin }) => wideMargin && "margin-top: 1em;" }
  font-size: 0.8em;
  margin-top: 0.1em;

  :last-child {
    margin-top: auto;
  }
`

const Project = ({ project, selected }) => {
  const {
    imgSrc,
    title,
    github,
    when,
    description,
    frontend,
    backend,
    other
  } = project

  const httpsGithub = github && `https://github.com${github}`

  const ref = useRef(null)
  useEffect(() => {
    if (selected) {
      ref.current?.scrollIntoView({ block: "nearest", behavior: "smooth" })
    }
  }, [selected])

  return (
    // <StyledProject selected={ selected }>
    <StyledProject ref={ ref }>
      <StyledHeader withImg={ imgSrc }>
        {
          imgSrc &&
          <img src={ imgSrc } alt={ imgSrc } />
        }
        <div className="Title">
          { title }
        </div>
        {
          github?.length ?
          <div className="Github">
            {
              github.map(link => (
                <React.Fragment key={ link }>
                  <a
                    href={ httpsGithub }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={ faGithub } />{ link }
                  </a>
                </React.Fragment>
              ))
            }
          </div> :
          <div className="Github Github-private">
            <FontAwesomeIcon icon={ faGithub } /> Private repo
          </div>
        }
        <div className="When">
          { when }
        </div>
      </StyledHeader>
      <StyledSection regularLineHeight wideMargin>
        { description }
      </StyledSection>
      {
        (frontend?.length || backend?.length || other?.length) &&
        <StyledSection wideMargin>
        {
          frontend?.length &&
          <StyledSection>
            Frontend: {
              frontend && frontend.map((skill, i) => (
                <Tag text={ skill } inline key={ i } />
              ))
            }
          </StyledSection>
        }
        {
          backend?.length &&
          <StyledSection>
            Backend: {
              backend && backend.map((skill, i) => (
                <Tag text={ skill } inline key={ i } />
              ))
            }
          </StyledSection>
        }
        {
          other?.length &&
          <StyledSection>
            Also: {
              other && other.map((skill, i) => (
                <Tag text={ skill } inline key={ i } />
              ))
            }
          </StyledSection>
        }
        </StyledSection>
      }
    </StyledProject>
  )
}

Project.propTypes = {
  project: PropTypes.shape({
    imgSrc: PropTypes.string,
    title: PropTypes.string,
    github: PropTypes.arrayOf(PropTypes.string),
    when: PropTypes.string,
    description: PropTypes.string,
    frontend: PropTypes.arrayOf(PropTypes.string),
    backend: PropTypes.arrayOf(PropTypes.string),
    other: PropTypes.arrayOf(PropTypes.string)
  })
}

export default Project
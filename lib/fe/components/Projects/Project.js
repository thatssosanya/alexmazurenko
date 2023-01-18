import React, { useMemo, useRef, useEffect } from "react"
import Tag from "../Tag"
import PropTypes from "prop-types"
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Project = ({ project, selected }) => {
  const {
    imgSrc,
    title,
    github,
    collaborators,
    when,
    description,
    frontend,
    backend,
    other
  } = project

  const httpsGithub = useMemo(() => github?.length &&
    github.map(path => ({
      href: `https://github.com${path}`,
      path
  })), [github])

  const httpsCollaborators = useMemo(() => collaborators?.length &&
    collaborators.map(username => ({
      href: `https://github.com/${username}`,
      username
  })), [collaborators])

  const ref = useRef(null)
  useEffect(() => {
    if (selected) {
      ref.current?.scrollIntoView({ block: "nearest", behavior: "smooth" })
    }
  }, [selected])

  return (
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
          httpsCollaborators?.length &&
          <div className="Github Github-nobreak">
            Developed with {
              httpsCollaborators.map(collaborator => (
                <a
                  href={ collaborator.href } target="_blank" rel="noreferrer"
                  key={ collaborator.username }
                >
                  <FontAwesomeIcon icon={ ["fab", "github"] } /> { collaborator.username }
                </a>
              ))
            }
          </div>
        }
        {
          httpsGithub?.length ?
          <div className="Github">
            {
              httpsGithub.map(link => (
                <a
                  href={ link.href } target="_blank" rel="noreferrer"
                  key={ link.path }
                >
                  <FontAwesomeIcon icon={ ["fab", "github"] } /> { link.path }
                </a>
              ))
            }
          </div> :
          <div className="Github Github-private">
            <FontAwesomeIcon icon={ ["fab", "github"] } /> Private repo
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
        <StyledSection>
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

const StyledProject = styled.div`
  width: 18em;
  padding: 1em;
  color: var(--white, #fff);
  background-color: var(--black, #000);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const StyledHeader = styled.div`
  ${ ({ withImg }) => withImg && "display: grid;" }
  column-gap: 0.8em;
  grid-template-columns: 1fr;

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
      color: var(--white, #fff);
      text-decoration: none;
    }

    &-nobreak {
      a {
        display: inline-block;
      }
    }
  }

  .When {
    grid-area: 3 / 1;
    font-size: 0.5em;
  }
`

const StyledSection = styled.div`
  ${ ({ regularLineHeight }) => !regularLineHeight && "line-height: 1.7em;" }
  font-size: 0.8em;

  margin-top: 0.1em;
  ${ ({ wideMargin }) => wideMargin && "margin: 1em 0;"}
  :last-child {
    margin: auto 0 0;
  }
`

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
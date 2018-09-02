import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FadeIn } from '../animations'

const Playing = styled(FadeIn)`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: ${({ theme }) => `${theme.baseMargin}px`};

    h3 {
        margin: 0rem 0rem 0.5rem 0rem;
    }
    h5 {
        margin: 0rem 0rem 1rem 0rem;
    }
    div {
        display: flex;
        align-items: center;

        svg {
            margin: 0rem 3rem 0rem 3rem;
            transition: color 0.2s ease-in;
            color: ${({ theme }) => theme.secondary.dark};
        }

        svg:hover {
            color: ${({ theme }) => theme.secondary.light};
        }
    }
`

export default () => (
    <Playing initialPose="hidden" pose="visible" duration={750} delay={1750}>
        <h3>Some Song With a Long Name</h3>
        <h5>Some Artist --- Some Album</h5>
        <div>
            <FontAwesomeIcon size="3x" icon="backward" />
            <FontAwesomeIcon size="5x" icon="play-circle" />
            <FontAwesomeIcon size="3x" icon="forward" />
        </div>
    </Playing>
)

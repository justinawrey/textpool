import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FadeIn } from '../animations'

const shake = keyframes`
    10%, 90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%, 80% {
        transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
        transform: translate3d(4px, 0, 0);
    }
`

const Indented = styled.span`
    background-color: ${({ theme, phase }) =>
        phase !== 'two' ? theme.secondary.vdark : theme.primary.light};
    padding: ${({ theme }) => `${theme.baseMargin}px`};
    border-radius: ${({ theme }) => `${theme.baseRadius / 2}px`};
    font-weight: bold;
    color: ${({ theme, phase }) =>
        phase !== 'two' ? 'black' : theme.secondary.light};
`

const shared = css`
    transition: font-size 1s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1em;

    :hover {
        animation: ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        backface-visibility: hidden;
        perspective: 1000px;
        font-size: 1.1em;
    }

    h1 {
        margin-top: 0;
        text-align: center;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: center;

        i {
            margin: 0;
        }

        svg {
            margin-right: ${({ theme }) => `${theme.baseMargin * 4}px`};
        }
    }
`

const StyledNotification = styled.div`
    box-shadow: ${({ theme }) =>
        `0px 0px 0px ${theme.baseRadius}px ${theme.secondary.dark}`};
    background-color: ${({ theme }) => theme.secondary.light};
    border-radius: ${({ theme }) => `${theme.baseRadius}px`};
    padding: ${({ theme }) => `${theme.baseMargin * 4}px`};
    color: 'black';
    ${shared};
`
const StyledCornerNotification = styled(FadeIn)`
    position: fixed;
    top: 1vh;
    right: 1vw;
    color: ${({ theme }) => theme.secondary.light};
    ${shared};
`

export const Notification = ({ code }) => (
    <StyledNotification>
        <h1>There's nothing here!</h1>
        <div>
            <FontAwesomeIcon icon="mobile-alt" size="2x" />
            <i>
                Text{' '}
                <Indented phase="one">{`${code} <song> <artist>`}</Indented> to{' '}
                <strong>(778) 860-7371</strong>
            </i>
        </div>
    </StyledNotification>
)

export const CornerNotification = ({ code }) => (
    <StyledCornerNotification
        initialPose="hidden"
        pose="visible"
        delay={2500}
        duration={750}
    >
        <div>
            <FontAwesomeIcon icon="mobile-alt" size="2x" />
            <i>
                Text{' '}
                <Indented phase="two">{`${code} <song> <artist>`}</Indented> to{' '}
                <strong>(778) 860-7371</strong>
            </i>
        </div>
    </StyledCornerNotification>
)

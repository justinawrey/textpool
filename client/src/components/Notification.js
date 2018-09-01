import React, { Fragment } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

export const Indented = styled.span`
    background-color: ${({ theme, phase }) =>
        phase !== 'two' ? theme.secondary.vdark : theme.primary.light};
    padding: ${({ theme }) => `${theme.baseMargin}px`};
    border-radius: ${({ theme }) => `${theme.baseRadius / 2}px`};
    font-weight: bold;
    color: ${({ theme, phase }) =>
        phase !== 'two' ? 'black' : theme.secondary.light};
`

export default styled(Notification)`
    ${({ theme, phase }) =>
        phase !== 'two'
            ? css`
                  box-shadow: ${({ theme }) =>
                      `0px 0px 0px ${theme.baseRadius}px ${
                          theme.secondary.dark
                      }`};
                  background-color: ${({ theme }) => theme.secondary.light};
                  border-radius: ${({ theme }) => `${theme.baseRadius}px`};
                  padding: ${({ theme }) => `${theme.baseMargin * 4}px`};
                  color: 'black';
              `
            : css`
                  top: 1vh;
                  right: 1vw;
                  color: ${({ theme }) => theme.secondary.light};
              `} font-size: 1em;
    transition: font-size 1s ease-in-out;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    :hover {
        animation: ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        transform: scale(1.05);
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

export const InnerNotification = ({ phase, code }) => (
    <Fragment>
        {' '}
        {phase !== 'two' && <h1>There's nothing here!</h1>}
        <div>
            <FontAwesomeIcon icon="mobile-alt" size="2x" />
            <i>
                Text{' '}
                <Indented phase={phase}>{`${code} <song> <artist>`}</Indented>{' '}
                to <strong>(778) 860-7371</strong>
            </i>
        </div>
    </Fragment>
)

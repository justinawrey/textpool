import React from 'react'
import styled, { keyframes } from 'styled-components'

const loadRoundSpinner = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const loadSpinner = keyframes`
    0%,
    80%,
    100% {
        box-shadow: 0 0;
        height: 4em;
    }
    40% {
        box-shadow: 0 -2em;
        height: 5em;
    }
`

const RoundSpinner = styled.div`
    &,
    &:after {
        border-radius: 50%;
        width: 10em;
        height: 10em;
    }
    & {
        margin: 60px auto;
        font-size: 10px;
        position: relative;
        text-indent: -9999em;
        border-top: 1.1em solid rgba(255, 255, 255, 0.2);
        border-right: 1.1em solid rgba(255, 255, 255, 0.2);
        border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
        border-left: 1.1em solid ${({ theme }) => theme.secondary.light};
        transform: translateZ(0);
        animation: ${loadRoundSpinner} 1.1s infinite linear;
    }
`

const Spinner = styled.div`
    &,
    &:before,
    &:after {
        background-color: ${({ theme }) => theme.secondary.light};
        animation: ${loadSpinner} 1s infinite ease-in-out;
        width: 1em;
        height: 4em;
    }
    & {
        color: ${({ theme }) => theme.secondary.light};
        text-indent: -9999em;
        margin: 40px auto;
        position: relative;
        font-size: 11px;
        transform: translateZ(0);
        animation-delay: -0.16s;
    }
    &:before,
    &:after {
        position: absolute;
        top: 0;
        content: '';
    }
    &:before {
        left: -1.5em;
        animation-delay: -0.32s;
    }
    &:after {
        left: 1.5em;
    }
`

export default ({ round }) => (round ? <RoundSpinner /> : <Spinner />)

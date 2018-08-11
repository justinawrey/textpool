import React from 'react'
import posed from 'react-pose'
import styled, { keyframes } from 'styled-components'

const growAndFadeTo = (size, color) => keyframes`
    to { 
        font-size: ${size}
        color: ${color}
    };
`

const LoginAnimation = posed.h1({
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1000,
        },
    },
    hidden: {
        opacity: 0,
        y: 20,
    },
})

const LoginButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    h1 {
        display: flex;
        align-items: center;
        background-color: ${({ theme }) => theme.secondary.light};
        padding: 0.2em;
        border-radius: 0.8em;
        border: 0.2em solid ${({ theme }) => theme.secondary.dark};
        color: ${({ theme }) => theme.primary.light};
        font-size: 2em;
        transition: font-size 0.1s ease-in, color 0.1s ease-in;

        :hover {
            font-size: 2.2em;
            color: black;
            cursor: grab;
        }
    }
`

export default () => (
    <LoginButton>
        <LoginAnimation initialPose="hidden" pose="visible">
            Login with Spotify
        </LoginAnimation>
    </LoginButton>
)

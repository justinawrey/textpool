import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import SongList from './SongList'
import Code from './Code'
import Playing from './Playing'

/* Animations */

const SlideFromLeft = posed.div({
    visible: {
        x: '0%',
        transition: {
            type: 'tween',
            ease: 'easeOut',
            duration: 400,
        },
    },
    hidden: {
        x: '-100%',
    },
})

const FadeIn = posed.div({
    visible: {
        opacity: 1,
        y: 0,
        delay: 600,
        transition: {
            duration: 400,
        },
    },
    hidden: {
        opacity: 0,
        y: 20,
    },
})

/* Components - All purely for layout */

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`

const PanelLeft = styled(SlideFromLeft)`
    flex: 1;
    background-color: ${({ theme }) => theme.primary.light};
    border-radius: ${({ theme }) => `${theme.baseRadius}px`};
    margin-right: ${({ theme }) => `${theme.baseMargin}px`};
    overflow: auto;
`

const PanelRight = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    border-radius: ${({ theme }) => `${theme.baseRadius}px`};
    margin-left: ${({ theme }) => `${theme.baseMargin}px`};
`

const RightPanelTop = styled(FadeIn)`
    flex: 1;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: ${({ theme }) => theme.primary.light};
    border-radius: ${({ theme }) => `${theme.baseRadius}px`};
    margin-bottom: ${({ theme }) => `${theme.baseMargin}px`};
`

const RightPanelBottom = styled(FadeIn)`
    flex: 5;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: ${({ theme }) => theme.primary.light};
    border-radius: ${({ theme }) => `${theme.baseRadius}px`};
    margin-top: ${({ theme }) => `${theme.baseMargin}px`};
`

export default () => (
    <Container>
        <PanelLeft initialPose="hidden" pose="visible">
            <SongList />
        </PanelLeft>
        <PanelRight>
            <RightPanelTop initialPose="hidden" pose="visible">
                <Code />
            </RightPanelTop>
            <RightPanelBottom initialPose="hidden" pose="visible">
                <Playing />
            </RightPanelBottom>
        </PanelRight>
    </Container>
)

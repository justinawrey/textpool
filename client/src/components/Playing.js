import React from 'react'
import styled from 'styled-components'

const Playing = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: ${({ theme }) => `${theme.baseMargin}px`};
`

export default () => (
    <Playing initialPose="hidden" pose="visible">
        <h1>Hello Justin</h1>
    </Playing>
)

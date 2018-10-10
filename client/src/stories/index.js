import React from 'react'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faTimes,
    faMobileAlt,
    faForward,
    faBackward,
    faPlayCircle,
    faPauseCircle,
} from '@fortawesome/free-solid-svg-icons'

import Playing from '../components/Playing'
import SongList from '../components/SongList'
import PopoverGenerator, {
    WhitelistPopover,
    BlacklistPopover,
    ConfigPopover,
} from '../components/Popover'
import initialState, { createInitialStore } from './initialStates'
import Lettuce from '../themes'

injectGlobal`
    html {
        display: flex;
        width: 100%;
        height: 100%;
        font-family: 'Ropa Sans', sans-serif;
        letter-spacing: 1px;
        background-color: ${Lettuce.primary.dark};
    }

    }
    body, #root {
      display: flex;
      flex: 1;
    }
    
    body {
      margin: 0;
    }
`

const Center = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
`

library.add(
    faTimes,
    faMobileAlt,
    faForward,
    faBackward,
    faPlayCircle,
    faPauseCircle,
)

storiesOf('Playing', module)
    .addDecorator(story => (
        <ThemeProvider theme={Lettuce}>
            <Provider store={createInitialStore(initialState)}>
                {story()}
            </Provider>
        </ThemeProvider>
    ))
    .add('component', () => <Playing />)

storiesOf('Song', module)
    .addDecorator(story => (
        <ThemeProvider theme={Lettuce}>
            <Provider store={createInitialStore(initialState)}>
                {story()}
            </Provider>
        </ThemeProvider>
    ))
    .add('component', () => <SongList />)

storiesOf('Popover', module)
    .addDecorator(story => (
        <ThemeProvider theme={Lettuce}>
            <Provider store={createInitialStore(initialState)}>
                <Center>{story()}</Center>
            </Provider>
        </ThemeProvider>
    ))
    .add('config', () => {
        const Config = PopoverGenerator('times', 'click', ConfigPopover)
        return <Config />
    })
    .add('whitelist', () => {
        const WhitelistTooltip = PopoverGenerator(
            'times',
            'hover',
            WhitelistPopover,
        )
        return <WhitelistTooltip />
    })
    .add('blacklist', () => {
        const BlacklistTooltip = PopoverGenerator(
            'times',
            'hover',
            BlacklistPopover,
        )
        return <BlacklistTooltip />
    })

import React from 'react'
import { injectGlobal, ThemeProvider } from 'styled-components'

import { storiesOf } from '@storybook/react'
import Playing from '../components/Playing'
import Lettuce from '../themes'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faTimes,
    faMobileAlt,
    faForward,
    faBackward,
    faPlayCircle,
    faPause,
} from '@fortawesome/free-solid-svg-icons'

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

library.add(faTimes, faMobileAlt, faForward, faBackward, faPlayCircle, faPause)

storiesOf('Playing', module)
    .addDecorator(story => (
        <ThemeProvider theme={Lettuce}>{story()}</ThemeProvider>
    ))
    .add('component', () => <Playing />)

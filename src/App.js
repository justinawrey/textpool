import React from 'react'
import { ThemeProvider, injectGlobal } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

import Lettuce from './themes'
import Routes from './routes'

injectGlobal`
    html {
        font-family: 'Courier New', Courier, monospace;
        background-color: ${Lettuce.primary.dark};
        height: 100%;
        width: 100%;

    }
    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: ${Lettuce.primary.light};
    }
`

export default () => (
    <ThemeProvider theme={Lettuce}>
        <Router>{Routes}</Router>
    </ThemeProvider>
)

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
`

export default () => (
    <ThemeProvider theme={Lettuce}>
        <Router>{Routes}</Router>
    </ThemeProvider>
)

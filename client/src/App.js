import React, { Fragment } from 'react'
import { ThemeProvider, injectGlobal } from 'styled-components'
import { Router, Route } from 'react-router-dom'

import history from './history'
import Lettuce from './themes'
import Main from './components/Main'
import Login from './components/Login'

injectGlobal`

    html {
        font-family: 'Ropa Sans', sans-serif;
        letter-spacing: 1px;
        background-color: ${Lettuce.primary.dark};
        width: 100%;
        height: 100%;
        display: flex;
    }

    body {
        flex: 1;
        display: flex;
        overflow: hidden;
    }

    #root {
        flex: 1;
    }

    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: ${Lettuce.primary.dark};
    }
`

export default ({ code }) => (
    <ThemeProvider theme={Lettuce}>
        <Router history={history}>
            <Fragment>
                <Route exact path={'/'} component={Login} />
                <Route exact path={'/login'} component={Login} />
                <Route exact path={'/room/:code'} component={Main} />
            </Fragment>
        </Router>
    </ThemeProvider>
)

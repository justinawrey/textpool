import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Main from '../components/Main'
import Login from '../components/Login'

export default (
    <Switch>
        <Route exact path={'/'} component={Main} />
        <Route exact to={'/login'} component={Login} />
        <Route render={() => <Redirect to="/" />} />
    </Switch>
)

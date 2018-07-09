import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Main from '../components/Main'
import NoMatch from '../components/NoMatch'

export default (
   <Switch>
       <Route exact path={'/'} component={Main}/>
       {/* <Route exact to={'/login'} component={Login}/> */}
       <Route component={NoMatch}/>
   </Switch> 
)
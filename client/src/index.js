import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import App from './App'
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker'

library.add(faTimes)
const store = createStore(rootReducer, applyMiddleware(createLogger()))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
)

registerServiceWorker()

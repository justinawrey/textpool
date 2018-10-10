import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faTimes,
    faMobileAlt,
    faForward,
    faBackward,
    faPlayCircle,
    faPauseCircle,
} from '@fortawesome/free-solid-svg-icons'

import App from './App'
import rootReducer from './reducers'
import config from './config'
import watcher from './sagas'
import registerServiceWorker from './registerServiceWorker'

library.add(
    faTimes,
    faMobileAlt,
    faForward,
    faBackward,
    faPlayCircle,
    faPauseCircle,
)

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]
if (config.NODE_ENV === 'development') {
    middleware.push(createLogger({ collapsed: true }))
}

const store = createStore(rootReducer, applyMiddleware(...middleware))
sagaMiddleware.run(watcher)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
)

registerServiceWorker()

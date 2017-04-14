import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import App from './components/app.jsx'

const initialSate = {
  formats: {
    available:['ogg', 'wav', 'mp3'],
    current: 'ogg'
  },
  files: []
}

let store = createStore(reducers, initialSate, window.devToolsExtension ? window.devToolsExtension() : f => f)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)

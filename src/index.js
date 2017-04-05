import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { loadInitialData } from './api'
import configureStore from './configureStore'
import Root from './Root'
import './index.css'

loadInitialData().then(initialData => {
  const store = configureStore(initialData)
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById('root')
  )
})

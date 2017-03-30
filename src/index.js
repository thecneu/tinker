import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { loadInitialData } from './api/json'
import configureStore from './configureStore'
import Root from './Root';

loadInitialData().then(initialData => {
  ReactDOM.render(
    <Provider store={configureStore(initialData)}>
      <Root />
    </Provider>,
    document.getElementById('root')
  )
})

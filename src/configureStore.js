import { createStore } from 'redux'
import api from './api'
import reducer from './reducers'

const configureStore = () => {
  const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  return store
}

const store = configureStore()

export default store
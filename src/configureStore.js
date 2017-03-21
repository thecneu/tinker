import { createStore } from 'redux'
import { getEntries, getExercises } from './api'
import reducer from './reducers'

const initialState = {
  entries: getEntries(),
  exercises: getExercises()
}

const configureStore = () => {
  const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  return store
}

const store = configureStore()

export default store

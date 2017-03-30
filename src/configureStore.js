import { createStore, compose, applyMiddleware } from 'redux'
import saveToServer from './middlewares/saveToServer'
import reducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = (initialState) => {
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(saveToServer)
    )
  )

  return store
}

export default configureStore

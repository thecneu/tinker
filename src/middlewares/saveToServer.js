import { save } from '../api'

const saveToServer = ({dispatch, getState}) => (next) => (action) => {
  const nextState = next(action)
  save(getState()).then(() => console.log('State saved'))
  return nextState
}

export default saveToServer

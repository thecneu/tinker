import { save } from '../api'

const saveToServer = ({dispatch, getState}) => (next) => (action) => {
  const nextState = next(action)
  save(getState())
  return nextState
}

export default saveToServer

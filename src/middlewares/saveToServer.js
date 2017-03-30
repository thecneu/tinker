import { save } from '../api/json'

const saveToServer = ({dispatch, getState}) => (next) => (action) => {
  const nextState = next(action)
  save(action.payload).then(() => console.log('State saved'))
  return nextState
}

export default saveToServer
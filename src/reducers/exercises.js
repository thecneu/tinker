import { exercises as exerciseData } from '../api/shortcuttosize'
import { normalize } from './utils'

const initialState = normalize(exerciseData)

const exercises = (state = initialState, action) => {
  return state
}

export default exercises
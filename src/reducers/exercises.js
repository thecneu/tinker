import { exercises as exerciseData } from '../api/shortcuttosize'
import { normalize } from '../utils'

const initialState = normalize(exerciseData, 1, 1)

const exercises = (state = initialState, action) => {
  return state
}

export default exercises

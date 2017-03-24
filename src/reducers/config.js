import { weeknum } from './utils'

const initialState = {
  startWeek: weeknum(),
  phase: 1,
  week: 1
}

const config = (state = initialState, action) => {
  return state
}

export default config

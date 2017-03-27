import { getWeeknum } from '../utils'

const initialState = {
  startWeek: getWeeknum(),
  phase: 1,
  week: 1
}

const config = (state = initialState, action) => {
  return state
}

export default config

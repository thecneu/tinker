import _ from 'lodash'
import { combineReducers } from 'redux'

export const days = (state = [], action) => {
  switch(action.type) {
    case 'ADD_GROUP_TO_DAY':
      return state

    default:
      return state
  }
}

export const config = (state = {}, action) => {
  let day
  if (action.payload) {
    day = state[action.payload.day]
  }

  switch(action.type) {
    case 'ADD_GROUP_TO_DAY':
      return {
        ...state,
        [action.payload.day]: {
          ...day,
          group: action.payload.group
        }
      }

    case 'ADD_CARDIO_TO_DAY':
      return {
        ...state,
        [action.payload.day]: {
          ...day,
          cardio: [...day.cardio, action.payload.cardio]
        }
      }

    case 'REMOVE_GROUP_FROM_DAY':
      return state

    case 'REMOVE_CARDIO_FROM_DAY':
      return state

    default:
      return state
  }
}

export default combineReducers({
  config,
  days
})

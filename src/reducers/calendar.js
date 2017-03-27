// import _ from 'lodash'
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
          cardio: [...day.cardio || [], action.payload.cardio]
        }
      }

    case 'REMOVE_GROUP_FROM_DAY':
    {
      let { group, ...rest } = day

      return {
        ...state,
        [action.payload.day]: rest
      }
    }

    case 'REMOVE_CARDIO_FROM_DAY':
    {
      let { cardio, ...rest } = day
      let newCardio = cardio.filter(c => c !== action.payload.cardio)
      let newDay = newCardio.length ? { ...rest, cardio: newCardio } : { ...rest }

      return {
        ...state,
        [action.payload.day]: newDay
      }
    }

    default:
      return state
  }
}

export default combineReducers({
  config,
  days
})

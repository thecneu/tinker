import { combineReducers } from 'redux'
import exercises from './exercises'
import config from './config'
import selected from './selected'
import calendar from './calendar'
import cardio from './cardio'

export default combineReducers({
  config,
  selected,
  exercises,
  cardio,
  calendar
})

const filterByInUse = (groups, {selected, config}) => {
  return groups
}

export const getGroups = (state) => {
  let groups = []

  state.exercises.forEach((exercise) => {
    if (groups.indexOf(exercise.group) < 0) {
      groups.push(exercise.group)
    }
  })

  return filterByInUse(groups, {selected: state.selected, config: state.calendar.config})
}

export const getCardio = (state) => state.cardio

import { combineReducers } from 'redux'
import { importData } from '../api'

const initialState = importData()

export const exercises = (state = initialState, action) => {
  switch(action.type) {
    case 'CREATE_EXERCISE':
      return [
        ...state,
        { ...action.payload }
      ]

    case 'UPDATE_EXERCISE':
      return state.map(exercise => {
        if (exercise.id === action.payload.id) {
          return {
            ...exercise,
            ...action.payload.exercise
          }
        }

        return exercise
      })

    default:
      return state
  }
}

export const entries = (state = [], action) => {
  switch(action.type) {
    case 'CREATE_ENTRY':
      return [
        ...state,
        { ...action.payload }
      ]

    default:
      return state
  }
}

export default combineReducers({
  exercises,
  entries
})



export const getExerciseOptions = (exercises) =>
  exercises.map(exercise => ({value: exercise.name.toLowerCase(), title: exercise.name}))

export const getExercise = (id, exercises) => {
  const exercise = exercises.filter(exercise => exercise.id === id)

  return exercise.length ? exercise[0] : {}
}
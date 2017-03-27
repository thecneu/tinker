export const clearHandler = () => ({
  type: 'CLEAR_CALENDAR'
})

export const nextWeek = () => {
  return {
    type: 'NEXT_WEEK'
  }
}

export const prevWeek = () => {
  return {
    type: 'PREVIOUS_WEEK'
  }
}

export const addCardioEntry = (payload) => ({
  type: 'ADD_CARDIO',
  // id
  // date
  payload
})

export const addExerciseWeight = (payload) => ({
  type: 'ADD_EXERCISE_WEIGHT',
  payload
})

export const updateExerciseWeight = (payload) => ({
  type: 'UPDATE_EXERCISE_WEIGHT',
  payload
})

export const selectDay = (payload) => ({
  type: 'SELECT_DAY',
  payload
})

export const addGroupToDay = (group, day) => ({
  type: 'ADD_GROUP_TO_DAY',
  payload: { group, day }
})

export const addCardioToDay = (cardio, day) => ({
  type: 'ADD_CARDIO_TO_DAY',
  payload: { cardio, day }
})

export const removeGroupFromDay = (day) => ({
  type: 'REMOVE_GROUP_FROM_DAY',
  payload: { day }
})

export const removeCardioFromDay = (cardio, day) => ({
  type: 'REMOVE_CARDIO_FROM_DAY',
  payload: { cardio, day }
})

// 'RETRIEVE_SERVER_DATA'

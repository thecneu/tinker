import cuid from 'cuid'

export const createExercise = (exercise) => ({
  type: 'CREATE_EXERCISE',
  payload: {
    id: cuid(),
    ...exercise
  }
})

export const updateExercise = (id, exercise) => ({
  type: 'UPDATE_EXERCISE',
  payload: {
    id,
    exercise
  }
})

export const createEntry = (entry) => ({
  type: 'CREATE_ENTRY',
  payload: {
    id: cuid(),
    date: new Date(),
    ...entry
  }
})
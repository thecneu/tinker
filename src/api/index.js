import low from 'lowdb'

const exercises = low('data/exercises.json')
exercises.defaults([]).write()

const entries = low('data/entries.json')
entries.defaults([]).write()

export function getExercises() {
  return exercises.get().value()
}

export function getEntries() {
  return entries.get().value()
}

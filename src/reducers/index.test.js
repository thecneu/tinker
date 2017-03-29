import { exercises, entries } from './'
import * as actions from '../actions'

describe('Testing Exercise Directory Reducers', () => {
  it('Initializes with initial state', () => {
    const prevState = undefined
    const expectedState = []
    const nextState = exercises(prevState, {})

    expect(nextState).toEqual(expectedState)
  })

  it('Adds new exercise', () => {
    const prevState = undefined
    const expectedState = [{
      "name":"Bench Press",
      "image":"http://www.exrx.net/AnimatedEx/PectoralSternal/BBBenchPress.gif",
      "type":"chest",
      "sets":4,
      "reps":"12-15"
    }]
    const nextState = exercises(prevState, actions.addExercise({
        "name":"Bench Press",
        "image":"http://www.exrx.net/AnimatedEx/PectoralSternal/BBBenchPress.gif",
        "type":"chest",
        "sets":4,
        "reps":"12-15"
      })
    )

    expect(nextState).toEqual(expectedState)
  })

  it('Updates an exercise', () => {
    const prevState
    const expectedState
    const nextState = exercises(prevState, {})

    expect(nextState).toEqual(expectedState)
  })

  it('Deletes an exercise', () => {
    const prevState
    const expectedState
    const nextState = exercises(prevState, {})

    expect(nextState).toEqual(expectedState)
  })
})

describe('Testing Entries Reducers', () => {
  it('Initializes with initial state', () => {
    const prevState = undefined
    const expectedState = []
    const nextState = entries(prevState, {})

    expect(nextState).toEqual(expectedState)
  })

  it('Adds new entry', () => {
    const prevState = undefined
    const action = actions.addEntry({
      type: 'cardio',
      distance: 3,
      calories: 420,
      time: 42
    })
    const expectedState = [{
      type: 'cardio',
      distance: 3,
      calories: 420,
      time: 42,
      id: action.id,
      date: action.date
    }]
    const nextState = entries(prevState, action)

    expect(nextState).toEqual(expectedState)
  })
})

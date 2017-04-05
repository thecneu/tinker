import cuid from 'cuid'
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
    const action = actions.createExercise({
      "name":"Bench Press",
      "image":"http://www.exrx.net/AnimatedEx/PectoralSternal/BBBenchPress.gif",
      "type":"chest",
      "sets":4,
      "reps":"12-15"
    })
    expectedState[0].id = action.payload.id

    const nextState = exercises(prevState, action)

    expect(nextState).toEqual(expectedState)
  })

  it('Adds new exercise - multiple', () => {
    const prevState = [{
      "id": 1,
      "name":"Bench Press",
      "image":"http://www.exrx.net/AnimatedEx/PectoralSternal/BBBenchPress.gif",
      "type":"chest",
      "sets":4,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
    },
    {
      "id": 2,
      "name":"Incline Bench Press",
      "image":"http://www.exrx.net/AnimatedEx/PectoralClavicular/BBInclineBenchPress.gif",
      "type":"chest",
      "sets":3,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
    },
    {
      "id":3,
      "name":"Incline Dumbbell Flys",
      "image":"http://www.exrx.net/AnimatedEx/PectoralClavicular/DBInclineFly.gif",
      "type":"chest",
      "sets":3,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
   }]
    const expectedState = [{
      "id":1,
      "name":"Bench Press",
      "image":"http://www.exrx.net/AnimatedEx/PectoralSternal/BBBenchPress.gif",
      "type":"chest",
      "sets":4,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
    },
    {
      "id":2,
      "name":"Incline Bench Press",
      "image":"http://www.exrx.net/AnimatedEx/PectoralClavicular/BBInclineBenchPress.gif",
      "type":"chest",
      "sets":3,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
    },
    {
      "id":3,
      "name":"Incline Dumbbell Flys",
      "image":"http://www.exrx.net/AnimatedEx/PectoralClavicular/DBInclineFly.gif",
      "type":"chest",
      "sets":3,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
    }, {
      "name":"Cable Crossover",
      "image":"http://www.exrx.net/AnimatedEx/PectoralSternal/CBStandingFly.gif",
      "type":"chest",
      "sets":3,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
    }];
    const action = actions.createExercise({
      "name":"Cable Crossover",
      "image":"http://www.exrx.net/AnimatedEx/PectoralSternal/CBStandingFly.gif",
      "type":"chest",
      "sets":3,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
    })
    expectedState[3].id = action.payload.id

    const nextState = exercises(prevState, action)

    expect(nextState).toEqual(expectedState)
  })

  it('Updates an exercise', () => {
    const prevState = [{
      "id": 1,
      "name":"Bench Press",
      "image":"http://www.exrx.net/AnimatedEx/PectoralSternal/BBBenchPress.gif",
      "type":"chest",
      "sets":4,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
    },
    {
      "id": 2,
      "name":"Incline Bench Press",
      "image":"http://www.exrx.net/AnimatedEx/PectoralClavicular/BBInclineBenchPress.gif",
      "type":"chest",
      "sets":3,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
    },
    {
      "id":3,
      "name":"Incline Dumbbell Flys",
      "image":"http://www.exrx.net/AnimatedEx/PectoralClavicular/DBInclineFly.gif",
      "type":"chest",
      "sets":3,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
    }]
    const expectedState = [{
      "id": 1,
      "name":"Bench Press",
      "image":"http://www.exrx.net/AnimatedEx/PectoralSternal/BBBenchPress.gif",
      "type":"chest",
      "sets":4,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
    },
    {
      "id": 2,
      "name":"Incline Bench Press",
      "image":"http://www.exrx.net/AnimatedEx/PectoralClavicular/BBInclineBenchPress.gif",
      "type":"chest",
      "sets":3,
      "reps":"10-12",
      "group":"Chest, Triceps, Calves"
    },
    {
      "id":3,
      "name":"Incline Dumbbell Flys",
      "image":"http://www.exrx.net/AnimatedEx/PectoralClavicular/DBInclineFly.gif",
      "type":"chest",
      "sets":3,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
    }]
    const nextState = exercises(prevState, actions.updateExercise(2, {reps: '10-12'}))

    expect(nextState).toEqual(expectedState)
  })

  it('Deletes an exercise', () => {
    const prevState = [{
      "id": 1,
      "name":"Bench Press",
      "image":"http://www.exrx.net/AnimatedEx/PectoralSternal/BBBenchPress.gif",
      "type":"chest",
      "sets":4,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
    },
    {
      "id": 2,
      "name":"Incline Bench Press",
      "image":"http://www.exrx.net/AnimatedEx/PectoralClavicular/BBInclineBenchPress.gif",
      "type":"chest",
      "sets":3,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
    },
    {
      "id":3,
      "name":"Incline Dumbbell Flys",
      "image":"http://www.exrx.net/AnimatedEx/PectoralClavicular/DBInclineFly.gif",
      "type":"chest",
      "sets":3,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
    }]
    const expectedState = [{
      "id": 1,
      "name":"Bench Press",
      "image":"http://www.exrx.net/AnimatedEx/PectoralSternal/BBBenchPress.gif",
      "type":"chest",
      "sets":4,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
    },
    {
      "id":3,
      "name":"Incline Dumbbell Flys",
      "image":"http://www.exrx.net/AnimatedEx/PectoralClavicular/DBInclineFly.gif",
      "type":"chest",
      "sets":3,
      "reps":"12-15",
      "group":"Chest, Triceps, Calves"
    }]
    const nextState = exercises(prevState, actions.deleteExercise(2))

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
    const action = actions.createEntry({
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
      id: action.payload.id,
      date: action.payload.date
    }]
    const nextState = entries(prevState, action)

    expect(nextState).toEqual(expectedState)
  })
})

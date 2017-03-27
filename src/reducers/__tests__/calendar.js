import { config } from '../calendar'
import * as actions from '../../actions'

describe('Calendar config reducer', () => {
  it('Correct initial state', () => {
    let nextState = config(undefined, {})
    expect({}).toEqual(nextState)
  })

  describe('Add exercise group to day: ADD_GROUP_TO_DAY', () => {
    it('Add group to day', () => {
      let prevState = undefined
      let expectedState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        }
      }
      let nextState = config(prevState, actions.addGroupToDay('Chest, Triceps, Calves', 'monday'))
      expect(nextState).toEqual(expectedState)
    })

    it('Add group to day - multiple days', () => {
      let prevState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        }
      }
      let expectedState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        },
        tuesday: {
          group: 'Back, Biceps, Abs'
        }
      }
      let nextState = config(prevState, actions.addGroupToDay('Back, Biceps, Abs', 'tuesday'))
      expect(nextState).toEqual(expectedState)
    })

    it('Add group to day with cardio', () => {
      let prevState = {
        monday: {
          cardio: ['Running', 'Cycling']
        }
      }
      let expectedState = {
        monday: {
          cardio: ['Running', 'Cycling'],
          group: 'Chest, Triceps, Calves'
        }
      }
      let nextState = config(prevState, actions.addGroupToDay('Chest, Triceps, Calves', 'monday'))
      expect(nextState).toEqual(expectedState)
    })

    it('Add group to day with cardio - multiple days', () => {
      let prevState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        },
        tuesday: {
          cardio: ['Running', 'Cycling'],
        }
      }
      let expectedState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        },
        tuesday: {
          cardio: ['Running', 'Cycling'],
          group: 'Back, Biceps, Abs'
        }
      }
      let nextState = config(prevState, actions.addGroupToDay('Back, Biceps, Abs', 'tuesday'))
      expect(nextState).toEqual(expectedState)
    })
  })

  describe('Update exercise group to day: ADD_GROUP_TO_DAY', () => {
    it('Replace day with another group', () => {
      let prevState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        }
      }
      let expectedState = {
        monday: {
          group: 'Back, Biceps, Abs'
        }
      }
      let nextState = config(prevState, actions.addGroupToDay('Back, Biceps, Abs', 'monday'))
      expect(nextState).toEqual(expectedState)
    })

    it('Replace day with another group - multiple days', () => {
      let prevState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        },
        tuesday: {
          group: 'Back, Biceps, Abs'
        }
      }
      let expectedState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        },
        tuesday: {
          group: 'Shoulders, Traps, Calves'
        }
      }
      let nextState = config(prevState, actions.addGroupToDay('Shoulders, Traps, Calves', 'tuesday'))
      expect(nextState).toEqual(expectedState)
    })

    it('Replace day with another group with cardio', () => {
      let prevState = {
        monday: {
          group: 'Chest, Triceps, Calves',
          cardio: ['Running', 'Cycling']
        }
      }
      let expectedState = {
        monday: {
          group: 'Back, Biceps, Abs',
          cardio: ['Running', 'Cycling']
        }
      }
      let nextState = config(prevState, actions.addGroupToDay('Back, Biceps, Abs', 'monday'))
      expect(nextState).toEqual(expectedState)
    })

    it('Replace day with another group with cardio - multiple days', () => {
      let prevState = {
        monday: {
          group: 'Chest, Triceps, Calves',
          cardio: ['Running', 'Cycling']
        },
        tuesday: {
          group: 'Back, Biceps, Abs',
          cardio: ['Running', 'Cycling']
        }
      }
      let expectedState = {
        monday: {
          group: 'Chest, Triceps, Calves',
          cardio: ['Running', 'Cycling']
        },
        tuesday: {
          group: 'Shoulders, Traps, Calves',
          cardio: ['Running', 'Cycling']
        }
      }
      let nextState = config(prevState, actions.addGroupToDay('Shoulders, Traps, Calves', 'tuesday'))
      expect(nextState).toEqual(expectedState)
    })
  })

  describe('Remove exercise group from day: REMOVE_GROUP_FROM_DAY', () => {
    it('Remove a group from a day', () => {
      let prevState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        }
      }
      let expectedState = {}
      let nextState = config(prevState, actions.removeGroupFromDay('monday'))
      expect(nextState).toEqual(expectedState)
    })

    it('Remove a group from a day - multiple days', () => {
      let prevState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        },
        tuesday: {
          group: 'Back, Biceps, Abs'
        }
      }
      let expectedState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        }
      }
      let nextState = config(prevState, actions.removeGroupFromDay('tuesday'))
      expect(nextState).toEqual(expectedState)
    })

    it('Remove a group from a day with cardio - multiple days', () => {
      let prevState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        },
        tuesday: {
          group: 'Back, Biceps, Abs',
          cardio: ['Running', 'Cycling']
        }
      }
      let expectedState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        },
        tuesday: {
          cardio: ['Running', 'Cycling']
        }
      }
      let nextState = config(prevState, actions.removeGroupFromDay('tuesday'))
      expect(nextState).toEqual(expectedState)
    })
  })

  describe('Add cardio to day: ADD_CARDIO_TO_DAY', () => {
    it('Add cardio to day', () => {
      let prevState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        }
      }
      let expectedState = {
        monday: {
          group: 'Chest, Triceps, Calves',
          cardio: ['Running']
        }
      }
      let nextState = config(prevState, actions.addCardioToDay('Running', 'monday'))
      expect(nextState).toEqual(expectedState)
    })

    it('Add cardio to day - multiple days', () => {
      let prevState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        },
        tuesday: {
          group: 'Back, Biceps, Abs'
        }
      }
      let expectedState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        },
        tuesday: {
          group: 'Back, Biceps, Abs',
          cardio: ['Running']
        }
      }
      let nextState = config(prevState, actions.addCardioToDay('Running', 'tuesday'))
      expect(nextState).toEqual(expectedState)
    })

    it('Add cardio to day with existing cardio', () => {
      let prevState = {
        monday: {
          group: 'Chest, Triceps, Calves',
          cardio: ['Running']
        }
      }
      let expectedState = {
        monday: {
          group: 'Chest, Triceps, Calves',
          cardio: ['Running', 'Cycling']
        }
      }
      let nextState = config(prevState, actions.addCardioToDay('Cycling', 'monday'))
      expect(nextState).toEqual(expectedState)
    })

    it('Add cardio to day with existing cardio - multiple days', () => {
      let prevState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        },
        tuesday: {
          group: 'Back, Biceps, Abs',
          cardio: ['Running']
        }
      }
      let expectedState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        },
        tuesday: {
          group: 'Back, Biceps, Abs',
          cardio: ['Running', 'Cycling']
        }
      }
      let nextState = config(prevState, actions.addCardioToDay('cycling', 'tuesday'))
      expect(nextState).toEqual(expectedState)
    })
  })

  describe('Remove cardio from day: REMOVE_CARDIO_FROM_DAY', () => {
    it('Remove cardio from day', () => {
      let prevState = {
        monday: {
          group: 'Chest, Triceps, Calves',
          cardio: ['Running']
        }
      }
      let expectedState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        }
      }
      let nextState = config(prevState, actions.removeCardioFromDay('Running', 'monday'))
      expect(nextState).toEqual(expectedState)
    })

    it('Remove cardio from day - multiple days', () => {
      let prevState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        },
        tuesday: {
          group: 'Back, Biceps, Abs',
          cardio: ['Running']
        }
      }
      let expectedState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        },
        tuesday: {
          group: 'Back, Biceps, Abs'
        }
      }
      let nextState = config(prevState, actions.removeCardioFromDay('running', 'tuesday'))
      expect(nextState).toEqual(expectedState)
    })

    it('Remove cardio from day with existing cardio', () => {
      let prevState = {
        monday: {
          group: 'Chest, Triceps, Calves',
          cardio: ['Running', 'Cycling']
        }
      }
      let expectedState = {
        monday: {
          group: 'Chest, Triceps, Calves',
          cardio: ['Running']
        }
      }
      let nextState = config(prevState, actions.removeCardioFromDay('Cycling', 'monday'))
      expect(nextState).toEqual(expectedState)
    })

    it('Remove cardio from day with existing cardio - multiple days', () => {
      let prevState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        },
        tuesday: {
          group: 'Back, Biceps, Abs',
          cardio: ['Running', 'Cycling']
        }
      }
      let expectedState = {
        monday: {
          group: 'Chest, Triceps, Calves'
        },
        tuesday: {
          group: 'Back, Biceps, Abs',
          cardio: ['Running']
        }
      }
      let nextState = config(prevState, actions.removeCardioFromDay('Cycling', 'tuesday'))
      expect(nextState).toEqual(expectedState)
    })
  })
})

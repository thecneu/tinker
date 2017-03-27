import store from '../../configureStore'
import { getCardio } from '../'
import cardio from '../cardio'

describe('Cardio reducer', () => {
  it('Has the correct initial state', () => {
    const expectedState = [
      'Running - Treadmill',
      // 'Running - Elliptical',
      'Running - Outside',
      // 'Stair Master',
      // 'Cycling - Stand Up',
      'Cycling - Sit Down',
      'Cycling - Outside'
    ]

    const nextState = cardio(undefined, {})

    expect(expectedState).toEqual(nextState)
  })
})

describe('Cardio selectors', () => {
  it('Selects the cardio from state', () => {
    expect(getCardio(store.getState())).toEqual(store.getState().cardio)
  })
})


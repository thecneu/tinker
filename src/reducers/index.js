import { combineReducers } from 'redux'
import exercises from './exercises'
import config from './config'

export default combineReducers({
  config,
  exercises
})
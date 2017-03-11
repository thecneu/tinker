import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App'
import Home from './components/Home'
import Exercises from './components/Exercises'
import ExerciseForm from './containers/ExerciseForm'
import ExerciseList from './containers/ExerciseList'

const Root = () => (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Home} />
      <Route path="exercises" component={Exercises}>
        <IndexRoute component={ExerciseList} />
        <Route path="create" component={ExerciseForm} />
        <Route path=":id" component={ExerciseForm} />
      </Route>
    </Route>
  </Router>
)

export default Root
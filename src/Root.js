import React from 'react'
import { useBasename } from 'history'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App'
import Home from './pages/Home'
import Directory from './pages/Directory'
import List from './pages/List'
import ExerciseForm from './containers/ExerciseForm'
import ExerciseList from './containers/ExerciseList'

const Root = () => (
  <Router history={useBasename(() => browserHistory)({basename: '/tinker'})}>
    <Route component={App}>
      <Route path="/" component={Home} />
      <Route path="list" component={List} />
      <Route path="directory" component={Directory}>
        <IndexRoute component={ExerciseList} />
        <Route path="create" component={ExerciseForm} />
        <Route path=":id" component={ExerciseForm} />
      </Route>
      <Route path="*" />
    </Route>
  </Router>
)

export default Root
import React from 'react'
import { useBasename } from 'history'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App'
import EntryForm from './containers/EntryForm'
import EntryList from './containers/EntryList'
import ExerciseForm from './containers/ExerciseForm'
import ExerciseList from './containers/ExerciseList'

const history = process.env.NODE_ENV === 'development' ? browserHistory : useBasename(() => browserHistory)({basename: '/tinker'})
const Root = () => (
  <Router history={history}>
    <Route component={App}>
      <Route path="/" component={EntryForm} />
      <Route path="list" component={EntryList} />
      <Route path="directory">
        <IndexRoute component={ExerciseList} />
        <Route path=":id" component={ExerciseForm} />
        <Route path="create" component={ExerciseForm} />
      </Route>
      <Route path="*" />
    </Route>
  </Router>
)

export default Root

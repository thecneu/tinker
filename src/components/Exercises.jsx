import React from 'react'
import { Link } from 'react-router'

const Exercises = ({location: { pathname }, children}) => (
  <article className="container">
    <h2>Exercises</h2>
    {pathname.indexOf('create') < 0 ? <Link className="link" activeClassName="active" to="/exercises/create">Create Exercise</Link> : false}
    {children}
    <button className="action"><Link to="/exercises/create" className="glyphicon glyphicon-plus-sign" /></button>
  </article>
)

export default Exercises
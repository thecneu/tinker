import React from 'react'
import { Link } from 'react-router'
import EntryForm from '../containers/EntryForm'

const Home = () => (
  <article className="container">
    <EntryForm />
    <button className="action"><Link to="/exercises" className="glyphicon glyphicon-th-list"></Link></button>
  </article>
)

export default Home
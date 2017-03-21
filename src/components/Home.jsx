import React from 'react'
import { Link } from 'react-router'
import EntryForm from '../containers/EntryForm'

const Home = () => (
  <article className="container">
    <EntryForm />

    <aside className="action">
      <button><Link to="/exercises" className="glyphicon glyphicon-th-list" /></button>
    </aside>
  </article>
)

export default Home

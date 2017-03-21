import React from 'react'
import { Link } from 'react-router'

const Exercises = ({location: { pathname }, children}) => (
  <article className="container">
    <h2>Exercises</h2>
    {children}

    <aside className="action">
      {pathname.indexOf('create') < 0 ?
        [<button key={0}>
          <Link to="/" className="glyphicon glyphicon-align-justify" />
        </button>,
        <button key={1}>
          <Link to="/exercises/create" className="glyphicon glyphicon-plus-sign" />
        </button>]
        :
        <button>
          <Link to="/exercises" className="glyphicon glyphicon-th-list" />
        </button>
      }
    </aside>
  </article>
)

export default Exercises

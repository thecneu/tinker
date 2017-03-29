import React from 'react'
import { Link } from 'react-router'
import './action.css'

const Action = ({path}) => (
  <aside className="action">
    {path.indexOf('create') < 0 ?
      [<button key="home" className="btn btn-primary glyphicon glyphicon-align-justify">
        <Link to="/" />
      </button>,
      <button key="create" className="btn btn-primary glyphicon glyphicon-plus-sign">
        <Link to="/directory/create" />
      </button>]
      :
      <button className="btn btn-primary glyphicon glyphicon-th-list">
        <Link to="/directory" />
      </button>
    }
  </aside>
)

export default Action
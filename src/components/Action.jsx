import React from 'react'
import { Link } from 'react-router'
import './action.css'

const Action = ({path}) => {
  let html
  if (path.indexOf('create') >= 0) {
    html = (
      <button className="btn btn-primary glyphicon glyphicon-align-justify">
        <Link to="/directory" />
      </button>
    )
  } else if (path.indexOf('directory') >= 0) {
    html = ([
      <button key="home" className="btn btn-primary glyphicon glyphicon-home">
        <Link to="/" />
      </button>,
      <button key="create" className="btn btn-primary glyphicon glyphicon-plus-sign">
        <Link to="/directory/create" />
      </button>
    ])
  } else {
    html = [
      <button key="list" className="btn btn-primary glyphicon glyphicon-list-alt">
        <Link to="/list" />
      </button>,
      <button key="create" className="btn btn-primary glyphicon glyphicon-align-justify">
        <Link to="/directory" />
      </button>
    ]
  }

  return (
    <aside className="action">
      {html}
    </aside>
  )
}

export default Action
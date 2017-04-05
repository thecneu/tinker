import React from 'react'
import { Link } from 'react-router'
import './action.css'

const Action = ({path}) => (
  <aside className="action pull-right">
    <button key="home" className="btn btn-primary glyphicon glyphicon-home">
      <Link to="/" />
    </button>
    <button key="list" className="btn btn-primary glyphicon glyphicon-list-alt">
      <Link to="/list" />
    </button>
    <button className="btn btn-primary glyphicon glyphicon-align-justify">
      <Link to="/directory" />
    </button>
    <button key="create" className="btn btn-primary glyphicon glyphicon-plus-sign">
      <Link to="/directory/create" />
    </button>
  </aside>
)

export default Action

import React from 'react'
import { connect } from 'react-redux'
import { clearHandler, addWeek, removeWeek } from '../actions'
import './actions.css'

const Actions = ({clearHandler, addWeek, removeWeek}) => (
  <aside className="actions">
    <input type="button" value="Clear" className="btn btn-primary clear" />
    <input type="button" value="Add Week" className="btn btn-primary clear" />
    <input type="button" value="Remove Week" className="btn btn-primary clear" />
  </aside>
)

export default connect(
  null,
  { clearHandler, addWeek, removeWeek }
)(Actions)

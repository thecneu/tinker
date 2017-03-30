import React from 'react'
import { connect } from 'react-redux'
import Action from '../components/Action'
import TableList from '../components/TableList'

const List = ({entries}) => (
  <article className="container">
    <h2>Entry List</h2>
    <Action path="list" />
    <TableList items={entries} />
  </article>
)

const mapStateToProps = ({entries}) => ({entries})

export default connect(mapStateToProps)(List)
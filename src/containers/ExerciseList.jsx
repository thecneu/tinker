import React from 'react'
import { connect } from 'react-redux'
import TableList from '../components/TableList'

const List = ({exercises}) => (
  <TableList items={exercises} />
)

const mapStateToProps = ({exercises}) => ({exercises})

export default connect(mapStateToProps)(List)

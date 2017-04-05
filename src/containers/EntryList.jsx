import React from 'react'
import { connect } from 'react-redux'
import TableList from '../components/TableList'

const EntryList = () => (
  <TableList />
)

export default connect(({entries}) => ({items: entries}))(EntryList)

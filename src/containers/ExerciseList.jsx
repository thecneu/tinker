import React from 'react'
import { connect } from 'react-redux'

const List = () => (
  <h3>List</h3>
)

const mapStateToProps = ({exercises}) => ({exercises})

export default connect(mapStateToProps)(List)
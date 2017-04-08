import React from 'react'
import { connect } from 'react-redux'
import { clearEntries } from '../actions'
import TableList from '../components/TableList'

const EntryList = ({items, clear}) => (
  <div>
    <TableList items={items} />
    {items.length > 0 && <button onClick={clear} className="btn btn-default">Clear</button>}
  </div>
)

export default connect(({entries}) => ({items: entries}), {clear: clearEntries})(EntryList)

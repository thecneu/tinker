import React from 'react'
import { connect } from 'react-redux'

const List = ({items}) => (
  <table className="table">
    <thead>
      <tr>
        {Object.keys(items[0] || {}).map(item => <th>{item}</th>)}
      </tr>
    </thead>
    <tbody>
      {items.map(item => <tr>
        {Object.keys(item).map(key => <td>{/gif|png|jpg/.test(item[key]) ? <img src={item[key]} alt="" /> : item[key]}</td>)}
      </tr>)}
    </tbody>
  </table>
)

const mapStateToProps = ({exercises}) => ({items: exercises})

export default connect(mapStateToProps)(List)

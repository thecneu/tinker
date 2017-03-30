import React from 'react'

const TableList = ({items, filter = ['id']}) => {
  const keys = Object.keys(items[0] || {}).filter((property) => filter.indexOf(property) < 0)

  return (
    <table className="table">
      <thead>
        <tr>
          {keys.map(property => <th key={property}>{property}</th>)}
        </tr>
      </thead>
      <tbody>
        {items.map(item =>
        <tr key={item.id}>
          {keys.map(property =>
            <td key={item[property]}>
              {/gif|png|jpg/.test(item[property]) ? <img src={item[property]} alt="" /> : item[property]}
            </td>
          )}
        </tr>)}
      </tbody>
    </table>
  )
}

export default TableList
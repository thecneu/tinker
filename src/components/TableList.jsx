import React from 'react'
import TableListItem from './TableListItem';

const TableList = ({items, filter = ['id']}) => {
  if (!items) return null

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
          {keys.map((property, i) =>
            <TableListItem key={`${item.id}-${i}`} property={property} value={item[property]} />
          )}
        </tr>)}
      </tbody>
    </table>
  )
}

export default TableList

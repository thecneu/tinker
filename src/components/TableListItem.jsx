import React from 'react'

const TableListItem = ({value, property}) => {
  const getValue = () => {
    switch(property) {
      case 'image':
        return <img src={value} alt="" />
      case 'date':
        return (new Date(value)).toLocaleDateString()
      case 'time':
        return `${value || 0}:00`
      case 'distance':
        return `${value}m`
      case 'weight':
        return `${value} lb`

      default:
        return value
    }
  }

  return (
    <td>
      {getValue()}
    </td>
  )
}

export default TableListItem

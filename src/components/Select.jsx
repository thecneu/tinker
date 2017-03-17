import React from 'react'

const Select = ({required, name, label, value, onInputChange, options, children}) => (
  <div className="form-group">
    <label>{label}</label>
    <select className="form-control" name={name} value={value} required={required} onChange={onInputChange}>
      {options ? options.map(option => <option value={value}>{value}</option>) : false}
      {children}
    </select>
  </div>
)

export default Select
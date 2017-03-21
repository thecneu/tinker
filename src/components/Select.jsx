import React from 'react'

const Select = ({required, name, label, value, onInputChange, options, children}) => (
  <div className="form-group">
    <select className="form-control" name={name} value={value} required={required} onChange={onInputChange}>
      {label ? <option hidden>{label}</option> : false}
      {options ? options.map(option => <option value={value}>{value}</option>) : false}
      {children}
    </select>
  </div>
)

export default Select

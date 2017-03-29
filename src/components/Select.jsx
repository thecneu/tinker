import React from 'react'

const Select = ({required, name, label, value, onInputChange, children}) => (
  <div className="form-group">
    <select className="form-control" name={name} value={value} required={required} onChange={onInputChange}>
      {label ? <option hidden>{label}</option> : false}
      {children}
    </select>
  </div>
)

export default Select

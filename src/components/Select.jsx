import React from 'react'

const Select = ({label, onInputChange, children, ...props}) => (
  <div className="form-group">
    <select className="form-control" onChange={onInputChange} {...props}>
      {label ? <option hidden>{label}</option> : false}
      {children}
    </select>
  </div>
)

export default Select

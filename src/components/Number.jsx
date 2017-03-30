import React from 'react'
import Input from './Input'

const Number = (props) => {
  const { needsPeriod, ...inputProps } = props
  return <Input type="number" required="true" pattern={needsPeriod ? '[0-9].*' : '[0-9]*'} {...inputProps} />
}

export default Number
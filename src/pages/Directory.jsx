import React from 'react'
import Action from '../components/Action'

const Directory = ({location: { pathname }, children}) => (
  <article className="container">
    <h2>Exercise Directory</h2>
    {children}
    <Action path={pathname} />
  </article>
)

export default Directory

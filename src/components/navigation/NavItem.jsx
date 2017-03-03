import React from 'react'

const Item = ({url, className, name}) => (
  <a href={url} className={className}>
    <div className="icon"></div>
    <span className="text">{name}</span>
  </a>
)

const NavItem = ({type, ...props}) => {
  switch(type) {
    case 'absorbable':
      return <li className="absorbable" data-absorb-class={props.className}><Item {...props} /></li>
    case 'hidden':
      return <li className="absorbed hidden" data-absorb-class={props.className}><Item {...props} /></li>
    default:
      return <li><Item {...props} /></li>
  }
}

export default NavItem
import React from 'react'
import NavItem from './NavItem'

const PrimaryNav = ({primaryItems}) => (
  <div id="visibleNav">
    <a id="logo" href="/">Volkswagen of America</a>
    <ul>
      {primaryItems.map((item, index) => <NavItem key={index} type="absorbable" {...item} />)}
      <li>
        <a href="#" className="navSwitch">
          <span className="icon"></span>
          <span className="text">More</span>
        </a>
      </li>
    </ul>
  </div>
)

export default PrimaryNav
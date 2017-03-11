import React from 'react'
import { Link } from 'react-router'
import logo from '../logo.svg'

const Header = () => (
  <header className="app-header">
    <img src={logo} className="app-logo" alt="logo" />
    <h2>Welcome to React</h2>
    <Link to="/" activeClassName="active">Home</Link>
    <Link to="/exercises" activeClassName="active">Exercises</Link>
  </header>
)

export default Header
import React from 'react'
import { connect } from 'react-redux'
import './header.css'

const Header = ({phase, week}) => (
  <header>
    <h1 className="workout-weeks">
      Phase {phase}: <span>Week {week}</span>
    </h1>
  </header>
)

const mapStateToProps = ({config}) => ({
  phase: config.phase,
  week: config.week
})

export default connect(mapStateToProps)(Header)

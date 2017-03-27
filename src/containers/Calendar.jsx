import React from 'react'
import { connect } from 'react-redux'
import { selectDay } from '../actions'
import './calendar.css'

class Calendar extends React.Component {
  state = {
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  }

  render() {
    return(
      <ul className="calendar">
      {this.state.days.map((day, index) => (
        <li className="day" key={day} onClick={() => this.props.selectDay(day)}>
          <div className="dayName">{day}</div>
          <div className="dayContent"></div>
        </li>
      ))}
      </ul>
    )
  }
}

export default connect(null, {selectDay})(Calendar)

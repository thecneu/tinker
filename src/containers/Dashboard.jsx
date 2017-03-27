import React from 'react'
import { connect } from 'react-redux'
import { getGroups } from '../reducers'
import { addGroupToDay } from '../actions'
import WorkoutTitles from '../components/WorkoutTitles';
import './dashboard.css'

class Dashboard extends React.Component {
  addWorkout = (name) => {
    this.props.addWorkout(name, this.props.selected)
  }

  render() {
    const { selected, cardio, groups } = this.props
    return (
      selected ?
        <section className="well">
          <h2>{selected}</h2>
          <WorkoutTitles exerciseGroups={groups} cardio={cardio} addWorkout={this.addWorkout} />
        </section>
      : false
    )
  }
}

export default connect(
  (state) => ({
    selected: state.selected,
    cardio: state.cardio,
    groups: getGroups(state)
  }),
  { addWorkout: addGroupToDay }
)(Dashboard)

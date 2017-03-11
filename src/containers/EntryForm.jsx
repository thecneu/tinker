import React from 'react'
import { connect } from 'react-redux'
import { createEntry } from '../actions'
import { getExerciseOptions } from '../reducers'

class EntryForm extends React.Component {
  state = { useCardio: true }

  toggleUseCardio = () => this.setState({useCardio: !this.state.useCardio})

  onSubmit = (e) => {
    const form = e.currentTarget
    const data = this.state.useCardio ? {
      type: 'cardio',
      time: form.time.value,
      distance: form.distance.value,
      calories: form.distance.value
    } : {
      type: 'exercise',
      exercise: form.exercise.value,
      weight: form.weight.value
    }

    e.preventDefault()
    this.props.createEntry(data)
  }

  render() {
    const cardio = (
      <div className="form-group">
        <input required type="text" name="time" placeholder="Time" />
        <input required type="text" name="distance" placeholder="Distance" />
        <input required type="text" name="calories" placeholder="Calories" />
      </div>
    )

    const exercise = (
      <div className="form-group">
        <select required name="exercise">
          {this.props.exercises.map(exercise => <option value={exercise.name}>{exercise.name}</option>)}
        </select>
        <input required type="text" name="weight" placeholder="Weight" />
      </div>
    )

    return (
      <form required onSubmit={this.onSubmit}>
        <select name="type" onChange={this.toggleUseCardio}>
          <option value="cardio">Cardio</option>
          <option value="exercise">Exercise</option>
        </select>

        {this.state.useCardio ? cardio : exercise}

        <button type="submit">Create Entry</button>
      </form>
    )
  }
}

export default connect(
  ({exercises}) => ({ exercises: getExerciseOptions(exercises) }),
  { createEntry }
)(EntryForm)
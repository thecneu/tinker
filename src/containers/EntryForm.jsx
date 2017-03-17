import React from 'react'
import { connect } from 'react-redux'
import { createEntry } from '../actions'
import { getExerciseOptions } from '../reducers'
import Input from '../components/Input'
import Select from '../components/Select'

class EntryForm extends React.Component {
  state = { useCardio: true }

  toggleUseCardio = () => this.setState({useCardio: !this.state.useCardio})

  onSubmit = (e) => {
    const data = this.state.useCardio ? {
      type: 'cardio',
      time: this.state.time,
      distance: this.state.distance,
      calories: this.state.calories
    } : {
      type: 'exercise',
      exercise: this.state.exercise,
      weight: this.state.weight
    }

    e.preventDefault()
    this.props.createEntry(data)
  }

  onInputChange = (e) => {
    const input = e.currentTarget
    this.setState({[input.name]: input.value})
  }

  render() {
    const cardio = [
      <Input required onInputChange={this.onInputChange} key="time" name="time" label="Time"  />,
      <Input required onInputChange={this.onInputChange} key="distance" name="distance" label="Distance" />,
      <Input required onInputChange={this.onInputChange} key="calories" name="calories" label="Calories" />
    ]

    const exercise = [
      <Select required onInputChange={this.onInputChange} name="exercise" label="Exercise" options={this.props.exercises} key="exercise" />,
      <Input required onInputChange={this.onInputChange} name="weight" label="Weight" key="weight" />
    ]

    return (
      <form required onSubmit={this.onSubmit}>
        <Select name="type" onChange={this.toggleUseCardio}>
          <option value="cardio">Cardio</option>
          <option value="exercise">Exercise</option>
        </Select>

        {this.state.useCardio ? cardio : exercise}

        <button type="submit">Create Entry</button>
      </form>
    )
  }
}

const mapStateToProps = ({exercises}) => ({ exercises: getExerciseOptions(exercises) })

export default connect(
  mapStateToProps,
  { createEntry }
)(EntryForm)
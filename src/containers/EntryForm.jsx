import React from 'react'
import { connect } from 'react-redux'
import { createEntry } from '../actions'
import { getExerciseOptions } from '../reducers'
import Number from '../components/Number'
import Select from '../components/Select'

class EntryForm extends React.Component {
  initialState = {
    useCardio: true,
    errors: false,
    time: '',
    distance: '',
    calories: '',
    exercise: '',
    weight: ''
  }

  state = this.initialState

  toggleUseCardio = () => this.setState({useCardio: !this.state.useCardio})

  onSubmit = (e) => {
    e.preventDefault()

    let errors = 0
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

    this.setState({errors: false})

    Object.keys(data).forEach(key => {
      if (data[key] === '') {
        errors++
      }
    })

    if (!errors) {
      this.props.createEntry(data)
      this.reset()
    } else {
      this.setState({errors: true})
    }
  }

  onInputChange = (e) => {
    const input = e.currentTarget
    this.setState({[input.name]: input.value})
  }

  reset() {
    this.setState(this.initialState)
  }

  render() {
    const cardio = [
      <Number onInputChange={this.onInputChange} key="time" name="time" label="Time" value={this.state.time} />,
      <Number needsPeriod onInputChange={this.onInputChange} key="distance" name="distance" label="Distance" value={this.state.distance} />,
      <Number onInputChange={this.onInputChange} key="calories" name="calories" label="Calories" value={this.state.calories} />
    ]

    const exercise = [
      <Select required onInputChange={this.onInputChange} name="exercise" label="Exercise" key="exercise">
        {this.props.exercises.map(exercise => <option value={exercise.value} key={exercise.value}>{exercise.title}</option>)}
      </Select>,
      <Number onInputChange={this.onInputChange} name="weight" label="Weight" key="weight" value={this.state.weight} />
    ]

    return (
      <form className="entry-form" onSubmit={this.onSubmit} noValidate>
        <Select name="type" onInputChange={this.toggleUseCardio}>
          <option value="cardio">Cardio</option>
          <option value="exercise">Exercise</option>
        </Select>

        {this.state.useCardio ? cardio : exercise}
        {this.state.errors && <p className="text-danger text-center">Missing Fields</p>}
        <button type="submit" className="center-block btn btn-primary">Create Entry</button>
      </form>
    )
  }
}

const mapStateToProps = ({exercises}) => ({ exercises: getExerciseOptions(exercises) })

export default connect(
  mapStateToProps,
  { createEntry }
)(EntryForm)

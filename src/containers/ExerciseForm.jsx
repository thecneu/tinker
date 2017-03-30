import React from 'react'
import { connect } from 'react-redux'
import { createExercise, updateExercise } from '../actions'
import { getExercise } from '../reducers'
import Input from '../components/Input'

class ExerciseForm extends React.Component {
  initialState = {
    name: '',
    muscleGroup: '',
    description: '',
    reps: 10,
    sets: 4,
    image: '',
    videoUrl: ''
  }

  state = { ...this.initialState }

  onSubmit(e) {
    const data = {
      name: this.state.name,
      muscleGroup: this.state.muscleGroup,
      description: this.state.description,
      reps: this.state.reps,
      sets: this.state.sets,
      image: this.state.image,
      videoUrl: this.state.videoUrl
    }

    e.preventDefault()
    this.props.saveExercise(data)
    this.reset()
  }

  onInputChange = (e) => {
    const input = e.currentTarget
    this.setState({[input.name]: input.value})
  }

  reset() {
    this.setState(this.initialState)
  }

  render() {
    return(
      <form onSubmit={this.onSubmit}>
        <Input onInputChange={this.onInputChange} name="name" label="Name" value={this.state.name} />
        <Input onInputChange={this.onInputChange} name="muscleGroup" label="Muscle Group" value={this.state.muscleGroup} />
        <Input onInputChange={this.onInputChange} name="description" label="Description" value={this.state.description} />
        <Input onInputChange={this.onInputChange} name="reps" label="Reps" value={this.state.reps} />
        <Input onInputChange={this.onInputChange} name="sets" label="Sets" value={this.state.sets} />
        <Input onInputChange={this.onInputChange} name="image" label="Animation" value={this.state.image} />
        {this.state.image ? <img src={this.state.image} alt="" /> : false}
        <Input onInputChange={this.onInputChange} name="videoUrl" label="Video URL" value={this.state.videoUrl} />
        <button type="submit" className="center-block btn btn-primary">Save</button>
      </form>
    )
  }
}

const mapStateToProps = ({exercises}, {id}) => getExercise(id, exercises)

const mapDispatchToProps = (dispatch, props) => ({
  saveExercise: (data) => props.id ? dispatch(updateExercise(props.id, data)) : dispatch(createExercise(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseForm)

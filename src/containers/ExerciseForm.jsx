import React from 'react'
import { connect } from 'react-redux'
import { createExercise, updateExercise } from '../actions'
import { getExercise } from '../reducers'
import Input from '../components/Input'

class ExerciseForm extends React.Component {
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
  }

  render() {
    return(
      <form onSubmit={this.onSubmit}>
        <Input onInputChange={this.onInputChange} name="name" label="Name" value={this.state.name} />
        <Input onInputChange={this.onInputChange} name="muscleGroup" label="Muscle Group" value={this.state.muscleGroup} />
        <Input onInputChange={this.onInputChange} name="description" label="Description" value={this.state.description} />
        <Input onInputChange={this.onInputChange} name="reps" label="Reps" defaultValue="10" value={this.state.reps} />
        <Input onInputChange={this.onInputChange} name="sets" label="Sets" defaultValue="4" value={this.state.sets} />
        <Input type="file" name="image" label="Animation" />
        {this.state.image ? <img src={this.state.image} alt="" /> : false}
        <Input onInputChange={this.onInputChange} name="videoUrl" label="Video URL" value={this.state.videoUrl} />
        <button type="submit">Save</button>
      </form>
    )
  }
}

const mapStateToProps = ({exercises}, {id}) => getExercise(id, exercises)

const mapDispatchToProps = (dispatch, props) => ({
  saveExercise: (data) => props.id ? dispatch(updateExercise(props.id, data)) : dispatch(createExercise(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseForm)
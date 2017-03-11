import React from 'react'
import { connect } from 'react-redux'
import { createExercise, updateExercise } from '../actions'
import { getExercise } from '../reducers'

class ExerciseForm extends React.Component {
  onSubmit(e) {
    const form = e.currentTarget
    const data = {
      name: form.name.value,
      muscleGroup: form.muscleGroup.value,
      description: form.description.value,
      reps: form.reps.value,
      sets: form.sets.value,
      image: form.image.value,
      videoUrl: form.videoUrl.value
    }

    e.preventDefault()
    this.props.saveExercise(data)
  }

  render() {
    const {name, muscleGroup, description, reps, sets, image, videoUrl} = this.props

    return(
      <form onSubmit={this.onSubmit}>
        <input type="text" name="name" placeholder="Name" value={name} />
        <input type="text" name="muscleGroup" placeholder="Muscle Group" value={muscleGroup} />
        <input type="text" name="description" placeholder="Description" value={description} />
        <input type="text" name="reps" placeholder="Reps" defaultValue="10" value={reps} />
        <input type="text" name="sets" placeholder="Sets" defaultValue="4" value={sets} />
        <input type="file" name="image" placeholder="Animation" />
        {image ? <img src={image} alt="" /> : false}
        <input type="text" name="videoUrl" placeholder="Video URL" value={videoUrl} />
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
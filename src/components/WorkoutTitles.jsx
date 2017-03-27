import React from 'react'

const WorkoutTitles = ({exerciseGroups, cardio, addWorkout}) => (
  <div className="workoutTitles">
    <ul>
      {exerciseGroups.map((group) =>
        <li className="workoutTitle" key={group} onClick={() => addWorkout({group})}>{group}</li>
      )}
    </ul>
    <ul>
      {cardio.map((cardioName) =>
        <li className="workoutTitle" key={cardioName} onClick={() => addWorkout({name: cardioName})}>{cardioName}</li>
      )}
    </ul>
  </div>
)

export default WorkoutTitles

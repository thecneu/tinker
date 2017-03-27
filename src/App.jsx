import React from 'react'
import Actions from './containers/Actions'
import Header from './containers/Header'
import Calendar from './containers/Calendar'
import Dashboard from './containers/Dashboard'


const App = ({phase, week, }) => (
  <main className="app">
    <div className="container-fluid" style={{paddingLeft: 42, paddingRight: 42}}>
      <Header />
      <Calendar />
      <Dashboard />
      <Actions />
    </div>
  </main>
)

export default App

/*
Flow of program:

(Empty)
Click day
  Show dashboard (*exercises)
    Exercise types (chest)
    Cardio types
Select type (*calendar)
  Already chosen exercise type filtered out except for cardio
  Type added to day
  4 attributes are added to the day
Select day
  Show dashboard (*calendar day)
    Workout & Cardio cards
*/

import React from 'react'
// import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

const App = ({children}) => (
  <div className="app">
    <main>
      {children}
    </main>
  </div>
)

export default App

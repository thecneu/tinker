import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

const App = ({children}) => (
  <div className="app">
    <main>
      {children}
    </main>
  </div>
)

export default App

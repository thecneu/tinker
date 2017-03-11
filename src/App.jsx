import React from 'react'
import Header from './components/Header'
import './App.css'

const App = ({children}) => (
  <div className="app">
    <Header />
    <main>
      {children}
    </main>
  </div>
)

export default App
import React from 'react'
import Action from './components/Action'


const App = ({children}) => (
  <main>
    <Action />
    <article className="container">
      {children}
    </article>
  </main>
)

export default App

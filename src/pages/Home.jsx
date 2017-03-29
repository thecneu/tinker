import React from 'react'
import EntryForm from '../containers/EntryForm'
import Action from '../components/Action'

const Home = () => (
  <article className="container">
    <EntryForm />
    <Action path="/" />
  </article>
)

export default Home

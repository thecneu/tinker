import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </header>
        <main>
          <article>
            <h1>Exercise</h1>
            <form>
              <input type="text" name="name"/>
              <input type="text" name="musclegroup"/>
              <input type="text" name="description"/>
              <input type="text" name="reps"/>
              <input type="text" name="sets"/>
              <input type="file" name="image"/>
              <input type="text" name="videourl"/>
            </form>

            <form>
              <select name="type">
                <option value="cardio">Cardio</option>
                <option value="exercise">Exercise</option>
              </select>
              <input type="text" name="time"/>
              <input type="text" name="distance"/>
              <input type="text" name="calories"/>
              <select name="exercise"></select>
              <input type="text" name="weight"/>
            </form>
          </article>
        </main>
      </div>
    );
  }
}

export default App;

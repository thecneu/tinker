import React, { Component } from 'react';
import Navigation from './components/Navigation'
import MainContent from './components/MainContent'
import Homepage from './containers/Homepage'
import Lightbox from './components/Lightbox'

class App extends Component {
  render() {
    return (
      <main>
        <Navigation />
        <MainContent>
          <Homepage />
        </MainContent>
        <div id="lightboxPageOverlay"></div>
        <Lightbox />
      </main>
    );
  }
}

export default App;

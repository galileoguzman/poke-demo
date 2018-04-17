import React, { Component } from 'react';
import './App.css';
import PokeList from './PokeList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PokeList/>
      </div>
    );
  }
}

export default App;

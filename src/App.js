import React, { Component } from 'react';
import './App.css';
class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Notes Application</h1>
        <div id="input">
          </div>
        <header>
          <input type="text" className="text-input" placeholder="Enter Text"/>
          <button id="submit">Create Note</button>
        </header>

      </div>
    );
  }
}

export default App;
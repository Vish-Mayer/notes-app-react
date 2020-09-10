import React, { Component } from 'react';
import './App.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      items:[],
      currentItem:{
        text:' ',
        key:' '
      }
    }
  }

  handleInput(e) {
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem
    console.log(newItem)
  }

  render() {
    return (
      <div className="App">
        <h1>Notes Application</h1>
        <form id= "new-note-form" onSubmit={this.addItem.bind(this)}>
          <input type="text" className="text-input" placeholder="Enter Text"
          value={this.state.currentItem}
          onChange={this.handleInput.bind(this)}/>
          <button id="submit">Create Note</button>
        </form>
      </div>
    );
  }
}

export default App;
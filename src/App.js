import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)

    this.state={
      list: [],
      item:{
        body: '',
        id: ''
      }
    }
  }

  handleInput(e) {
    this.setState ({
      item:{
        body: e.target.value,
        id: Date.now()
      }
    })
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.item
    const list = [...this.state.list]
    list.push(newItem)
    this.setState ({
      list,
      item:{
        body: '',
        id: ''
      }
    })
    window.alert('you have added a new todo: ' + newItem.body);
  }

  render() {
    return (
      <div className="App">
        <h1>To Do List</h1>
        <form>
          <input
          id='text-input'
          type='text'
          placeholder='enter a new Todo'
          value={this.state.item.body}
          onChange={this.handleInput.bind(this)}
          >
          </input>
          <button
          id='submit' 
          onClick={this.addItem.bind(this)}>
            submit
          </button>
        </form>
        <br/>
          {this.state.list.map(item => {
            return (            
              <li
              id='text-output' 
              key={item.id}>
                {item.body}
                &nbsp;
                <button>
                  x
                </button>  
              </li>
            )
          })}
      </div>
    );
  }
}

export default App;


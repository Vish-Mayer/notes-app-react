import React from 'react';
import App from './App';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const simulateChangeonInput = (wrapper, inputSelector, newValue) => {
  const input = wrapper.find(inputSelector)
  input.simulate('change', {
    target: {value: newValue}
  })
  return wrapper.find(inputSelector)
}

const simulateChangeonClick = (wrapper, inputSelector) => {
  const input = wrapper.find(inputSelector)
  jest.spyOn(window, 'alert').mockImplementation(() => {})
    input.simulate('click', {
      preventDefault: () => {
      }
    })
}

describe('Notes', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders title of application', () => {
    expect(wrapper.find("h1").text()).toContain("To Do List")
  });

  it('renders an empty text field with a user prompt', () => {
    expect(wrapper.find('#text-input').at(0).props().placeholder).toEqual('enter a new Todo')
  });

  it('renders a button with text "submit"', () => {
    expect(wrapper.find("#submit").text()).toBe("submit")
  })

  it('saves the input state', () => {
    const updateInput = simulateChangeonInput(wrapper, '#text-input', 'New Note')
    expect(updateInput.props().value).toEqual('New Note')
  })

  it('renders the new note on the page with a button to delete note', () => {
    simulateChangeonInput(wrapper, '#text-input', 'New Note')
    simulateChangeonClick(wrapper, '#submit')
    let textOutput = wrapper.find('#text-output')
    expect(textOutput.props().children).toEqual["New Note", <button>x</button>]
  })

  it('alerts a user when a new note is added', () => {
    simulateChangeonInput(wrapper, '#text-input', 'New Note')
    simulateChangeonClick(wrapper, '#submit')
    expect(global.alert).toBeCalledWith("you have added a new todo: New Note")
  })

  it('deletes a note', () => {
    simulateChangeonInput(wrapper, '#text-input', 'New Note')
    simulateChangeonClick(wrapper, '#submit')
    wrapper.find('#delete').simulate('click')
    let textOutput = wrapper.find('#text-output')
    expect(textOutput.children().length).toBe(0);
  })
});


  
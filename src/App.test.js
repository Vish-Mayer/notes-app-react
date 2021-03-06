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

const simulateVaildSubmit = (wrapper) => {
  simulateChangeonInput(wrapper, '#text-input', 'New Note')
  simulateChangeonClick(wrapper, '#submit')
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

  it('does not allow user to submit a blank field', () => {
    simulateChangeonInput(wrapper, '#text-input', '')
    simulateChangeonClick(wrapper, '#submit')
    let textOutput = wrapper.find('#text-output')
    expect(textOutput.children().length).toBe(0);
  })

  it('alerts the user when a user submits a blank field', () => {
    simulateChangeonInput(wrapper, '#text-input', '')
    simulateChangeonClick(wrapper, '#submit')
    expect(global.alert).toBeCalledWith('Field cannot be left blank.')
  })

  it('alerts a user when a new note is added', () => {
    simulateVaildSubmit(wrapper)
    expect(global.alert).toBeCalledWith("you have added a new todo: New Note")
  })
});






  
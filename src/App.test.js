import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const simulateChangeonInput = (wrapper, inputSelector ,newValue) => {
  const input = wrapper.find(inputSelector)
  input.simulate('change', {
    target: {value: newValue}
  })
  return wrapper.find(inputSelector)
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
  it('renders the new note on the page', () => {
    const updateInput = simulateChangeonInput(wrapper, '#text-input', 'New Note')
    expect(updateInput.props().value).toEqual('New Note')
    wrapper.find('#submit').simulate('click', {
      preventDefault: () => {
      }
     });
    let textOutput = wrapper.find('#text-output')
    expect(textOutput.props().children).toEqual("New Note")
  })
});


  
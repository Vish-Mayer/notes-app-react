import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { emptyStatement } from '@babel/types';

configure({ adapter: new Adapter() });

describe('Notes', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test('renders title of application', () => {
    expect(wrapper.find("h1").text()).toContain("Notes Application")
  });

  test('renders an empty text field that reads "Enter Text', () => {
    expect(wrapper.find('.text-input').at(0).props().placeholder).toEqual('Enter Text')
  });

  test('renders a button with text "Create Note"', () => {
    expect(wrapper.find("#submit").text()).toBe("Create Note")
  })

  test('saves the input state', () => {
    let textInput = wrapper.find('.text-input').first()
    textInput.simulate('change', {
      target: { value: "New Note"}
    })
    textInput = wrapper.find('.text-input').first()
    expect(textInput.props().value).toEqual('New Note')
  })
});


 
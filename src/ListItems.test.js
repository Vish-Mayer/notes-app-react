import React from 'react';
import ListItems from './ListItems';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('ListItems', () => {

  let wrapper;

  beforeEach(() => {
    const items = [{body: "New note", id: "12345"}]
    wrapper = shallow(<ListItems list={items}/>)
  });

  it('renders title of application', () => {
    expect(wrapper.find("h1").text()).toContain("This is the list")
  });

  it('renders the new note on the page', () => {
    const textEl = wrapper.find("#text-output p")
    expect(textEl.text()).toContain("New note") 
  })

  it('deletes an item from the list', () => {
  
  })
});

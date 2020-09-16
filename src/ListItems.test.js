import React from 'react';
import ListItems from './ListItems';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('ListItems', () => {

  let wrapper;
  let deleteItemMock
  let itemsMock
  let setUpdateMock
  
  beforeEach(() => {
    deleteItemMock = jest.fn();
    setUpdateMock = jest.fn();
    itemsMock = [{body: "New Note", id: "12345"}]
    wrapper = shallow(<ListItems 
                      list={itemsMock}
                      deleteItem={deleteItemMock}
                      setUpdate={setUpdateMock}/>)
  });

  it('renders title of application', () => {
    expect(wrapper.find("h1").text()).toContain("This is the list")
  });

  it('renders the new note on the page', () => {
    expect(wrapper.find('input').props().value).toBe('New Note') 
  })

  it('renders the new list on the page after a new note is deleted', () => {
    wrapper.find('#delete').simulate('click')
    expect(deleteItemMock).toHaveBeenCalledWith("12345")
  })

  it('allows a user to edit a note', () => {
    const input = wrapper.find('input')
    input.simulate('change', {
      target: {value: 'Hi there'}
    })
    expect(setUpdateMock).toHaveBeenCalledWith("Hi there", "12345")
  })
});

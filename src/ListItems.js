import React from 'react';

function ListItems(props) {
   const list = props.list
    const displayItems = list.map((item, index) => 
    {
      return <div id='text-output' key={index}>
            <p>
              {item.body } 
              &nbsp;
              <button
              id="delete"
              onClick={ () => props.deleteItem(item.id)}>
                X
              </button>
            </p>
        </div>
    })
  return(
  <div>
    <h1>This is the list</h1>
    {displayItems}
  </div>
  )
}

export default ListItems
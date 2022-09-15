import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ListSvg from './assets/img/list.svg';
import DB from './assets/db.json';

import { List, AddListButton, Tasks } from './components';

function App() {
  const [lists, setList] = useState(null);
  const [colors, setColors] = useState(null);

  // receive data (lists and colors objects) when app renders (one time)
  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color').then(({data}) => {
      setList(data);
    });
    axios.get('http://localhost:3001/colors').then(({data}) => {
      setColors(data);
    });
  }, [])

  const onAddList = obj => {
    const newList = [...lists, obj];
    setList(newList);
  }

  return (
    <div className="todo">
      <div className="todo__sidebar">
        {/* displays sidebar of lists of todos */}
        {/* active == true when the list is selected */}
        <List items={[
          {
            icon: ListSvg,
            name: "Всі завдання",
            active: true,
          }
        ]}/>
        {/* check if lists exist into DB and render them */}
        {/* isRemovable - only for todo-lists */}
        {/* items contains array of todo-lists */}
        {/* onRemove receive object-list to remove it */}
        {lists ? (
          <List 
          items = {lists}
          onRemove={(obj) => console.log(obj)}
          isRemovable />
        ) : (
          'Завантаження...'
        )}
        {/* btn to add new list of todos */}
        {/* receives array of colors to display them as badge into popup */}
        {/* onnAdd receives new list-object and creates new todo-list */}
        <AddListButton onAdd={onAddList} colors={colors} />
      </div>
      
      {/* main window that displays all tasks of a list */}
      <div className="todo__tasks">
        <Tasks />
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ListSvg from './assets/img/list.svg';
import DB from './assets/db.json';

import { List, AddListButton, Tasks } from './components';

function App() {
  const [lists, setList] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  // receive data (lists and colors objects) when app renders (one time)
  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
      setList(data);
    });
    axios.get('http://localhost:3001/colors').then(({data}) => {
      setColors(data);
    });
  }, [])

  const onAddList = obj => {
    const newList = [...lists, obj];
    setList(newList);
  };

  const onEditListTitle = (id, title) => {
    // receive new title returned from Tasks.jsx
    const newList = lists.map(item => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    // set new list title
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
          // return new object without deleted list
          onRemove={(id) => {
            const newLists = lists.filter(list => list.id !== id);
            setList(newLists);
          }}
          // activeItem opens a list with tasks in main-window
          onClickItem={item => {
            setActiveItem(item);
          }}
          activeItem={activeItem}
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
      {/* firstly check if todo-lists exist and then render them */}
      <div className="todo__tasks">
        {lists && activeItem && (
          <Tasks 
            list={activeItem}
            onEditTitle={onEditListTitle}
          />
        )}
      </div>
    </div>
  );
}

export default App;

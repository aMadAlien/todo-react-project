import React, { useState } from 'react';

import ListSvg from './assets/img/list.svg';
import AddListButton from './components/AddListButton/AddListBtn';
import DB from './assets/bd.json';
import List from './components/List/List';
import Tasks from './components/Tasks/Tasks';

function App() {
  // assigns array of todo-lists from DB to list state
  const [lists, setList] = useState(
    DB.lists.map(item => {
      item.color = DB.colors.filter(color => color.id === item.colorId)[0].hex;
      return item;
    })
  );

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
        {/* isRemovable - only for todo-lists */}
        {/* items contains array of todo-lists */}
        {/* onRemove receive object-list to remove it */}
        <List 
        items = {lists}
        onRemove={(obj) => console.log(obj)}
        isRemovable />
        {/* btn to add new list of todos */}
        {/* receives array of colors to display them as badge into popup */}
        {/* onnAdd receives new list-object and creates new todo-list */}
        <AddListButton onAdd={onAddList} colors={DB.colors} />
      </div>
      
      {/* main window that displays all tasks of a list */}
      <div className="todo__tasks">
        <Tasks />
      </div>
    </div>
  );
}

export default App;

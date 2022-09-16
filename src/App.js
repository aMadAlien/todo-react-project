import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';

import ListSvg from './assets/img/list.svg';

import { List, AddListButton, Tasks } from './components';

function App() {
  const [lists, setList] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  let navigate = useNavigate();
  let location = useLocation();

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

  const onAddTask = (listId, taskObj) => {
    // receive task-object from AddTaskForm.jsx
    const newTask = lists.map(list => {
      // look for appropriate list and add new task-object
      if (list.id === listId) {
        list.tasks = [...list.tasks, taskObj];
      }
      return list;
    });
    // set new task
    setList(newTask);
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
  };

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm('Дійсно бажаєте видалити завдання?')) {
      // return new list of tasks without selected one (removed)
      const newList = lists.map(item => {
        // work with tasks from appropriate list
        if (item.id === listId) {
          // return tasks id of which doesn't match id of selected task
          item.tasks = item.tasks.filter(task => task.id !== taskId);
        }
        return item;
      });

      setList(newList);

      // delete a task from DB by its id
      axios.delete('http://localhost:3001/tasks/' + taskId)
      .catch(() => {
        alert("Не вдалося видалити завдання");
      })
    }
  };

  const OneList = () => {
    return (
      <div>
          {lists && activeItem && (
            <Tasks 
              list={activeItem}
              onAddTask={onAddTask}
              onRemoveTask={onRemoveTask}
              onEditTitle={onEditListTitle}
            />
          )}
      </div>
    )
  };

  const AllLists = () => {
    return (
      <div>
      {lists &&
        lists.map(list => (
          <Tasks 
            key={list.id}
            list={list}
            onAddTask={onAddTask}
            onEditTitle={onEditListTitle}
            empty={false}
          />
      ))}
      </div>
    )
  }

  // open appropriate list of tasks in main-window
  useEffect(() => {
    // location.pathname receives path (list/[id]) from useLocation
    const listId = location.pathname.split('lists/')[1];
    if (lists) {
      // arround all lists look for one with the same id as the path
      const list = lists.find(list => list.id === Number(listId));
      // make found list active and open its tasks
      setActiveItem(list);
    }
  }, [location.pathname])

  return (
    <div className="todo">
      <div className="todo__sidebar">
        {/* displays sidebar of lists of todos */}
        {/* active == true when the list is selected */}
        <List
          onClick={list => {navigate("/")}}
          items={[
            {
              icon: ListSvg,
              name: "Всі завдання",
              active: true,
            }
          ]}
        />
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
            navigate(`/lists/${item.id}`);
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
      {/* has capability to create new task in list */}
      <div className="todo__tasks">
        <Routes>
          {/* display all lists of tasks in main-window */}
          <Route path='/' element={<AllLists />} ></Route>
          {/* display separaye list of tasks in main-window */}
          <Route path="/lists/:id" element={<OneList />} ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

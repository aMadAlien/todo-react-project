import React from "react";
import axios from "axios";

import './Tasks.scss';
import EditTitle from '../../assets/img/edit.svg';
import Task from "./Task";
import AddTaskForm from "./AddTaskForm";

// ! onAddTask must be changed to context
const Tasks = ({ list, onEditTitle, onAddTask, empty, onRemoveTask, onEditTask }) => {

    const editTitle = () => {
        // window with input to enter new title
        const newTitle = window.prompt("Назва списку", list.name)
        
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            // change new list title in DB
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            })
            .catch(() => {
                alert("Помилка оновлення назви списку");
            })
        }
    };

    return (
        <div className="tasks">
            {/* title is the same color as selected list-badge */}
            <h2 className="tasks__title" style={{color: list.color.hex}}>
                {list.name}
                {/* icon-btn to edit a title */}
                {/* onClick gives capability to change list title */}
                <i onClick={editTitle} className="tasks__edit-title"><img src={EditTitle} alt="edit" /></i>
            </h2>

            {/* check if list empty */}
            {empty && !list.tasks.length && <h2 className="tasks__no-tasks">Немає завдань</h2>}

            <div className="tasks__items">
                {list.tasks.map(item => (
                    // block of tasks (containes: checkbox, task-text, funcs (remove/edit task))
                    <Task
                        key={item.id}
                        list={list}
                        onEdit={onEditTask}
                        onRemove={onRemoveTask}
                        {...item}
                    />
                ))}
            </div>

            {/* btn (form) to add a new task into list */}
            <AddTaskForm list={list} onAddTask={onAddTask} />
        </div>
    )
}

export default Tasks;
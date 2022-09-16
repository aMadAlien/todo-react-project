import React from "react";
import { useState } from "react";
import axios from "axios";

import AddTask from '../../assets/img/add.svg';

const AddTaskForm = ({ list, onAddTask }) => {
    // open/close form for create=ing a new task
    const [isVisible, setIsVisible] = useState(false);
    // input value (name) for a new task
    const [inputValue, setInputValue] = useState("");
    // loading when adding a new task
    const [isLoadning, setIsLoadning] = useState(false);

    // open/close add-task-form instead add-btn
    const toggleFormVisible = () => {
        setIsVisible(!isVisible);
        setInputValue("");
    }

    const addTask = () => {
        // task-object to add
        const object = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
        };
        // start loading while additing a task
        setIsLoadning(true);

        // create e new task-object (object describer above) in DB
        // then receive data from DB and send it and list-id in App.js
        axios.post('http://localhost:3001/tasks/', object).then(({data}) => {
            onAddTask(list.id, data);
            toggleFormVisible();
        })
        // catch error while additing a task
        .catch(() => {
            alert("Помилка при дадованні завдання!");
        })
        // stop loading when task is added or not
        .finally(() => {
            setIsLoadning(false);
        })
    }

    return (
        <div className="tasks__form">
            {!isVisible ? (
                // btn for adding a new task
                <div className="tasks__form-new">
                    <img src={AddTask} alt="Add task" />
                    <span onClick={toggleFormVisible}>Нове завдання</span>
                </div>                
            ) : (
                <div className="tasks__form-block">
                    {/* input for adding a new task */}
                    <input 
                        type="text"
                        className="field" 
                        placeholder="Назва завдання" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />

                    <button disabled={isLoadning} onClick={addTask} className="button">
                        {isLoadning ? "Додається..." : "Додати завдання"}
                    </button>

                    <button onClick={toggleFormVisible} className="button button--grey">
                        Скасувати
                    </button>
                </div>                
            )}
        </div>
    )
}

export default AddTaskForm;
import React from "react";

import './Tasks.scss';
import EditTitle from '../../assets/img/edit.svg';
import CheckItem from '../../assets/img/check.svg';

const Tasks = ({ list }) => {
    return (
        <div className="tasks">
            <h2 className="tasks__title">
                {list.name}
                {/* icon-btn to edit a title */}
                <i className="tasks__edit-title"><img src={EditTitle} alt="edit" /></i>
            </h2>

            <div className="tasks__items">
                {list.tasks.map(item => (
                    <div key={item.id} className="tasks__item">
                        {/* checkbox */}
                        <div className="checkbox">
                            {/* {`task--${item.id}`} => make chackbox work correctly */}
                            <input type="checkbox" id={`task--${item.id}`} />
                            <label htmlFor={`task--${item.id}`}><i><img src={CheckItem} alt="check" /></i></label>
                        </div>
                        {/* task */}
                        <input readOnly value={item.text} type="text" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tasks;
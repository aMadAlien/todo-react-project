import React from "react";

import './Tasks.scss';
import EditTitle from '../../assets/img/edit.svg';
import CheckItem from '../../assets/img/check.svg';

const Tasks = () => {
    return (
        <div className="tasks">
            <h2 className="tasks__title">
                Фронтенд
                {/* icon-btn to edit a title */}
                <i className="tasks__edit-title"><img src={EditTitle} alt="edit" /></i>
            </h2>

            <div className="tasks__items">
                <div className="tasks__item">
                    {/* checkbox */}
                    <div className="checkbox">
                        <input type="checkbox" id="check" />
                        <label htmlFor="check"><i><img src={CheckItem} alt="check" /></i></label>
                    </div>
                    {/* task */}
                    <p>learn react redux saga</p>
                </div>
            </div>
        </div>
    )
}

export default Tasks;
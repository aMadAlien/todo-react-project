import React from "react";
import classNames from 'classname';

import RemoveList from '../../assets/img/remove.svg';
import Badge from "../Badge/Badge";
import './List.scss';

const List = ({ items, isRemovable, onClick, onRemove }) => {
    // remove tofo-list
    const removeList = (obj) => {
        // ask if user actually wanna remove list
        if (window.confirm("Дійсно бажаєте видалити?")){
            // return object list to remove
            onRemove(obj);
        }
    }

    return (
        // onClick is received from add-list-btn and responsible for open/close popup
        <ul onClick={onClick} className="list">
            {
            items.map((item, index) => (
                // receives className, and assigns active one if true
                <li key={index} className={classNames(item.className, {'active': item.active})}>

                    {/* displays appropriate icon/color-badge near list name */}
                    {
                    item.icon ? 
                    (<i><img src={item.icon} alt="List icon"/></i>) : 
                    (<Badge color={item.color.hex} />)
                    }

                    <span>{item.name}</span>

                    {/* cheack if it is todo-list and display remove-btn */}
                    {
                    isRemovable && 
                    <i onClick={() => removeList(item)} className="list__remove-btn">
                        <img src={RemoveList} alt="remove" />
                    </i>
                    }

                </li>
            ))
            }
        </ul>
    )
}

export default List;
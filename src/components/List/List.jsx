import React from "react";
import classNames from 'classname';
import axios from 'axios';

import RemoveList from '../../assets/img/remove.svg';
import Badge from "../Badge/Badge";
import './List.scss';

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {
    // remove tofo-list
    const removeList = (list) => {
        // ask if user actually wanna remove list
        if (window.confirm("Дійсно бажаєте видалити?")){
            axios.delete('http://localhost:3001/lists/' + list.id).then(() => {
                // return list-id to remove
                onRemove(list.id);
            })
        }
    }

    return (
        // onClick is received from add-list-btn and responsible for open/close popup
        <ul onClick={onClick} className="list">
            {
            items.map((item, index) => (
                // receives className, and assigns active one if true
                <li
                    key={index}
                    // if item.active select "all tasks", otherwise one of lists
                    className={classNames(item.className, {
                        'active': item.active 
                            ? item.active 
                            : activeItem && activeItem.id === item.id
                        })}
                    // return clicked list object to open list in main-window
                    onClick={onClickItem ? () => onClickItem(item) : null}
                >

                    {/* displays appropriate icon/color-badge near list name */}
                    {
                    item.icon ? 
                    (<i><img src={item.icon} alt="List icon"/></i>) : 
                    (<Badge color={item.color.hex} />)
                    }

                    {/* display lists length */}
                    <span>
                        {item.name}
                        {item.tasks && ` (${item.tasks.length})`}
                    </span>

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
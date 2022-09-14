import React from "react";
import classNames from 'classname';

import Badge from "../Badge/Badge";
import './List.scss';

const List = ({ items, className, onClick }) => {
    return (
        // onClick is received from add-list-btn and responsible for open/close popup
        <ul onClick={onClick} className="list">
            {
            items.map((item, index) => (
                // receives className as props, and assigns active one if true
                <li key={index} className={classNames(className, {'active': item.active})}>
                    {/* displays appropriate icon/color-badge near list name */}
                    {
                    item.icon ? 
                    (<i><img src={item.icon} alt="List icon"/></i>) : 
                    (<Badge color={item.color} />)
                    }
                    <span>{item.name}</span>
                </li>
            ))
            }
        </ul>
    )
}

export default List;
import React, { Fragment, useState } from "react";

import "./AddListBtn.scss";
import List from "../List/List";
import AddList from "../../assets/img/add-list.svg";
import CloseList from "../../assets/img/close.svg";
import Badge from "../Badge/Badge";

const AddListButton = ({ colors, onAdd }) => {
    // open/close the popup by setting the opposite value (true/false)
    const [visiblePopup, setVisiblePopup] = useState(false);
    // select color for list by clicking one
    const [selectedColor, setSelectedColor] = useState(colors[0].id);
    const [inputValue, setInputValue] = useState("");
    
    // close popup, clear input value and reset color badge 
    const onClose = () => {
        setVisiblePopup(false);
        setInputValue("");
        setSelectedColor(colors[0].id);
    }

    const addList = () => {
        // if there is any value (list name)
        if (inputValue) {
            // return object list to create new todo-list
            const color = colors.filter(color => color.id === selectedColor)[0].hex;
            onAdd({id: Math.random(), name: inputValue, colorId: selectedColor, color});
            onClose();
        } else {
            alert("put list name");
        }

    }

    return (
        <Fragment>
            {/* btn to add new list */}
            <List
                onClick={() => setVisiblePopup(!visiblePopup)}
                items={[
                    {
                    icon: AddList,
                    name: "Додати список",
                    active: false,
                    className: "add-list__btn"
                    },
                ]} 
            />
            {/* popup, appears by clicking on add-btn in sidebar and close by ckicking on close-btn */}
            {visiblePopup && (
            <div className="add-list__popup">
                {/* close list btn */}
                <i onClick={onClose} className="add-list__close-btn"><img src={CloseList} alt="List icon"/></i>
                {/* input for list name */}
                <input 
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="add-list__list-name" 
                placeholder="Назва списку" 
                type="text" />
                {/* list of colors */}
                <div className="add-list__popup-colors">
                {
                colors.map(color => (
                    <Badge
                    onClick={() => setSelectedColor(color.id)} 
                    key={color.id} 
                    color={color.hex}
                    // check if selected color equals to the color id and assigns active class
                    className={selectedColor === color.id && "active"}
                    />
                ))
                }
                </div>
                {/* add list btn */}
                <button onClick={() => addList()} className="button add-list__add-btn">Додати</button>
            </div>
            )}
        </Fragment>
    )
}

export default AddListButton;
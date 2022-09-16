import React, { Fragment, useState } from "react";
import axios from 'axios';

import "./AddListBtn.scss";
import List from "../List/List";
import AddList from "../../assets/img/add.svg";
import CloseList from "../../assets/img/close.svg";
import Badge from "../Badge/Badge";
import { useEffect } from "react";

const AddListButton = ({ colors, onAdd }) => {
    // open/close the popup by setting the opposite value (true/false)
    const [visiblePopup, setVisiblePopup] = useState(false);
    // select color for list by clicking one
    const [selectedColor, setSelectedColor] = useState(3);
    // change value in input (list name)
    const [inputValue, setInputValue] = useState("");
    // loading after click add-btn
    const [isLoading, setIsLoading] = useState(false);

    // check if colors array exists and if colors are changed and set selected-color in color-list
    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectedColor(colors[0].id);
        }
    }, [colors])
    
    // close popup, clear input value and reset color badge 
    const onClose = () => {
        setVisiblePopup(false);
        setInputValue("");
        setSelectedColor(colors[0].id);
    }

    // return object list to create new todo-list
    const addList = () => {
        // if there is any value (list name)
        if (!inputValue) {
            alert("put list name");
            return;
        }
        setIsLoading(true);
        axios
        // put new list into lists DB with values: name and colorId
        .post( 'http://localhost:3001/lists', {
            name: inputValue,
            colorId: selectedColor,
        })
        .then(({data}) => {
            // return color hex
            const color = colors.filter(color => color.id === selectedColor)[0].hex;
            // create new object with new data (color list by hex)
            const listObject = { ...data, color: { hex: color } };
            // return new object to App.js where list-state is
            onAdd(listObject);
            onClose();
        })
        // catch error while adding a list
        .catch(() => {
            alert("Помилка при дадованні списку!");
        })
        .finally(() => {
            // stop loading in the end
            setIsLoading(false);
        });
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
                className="field" 
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
                <button onClick={() => addList()} className="button add-list__add-btn">
                    {/* check if new list is creating after click add-btn */}
                    {isLoading ? "Створення..." : "Додати"}
                </button>
            </div>
            )}
        </Fragment>
    )
}

export default AddListButton;
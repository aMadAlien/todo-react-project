import React, { Fragment, useState } from "react";

import "./AddListBtn.scss";
import List from "../List/List";
import AddList from "../../assets/img/add-list.svg";
import CloseList from "../../assets/img/close.svg";
import Badge from "../Badge/Badge";

const AddListButton = ({ colors }) => {
    // open/close the popup by setting the opposite value (true/false)
    const [visiblePopup, setVisiblePopup] = useState(false);
    // select color for list by clicking one
    const [selectedColor, setSelectedColor] = useState(colors[0].id);

    return (
        <Fragment>
            {/* btn to add new list */}
            <List
                onClick={() => setVisiblePopup(!visiblePopup)}
                className="add-list__btn"
                items={[
                    {
                    icon: AddList,
                    name: "Додати список",
                    active: false
                    },
                ]} 
            />
            {/* popup, appears by clicking on add-btn in sidebar and close by ckicking on close-btn */}
            {visiblePopup && (
            <div className="add-list__popup">
                {/* close list btn */}
                <i onClick={() => setVisiblePopup(!visiblePopup)} className="add-list__close-btn"><img src={CloseList} alt="List icon"/></i>
                {/* input for list name */}
                <input className="add-list__list-name" type="text" placeholder="Назва списку" />
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
                <button className="button add-list__add-btn">Додати</button>
            </div>
            )}
        </Fragment>
    )
}

export default AddListButton;
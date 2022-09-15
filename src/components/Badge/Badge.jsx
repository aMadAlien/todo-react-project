import React from "react";
import classNames from "classname";

import './Badge.scss';

// onClick selects color for list by clicking one
// className is responsible for active class
const Badge = ({ color, onClick, className }) => {
    // displays list of colors from BD in color list in popup
    const styles = { 
        backgroundColor: color,
    };
    return (
        <i onClick={onClick} className={classNames("badge", className)} style={styles}></i>
    )
};

export default Badge;
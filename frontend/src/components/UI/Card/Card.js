import React from "react";
import classes from "./Card.module.scss";

const Card = React.forwardRef((props, ref) => {
    return (
        <div {...props}
            ref={ref}
            className={
                [props.className, classes.Card].join(" ")
        }>
            {
            props.children
        } </div>
    );
});

export default Card;

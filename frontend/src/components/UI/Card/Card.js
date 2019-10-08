import React from "react";
import classes from "./Card.module.scss";

const Card = React.forwardRef((props, ref) => {
  const ribbonColorClass = props.color ? classes[`Card--${props.color}`] : "";
  return (
    <div
      {...props}
      ref={ref}
      className={[props.className, ribbonColorClass, classes.Card].join(" ")}
    >
      {props.children}{" "}
    </div>
  );
});

export default Card;

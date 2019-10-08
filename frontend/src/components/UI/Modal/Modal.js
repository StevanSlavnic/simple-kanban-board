import React from "react";
import ModalUI from "@material-ui/core/Modal";
import Delete from "./../../../assets/images/icons/close_icon.svg";
import IconButton from "@material-ui/core/IconButton";
import Card from "./../../../components/UI/Card/Card";
import classes from "./Modal.module.scss";

const Modal = React.forwardRef((props, ref) => {
    return (
        <ModalUI {...props}
            ref={ref}
            className={
                classes.Modal
            }
            open={
                props.open
            }
            onClose={
                () => {
                    props.onClose();
                }
        }>
            <Card className={
                [classes.Card, props.className].join(" ")
            }>
                <IconButton className={
                        classes.CloseButton
                    }
                    onClick={
                        props.onClose
                }>
                    <img className={
                            classes.Icon
                        }
                        src={Delete}
                        alt="X mark"/>
                </IconButton>
                {
                props.children
            } </Card>
        </ModalUI>
    );
});

export default Modal;

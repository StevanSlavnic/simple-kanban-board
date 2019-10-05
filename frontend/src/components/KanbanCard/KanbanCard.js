import React from "react";
import {Button} from "@material-ui/core";

import Card from "../UI/Card/Card";
import classes from "./KanbanCard.module.scss";

const KanbanCard = props => {

    const ribbonColorClass = props.color ? classes[`Card--${
            props.color
        }`] : "";

    return (
        <Card draggable="true"
            className={
                [props.className, ribbonColorClass, classes.Card].join(" ")
            }
            key={
                props.card.id
            }
            onDragEnd={
                () => props.cardMoveId(props.card.id)
        }>

            <div className={
                classes.LocationGeneral
            }>
                <div>
                    <span className={
                        classes.LocationLabel
                    }>ID:</span>
                    {" "}
                    {
                    props.card.id
                } </div>
                <div>
                    <Button onClick={
                        () => {
                            props.openEditModal(props.card.id);
                        }
                    }>
                        Edit
                    </Button>
                    <Button onClick={
                        () => {
                            props.openDeleteModal(props.card.id);
                        }
                    }>
                        Delete
                    </Button>
                </div>
            </div>


            <div>
                <div>
                    <h2>{
                        props.card.title
                    }</h2>
                </div>
                <div>
                    <p>{
                        props.card.description
                    }</p>
                </div>
            </div>


            <div>


                <div>
                    <span className={
                        classes.LocationLabel
                    }>Project:</span>
                    {" "}
                    {
                    props.card.project
                } </div>
                <div>
                    <span className={
                        classes.LocationLabel
                    }>Priority:</span>
                    {" "}
                    {
                    props.card.priority
                } </div>
                <div>
                    <span className={
                        classes.LocationLabel
                    }>Due Date:</span>
                    {" "}
                    {
                    props.card.due_date
                } </div>
                <div>
                    <span className={
                        classes.LocationLabel
                    }>Category:</span>
                    {" "}
                    {
                    props.card.category
                } </div>
            </div>
        </Card>
    );
};

export default KanbanCard;

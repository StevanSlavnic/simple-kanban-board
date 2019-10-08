import React from "react";
import {Button} from "@material-ui/core";
import moment from "moment";

import Card from "../UI/Card/Card";
import classes from "./KanbanCard.module.scss";

const KanbanCard = props => {
    return (
        <Card draggable="true"
            className={
                [props.className, classes.Card].join(" ")
            }
            key={
                props.card.id
            }
            onDragEnd={
                () => props.cardMoveId(props.card.id)
            }
            color={
                props.color
        }>
            <div className={
                classes.CardGeneral
            }>
                <div>
                    <span className={
                        classes.CardLabel
                    }>ID:</span>
                    {
                    props.card.id
                }
                    {" "} </div>
                <div> {
                    props.done === "done" ? ("") : (
                        <Button onClick={
                            () => {
                                props.openEditModal(props.card.id);
                            }
                        }>
                            Edit
                        </Button>
                    )
                }
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
                        classes.CardLabel
                    }>Assignee:</span>
                    {" "}
                    {
                    props.card.assignee_name
                }
                    {" "} </div>
                <div>
                    <span className={
                        classes.CardLabel
                    }>Project:</span>
                    {" "}
                    {
                    props.card.project_name
                }
                    {" "} </div>
                <div>
                    <span className={
                        classes.CardLabel
                    }>Priority:</span>
                    {" "}
                    {
                    props.card.priority_name
                }
                    {" "} </div>
                <div>
                    <span className={
                        classes.CardLabel
                    }>Due Date:</span>
                    {" "}
                    {
                    moment(props.card.due_date).format("DD/MM/YYYY")
                }
                    {" "} </div>
                <div>
                    <span className={
                        classes.CardLabel
                    }>Category:</span>
                    {" "}
                    {
                    props.card.category_name
                }
                    {" "} </div>
            </div>
        </Card>
    );
};

export default KanbanCard;

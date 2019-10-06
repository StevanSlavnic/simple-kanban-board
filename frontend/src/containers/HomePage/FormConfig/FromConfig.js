import React, {Component} from 'react';
import {connect} from "react-redux";
import {cardsFetchData, cardCreate, cardEdit} from "../../../store/actions/cardActions";
import _ from "lodash";
import * as cardService from "../../../services/card/cardService";
import {Formik, Form} from "formik";
import {FormikTextField} from "formik-material-fields";

import Button from "../../../components/UI/Button/Button";
import classes from "./FormConfig.module.scss";


class FormConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            project: "",
            priority: "",
            assignee: "",
            dueDate: "",
            category: "",
            description: ""
        }

        console.log(props)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const nextPropsCopy = nextProps;

        this.setState({
            title: _.has(nextPropsCopy.results, "title") ? nextPropsCopy.results.title : "",
            project: _.has(nextPropsCopy.results, "project") ? nextPropsCopy.results.project : "",
            priority: _.has(nextPropsCopy.results, "priority") ? nextPropsCopy.results.priority : "",
            assignee: _.has(nextPropsCopy.results, "assignee") ? nextPropsCopy.results.assignee : "",
            dueDate: _.has(nextPropsCopy.results, "dueDate") ? nextPropsCopy.results.dueDate : "",
            category: _.has(nextPropsCopy.results, "category") ? nextPropsCopy.results.category : "",
            description: _.has(nextPropsCopy.results, "description") ? nextPropsCopy.results.description : ""
        });
    }


    componentDidMount() {
        this.props.fetchData("http://a51-kanban-dev.com/api/v1/cards");
        if (this.props.type === "edit") {
            setTimeout(() => {
                this.setState({
                    title: this.props.location.title,
                    project: this.props.location.project,
                    priority: this.props.location.priority,
                    assignee: this.props.location.assignee,
                    dueDate: this.props.location.dueDate,
                    category: this.props.location.category,
                    description: this.props.location.description
                });
            }, 500);
        }
    }

    handleChange(e, field) {
        console.log(field);
        this.setState({[field]: e.target.value});
    }

    render() {
        return (
            <div>
                <Formik enableReinitialize
                    initialValues={
                        this.state
                    }
                    onSubmit={
                        (values, {setSubmitting}) => {
                            this.props.type === "edit" ? setTimeout(() => {
                                cardService.editCard(this.props.cardEditId, values).then(response => {
                                    console.log(response);
                                    const data = JSON.parse(response.config.data);
                                    console.log(data);
                                    this.props.editCard(this.props.cardEditId, data);
                                });
                            }, 400) : cardService.createCard(values).then(response => {
                                const data = response.data;
                                this.props.createCard(data);
                            });

                            const closeModal = () => this.props.type === "edit" ? this.props.onCloseEdit() : this.props.onClose();
                            setTimeout(() => {
                                console.log(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                                closeModal();
                            }, 400);
                        }
                    }

                    render={
                        ({isSubmitting}) => this.props.type === "edit" ? (
                            <Form>
                                <div className={
                                    classes.FormConfigGroup
                                }>
                                    <FormikTextField type="text" name="title" label="Title"
                                        value={
                                            this.state.title
                                        }
                                        onChange={
                                            e => this.handleChange(e, "title")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>

                                    <FormikTextField type="text" name="project" label="Project"
                                        value={
                                            this.state.project
                                        }
                                        onChange={
                                            e => this.handleChange(e, "project")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>
                                    <FormikTextField type="text" name="priority" label="Priority"
                                        value={
                                            this.state.priority
                                        }
                                        onChange={
                                            e => this.handleChange(e, "priority")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>
                                    <FormikTextField type="text" name="assignee" label="Assignee"
                                        value={
                                            this.state.assignee
                                        }
                                        onChange={
                                            e => this.handleChange(e, "assignee")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>
                                    <FormikTextField type="text" name="dueDate" label="Due Date"
                                        value={
                                            this.state.dueDate
                                        }
                                        onChange={
                                            e => this.handleChange(e, "dueDate")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>
                                    <FormikTextField type="text" name="category" label="Category"
                                        value={
                                            this.state.category
                                        }
                                        onChange={
                                            e => this.handleChange(e, "category")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>
                                    <FormikTextField type="text" name="description" label="Description"
                                        value={
                                            this.state.description
                                        }
                                        onChange={
                                            e => this.handleChange(e, "description")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>
                                </div>

                                <Button type="submit"
                                    disabled={isSubmitting}>
                                    Submit
                                </Button>

                            </Form>
                        ) : (
                            <Form>
                                <div className={
                                    classes.FormConfigGroup
                                }>
                                    <FormikTextField type="text" name="title" label="Title"
                                        onChange={
                                            e => this.handleChange(e, "title")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>

                                    <FormikTextField type="text" name="project" label="Project"
                                        onChange={
                                            e => this.handleChange(e, "project")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>
                                    <FormikTextField type="text" name="priority" label="Priority"
                                        onChange={
                                            e => this.handleChange(e, "priority")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>
                                    <FormikTextField type="text" name="assignee" label="Assignee"
                                        onChange={
                                            e => this.handleChange(e, "assignee")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>
                                    <FormikTextField type="text" name="dueDate" label="Due Date"
                                        onChange={
                                            e => this.handleChange(e, "dueDate")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>
                                    <FormikTextField type="text" name="category" label="Category"
                                        onChange={
                                            e => this.handleChange(e, "category")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>
                                    <FormikTextField type="text" name="description" label="Description"

                                        onChange={
                                            e => this.handleChange(e, "description")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>
                                </div>
                                <div className={
                                    classes.FormConfigButton
                                }>
                                    <Button type="submit"
                                        disabled={isSubmitting}>
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        )
                    }/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {cards: state.cards, isLoading: state.cardsAreLoading};
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: url => dispatch(cardsFetchData(url)),
        createCard: card => dispatch(cardCreate(card)),
        editCard: (id, card) => dispatch(cardEdit(id, card))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormConfig);

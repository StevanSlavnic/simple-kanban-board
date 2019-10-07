import React, {Component} from 'react';
import {connect} from "react-redux";
import {cardsFetchData, cardCreate, cardEdit} from "../../../store/actions/cardActions";
import _ from "lodash";
import * as cardService from "../../../services/card/cardService";
import {Formik, Field,  Form} from "formik";
import projectJSON from "../../../shared/json/projects.json";
import priorityJSON from "../../../shared/json/priority.json";
import categoryJSON from "../../../shared/json/category.json";
import assigneeJSON from "../../../shared/json/assignee.json";

import Button from "../../../components/UI/Button/Button";
import classes from "./FormConfig.module.scss";
import moment from 'moment';


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
            title: _.has(nextPropsCopy.card, "title") ? nextPropsCopy.card.title : "",
            project: _.has(nextPropsCopy.card, "project") ? nextPropsCopy.card.project : "",
            priority: _.has(nextPropsCopy.card, "priority") ? nextPropsCopy.card.priority : "",
            assignee: _.has(nextPropsCopy.card, "assignee") ? nextPropsCopy.card.assignee : "",
            dueDate: _.has(nextPropsCopy.card, "due_date") ? nextPropsCopy.card.due_date : "",
            category: _.has(nextPropsCopy.card, "category") ? nextPropsCopy.card.category : "",
            description: _.has(nextPropsCopy.card, "description") ? nextPropsCopy.card.description : ""
        });
    }

    componentDidMount() {
        // this.props.fetchData("http://a51-kanban-dev.com/api/v1/cards");
        if (this.props.type === "edit") {
            setTimeout(() => {
                this.setState({
                    title: this.props.card.title,
                    project: this.props.card.project,
                    priority: this.props.card.priority,
                    assignee: this.props.card.assignee,
                    dueDate: this.props.card.due_date,
                    category: this.props.card.category,
                    description: this.props.card.description
                });
            }, 500);
        }
    }

    handleChange(e, field) {
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
                            console.log(values.title)
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
                    validate={values => {

                        console.log(values.title.length)
                        const errors = {};

                        console.log(errors)
                            if (!values.title) {
                                errors.title = "Required";
                            }
                            if (values.title.length <= 3) {
                                errors.title = "Enter title longer than 3 characters";
                            }
                
                            if (values.title.length >= 150) {
                                errors.title = "Title is limited to 150 characters";
                            }
                        }
                    }
                    render={
                        ({values,
                            errors,
                            status,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,}) => this.props.type === "edit" ? (
                            <Form>
                                <div className={
                                    classes.FormConfigGroup
                                }>
                                    <Field type="text" name="title" label="Title" placeholder="Title"
                                        value={
                                            this.state.title
                                        }
                                        onChange={
                                            e => this.handleChange(e, "title")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>
                                        {errors.title && touched.title && <div>{errors.title}</div>}

                                    <Field component="select" name="project" placeholder="Project" value={
                                            this.state.project
                                        } onChange={
                                            e => this.handleChange(e, "project")
                                        } className={
                                            classes.FormConfigField
                                        }>
                                             <option value=''>Select project</option>
                                        {projectJSON.map(project => (
                                            <option key={project.value} value={project.value}>{project.label}</option>
                                        ))}
                                    </Field>

                                    <Field component="select" name="priority" placeholder="Priority" value={
                                            this.state.priority
                                        } onChange={
                                            e => this.handleChange(e, "priority")
                                        } className={
                                            classes.FormConfigField
                                        }>
                                            <option value=''>Select priority</option>
                                        {priorityJSON.map(priority => (
                                            <option key={priority.value} value={priority.value}>{priority.label}</option>
                                        ))}
                                    </Field>
                                        
                                    <Field component="select" name="assignee" placeholder="Assignee" value={
                                            this.state.assignee
                                        } onChange={
                                            e => this.handleChange(e, "assignee")
                                        } className={
                                            classes.FormConfigField
                                        }>
                                             <option value=''>Select assignee</option>
                                        {assigneeJSON.map(assignee => (
                                            <option key={assignee.value} value={assignee.value}>{assignee.label}</option>
                                        ))}
                                    </Field>

                                    <Field type="date"
                                        min={moment(new Date()).format('YYYY-MM-DD')}
                                        name="dueDate" placeholder="Due Date"
                                        value={
                                            this.state.dueDate
                                        }
                                        onChange={
                                            e => this.handleChange(e, "dueDate")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>

                                    <Field component="select" name="category" placeholder="Category" value={
                                            this.state.category
                                        } onChange={
                                            e => this.handleChange(e, "category")
                                        } className={
                                            classes.FormConfigField
                                        }>
                                            <option value=''>Select category</option>
                                        {categoryJSON.map(category => (
                                            <option key={category.value} value={category.value}>{category.label}</option>
                                        ))}
                                    </Field>

                                    <Field type="text" name="description" placeholder="Description"
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
                                    <Field type="text" name="title" placeholder="Title"
                                        onChange={
                                            e => this.handleChange(e, "title")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>

                                    <Field component="select" name="project" placeholder="Project" onChange={
                                            e => this.handleChange(e, "project")
                                        } className={
                                            classes.FormConfigField
                                        }>
                                            <option value=''>Select project</option>
                                        {projectJSON.map(project => (
                                            <option key={project.value} value={project.value}>{project.label}</option>
                                        ))}
                                    </Field>

                                    <Field component="select" name="priority" placeholder="Priority" onChange={
                                            e => this.handleChange(e, "priority")
                                        } className={
                                            classes.FormConfigField
                                        }>
                                            <option value=''>Select priority</option>
                                        {priorityJSON.map(priority => (
                                            <option key={priority.value} value={priority.value}>{priority.label}</option>
                                        ))}
                                    </Field>

                                    <Field component="select" name="assignee" placeholder="Assignee" onChange={
                                            e => this.handleChange(e, "assignee")
                                        } className={
                                            classes.FormConfigField
                                        }>
                                            <option value=''>Select assignee</option>
                                        {assigneeJSON.map(assignee => (
                                            <option key={assignee.value} value={assignee.value}>{assignee.label}</option>
                                        ))}
                                    </Field>

                                    <Field type="date" name="dueDate" placeholder="Due Date"  
                                        min={moment(new Date()).format('YYYY-MM-DD')}
                                        onChange={
                                            e => this.handleChange(e, "dueDate")
                                        }
                                        className={
                                            classes.FormConfigField
                                        }/>

                                    <Field component="select" name="category" placeholder="Category" onChange={
                                            e => this.handleChange(e, "category")
                                        } className={
                                            classes.FormConfigField
                                        }>
                                            <option value=''>Select category</option>
                                        {categoryJSON.map(category => (
                                            <option key={category.value} value={category.value}>{category.label}</option>
                                        ))}
                                    </Field>


                                    <Field type="text" name="description" placeholder="Description"

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
        // fetchData: url => dispatch(cardsFetchData(url)),
        createCard: card => dispatch(cardCreate(card)),
        editCard: (id, card) => dispatch(cardEdit(id, card))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormConfig);

import React, {Component} from "react";
import {connect} from "react-redux";
import {cardsFetchData, cardsFetchDataFiltered, cardRemove} from "../../store/actions/cardActions";
import * as cardService from "../../services/card/cardService";
import * as ReactDOM from 'react-dom';
import * as _ from "lodash";
// import { Formik } from "formik";
// import { FormikTextField } from "formik-material-fields";

import KanbanCard from "../../components/KanbanCard/KanbanCard";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/UI/Modal/Modal"
import IconButton from "@material-ui/core/IconButton";
import Reset from "../../assets/images/icons/close_icon.svg";
import classes from "./HomePage.module.scss";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: "",
            modalOpened: false,
            modalDeleteOpened: false,
            modalEditOpened: false,
            cardId: "",
            cardEditId: "",
            cardMoveId: "",
            realm: ''
        };
        this.cardMoveId = this.cardMoveId.bind(this);
        console.log(props);
    }

    componentDidMount() {
        this.props.fetchData("http://a51-kanban-dev.com/api/v1/cards");
    }

    closeModal = () => {
        this.setState({modalOpened: false});
    };

    openModal = () => {
        this.setState({modalOpened: true});
    };

    closeEditModal = () => {
        this.setState({modalEditOpened: false});
    };

    openEditModal = id => {
        this.setState({modalEditOpened: true});

        this.getCardEditId(id);

        this.setState({cardEditId: id});

        setTimeout(() => {
            cardService.editCard(this.state.cardEditId).then(response => {
                this.setState({card: response.data});
            }).catch(error => {
                console.log(error.data);
            });
        }, 400);
    };

    closeDeleteModal = () => {
        this.setState({modalDeleteOpened: false});
    };

    openDeleteModal = id => {
        this.setState({modalDeleteOpened: true});
        this.getCardId(id);

        this.setState({cardId: id});
    };

    getCardId(id) {
        const cardId = id;

        return cardId;
    }

    getCardEditId(id) {
        const cardEditId = id;

        return cardEditId;
    }

    handleCardDelete() {
        cardService.deleteCard(this.state.cardId);
        this.props.removeCard(this.state.cardId);
        this.setState({modalDeleteOpened: false});
    }

    allowDrop = (event) => {
        event.preventDefault();
    }

    handleDrop = realm => {
        this.setState({realm: realm})

        setTimeout(() => {
            console.log(this.state.cardMoveId, this.state.realm)

            cardService.updateStatusCard(this.state.cardMoveId, this.state.realm)
        }, 400)
    }

    cardMoveId = id => {
        this.setState({cardMoveId: id})
    }


    render() {

            const {cards: {
                    cards
                }} = this.props;

            console.log(this.props.cards.cards)

            console.log(this.state.cardMoveId, this.state.realm)


            const cardsRequest = _.filter(this.props.cards.cards, {"status": "0"});
            const cardsRequestRender = cardsRequest && cardsRequest.map(card => {
                    return(< div className = {
                        classes.LocationHomeColumn
                    }
                    key = {
                        card.id
                    } > <KanbanCard className={
                            classes.LocationKanbanCard
                        }
                        id={
                            card.id
                        }
                        card={card}
                        cardId={
                            () => this.getcardId(card.id)
                        }
                        cardEditId={
                            () => this.getcardEditId(card.id)
                        }
                        openEditModal={
                            this.openEditModal
                        }
                        openDeleteModal={
                            this.openDeleteModal
                        }
                        cardMoveId={
                            this.cardMoveId
                        }

                        color='gray'></KanbanCard>
                </div>
                );
            }
        );

        const cardsInProgress = _.filter(this.props.cards.cards, {"status": "1"});
        const cardsInProgressRender = cardsInProgress && cardsInProgress.map(card => {
            return (
                <div className={
                        classes.LocationHomeColumn
                    }
                    key={
                        card.id
                }>
                    <KanbanCard className={
                            classes.LocationKanbanCard
                        }
                        id={
                            card.id
                        }
                        card={card}
                        cardId={
                            () => this.getcardId(card.id)
                        }
                        cardEditId={
                            () => this.getcardEditId(card.id)
                        }
                        openEditModal={
                            this.openEditModal
                        }
                        openDeleteModal={
                            this.openDeleteModal
                        }
                        cardMoveId={
                            this.cardMoveId
                        }

                        onDrop={
                            () => this.setState({message: card.id})
                        }
                        color='yellow'></KanbanCard>
                </div>
            );
        });

        const cardsDone = _.filter(this.props.cards.cards, {"status": "2"});
        const cardsDoneRender = cardsDone && cardsDone.map(card => {
            return (
                <div draggable='true'
                    className={
                        classes.LocationHomeColumn
                    }
                    key={
                        card.id
                }>
                    <KanbanCard className={
                            classes.LocationKanbanCard
                        }
                        id={
                            card.id
                        }
                        card={card}
                        cardId={
                            () => this.getcardId(card.id)
                        }
                        cardEditId={
                            () => this.getcardEditId(card.id)
                        }
                        openEditModal={
                            this.openEditModal
                        }
                        openDeleteModal={
                            this.openDeleteModal
                        }
                        cardMoveId={
                            this.cardMoveId
                        }
                        color='green'></KanbanCard>
                </div>
            );
        });


        return (

            <div className={
                classes.KanbanPageWrap
            }>
                <div className={
                    classes.KanbanHeader
                }>
                    <h1>Kanban board</h1>
                </div>
                <div className={
                    classes.KanbanCardsWrap
                }>
                    <div className={
                        classes.KanbanFieldsWrap
                    }>


                        <div className={
                                classes.KanbanCardsStatus
                            }
                            onDragOver={
                                this.allowDrop
                            }
                            onDrop={
                                () => this.handleDrop(0)
                        }>
                            <h2>To Do</h2>
                            <div>{cardsRequestRender}</div>
                        </div>


                        <div className={
                                classes.KanbanCardsStatus
                            }
                            onDragOver={
                                this.allowDrop
                            }
                            onDrop={
                                () => this.handleDrop(1)
                        }>
                            <h2>In Progress</h2>
                            <div>{cardsInProgressRender}</div>
                        </div>


                        <div className={
                                classes.KanbanCardsStatus
                            }
                            onDragOver={
                                this.allowDrop
                            }
                            onDrop={
                                () => this.handleDrop(2)
                        }>
                            <h2>Done</h2>
                            <div>{cardsDoneRender}</div>
                        </div>
                    </div>
                </div>

                <Modal open={
                        this.state.modalEditOpened
                    }
                    onClose={
                        this.closeEditModal
                    }
                    className={
                        classes.KanbanModalWide
                }>
                    edit {/* <FormConfig
            results={this.state.results}
            locationEditId={this.state.locationEditId}
            location={location}
            type="edit"
            onCloseEdit={this.closeEditModal}
          /> */} </Modal>

                <Modal open={
                        this.state.modalDeleteOpened
                    }
                    onClose={
                        this.closeDeleteModal
                    }
                    className={
                        classes.KanbanDialogModal
                }>

                    <div>Are you shure you want to delete this Task?</div>
                    <div>
                        <Button className={
                                classes.KanbanButton
                            }
                            onClick={
                                () => this.handleCardDelete()
                        }>
                            Delete
                        </Button>
                        {" "}
                        <Button className={
                                classes.KanbanButton
                            }
                            onClick={
                                this.closeDeleteModal
                        }>
                            Cancel
                        </Button>
                    </div>
                </Modal>


            </div>
        )
    }
}

const mapStateToProps = state => {
    return {cards: state.cards};
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: url => dispatch(cardsFetchData(url)),
        removeCard: id => dispatch(cardRemove(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

import React, {Component} from "react";
import {connect} from "react-redux";
import {cardsFetchData, cardUpdate, cardEditing, cardRemove} from "../../store/actions/cardActions";
import * as cardService from "../../services/card/cardService";
import * as _ from "lodash";

import KanbanCard from "../../components/KanbanCard/KanbanCard";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/UI/Modal/Modal";
import FormConfig from './FormConfig/FromConfig';
import classes from "./HomePage.module.scss";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: "",
            cards: "",
            modalOpened: false,
            modalDeleteOpened: false,
            modalEditOpened: false,
            cardId: "",
            cardEditId: "",
            cardMoveId: "",
            realm: '',
            results: ''
        };
        this.cardMoveId = this.cardMoveId.bind(this);
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
            cardService.getCard(this.state.cardEditId).then(response => {
                this.setState({card: response.data});
            }).catch(error => {
                console.log(error.data);
            });
        }, 50)
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

            cardService.updateStatusCard(this.state.cardMoveId, this.state.realm).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error.response)
            });

            this.props.updateStatus(this.state.cardMoveId, this.state.realm)
        }, 400)
    }

    cardMoveId = id => {
        this.setState({cardMoveId: id})
    }

    render() {

            const {cards: {
                    cards
                }} = this.props;

            const card = this.state.card;

            const cardsRequest = _.filter(this.props.cards.cards, {"status": "0"});
            const cardsRequestRender = cardsRequest && cardsRequest.map(card => {
                    return(< div className = {
                        classes.CardHomeColumn
                    }
                    key = {
                        card.id
                    } > <KanbanCard className={
                            classes.SingleKanbanCard
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

                        color='red'></KanbanCard>
                </div>
                );
            }
        );

        const cardsInProgress = _.filter(this.props.cards.cards, {"status": "1"});
        const cardsInProgressRender = cardsInProgress && cardsInProgress.map(card => {
            return (
                <div className={
                        classes.CardHomeColumn
                    }
                    key={
                        card.id
                }>
                    <KanbanCard className={
                            classes.SingleKanbanCard
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
                        classes.CardHomeColumn
                    }
                    key={
                        card.id
                }>
                    <KanbanCard className={
                            classes.SingleKanbanCard
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
                        done={'done'}
                        color='green'></KanbanCard>
                </div>
            );
        });


        return (
            

            <div className={
                classes.KanbanPageWrap
            }>
                <div>
                    <div className={
                        classes.KanbanHeader
                    }>
                        <h1>Kanban board</h1>
                        <Button onClick={
                            this.openModal
                        }>Create new task</Button>
                    </div>
                    <div>
                        
                    </div>
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
                            <h2>Requested</h2>
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
                        this.state.modalOpened
                    }
                    onClose={
                        this.closeModal
                    }
                    >
                    <FormConfig cards={
                            this.state.cards
                        }
                        onClose={
                            this.closeModal
                        }/>
                </Modal>

                <Modal open={
                        this.state.modalEditOpened
                    }
                    onClose={
                        this.closeEditModal
                    }
                    className={
                        classes.KanbanModalWide
                }>
                     <FormConfig
                        cardEditId={this.state.cardEditId}
                        card={card}
                        type="edit"
                        onCloseEdit={this.closeEditModal}
                    />
                </Modal>

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
    return {cards: state.cards, isLoading: state.cardsAreLoading};
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: url => dispatch(cardsFetchData(url)),
        editCard: (id, cardData) => dispatch(cardEditing(id, cardData)),
        removeCard: id => dispatch(cardRemove(id)),
        updateStatus: (id, status) => dispatch(cardUpdate(id, status))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

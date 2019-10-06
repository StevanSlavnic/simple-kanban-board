import * as _ from "lodash";

const createCard = (state, payload) => {
    console.log(state);

    const newCard = payload.card;

    console.log(newCard);

    // make a copy
    const newCards = state.cards.slice();

    newCards.splice(0, 0, newCard);

    return {
        ...state,
        cards: newCards
    };
};


const editCard = (state, payload) => {
    console.log(payload);
    const newCards = state.cards.map((card, index) => { // Find the card with the matching id
        if (card.id === payload.id) {
            const payloadCopy = _.cloneDeep(payload);

            console.log(payloadCopy);
            // Return a new object
            return {
                ...card, // copy the existing card
                title: payloadCopy.card.title,
                project: payloadCopy.card.project,
                priority: payloadCopy.card.priority,
                assignee: payloadCopy.card.assignee,
                due_date: payloadCopy.card.due_date,
                category: payloadCopy.card.category,
                description: payloadCopy.card.description

            };
        }
        return card;
    });
    // Returns new state
    console.log(newCards);
    return {
        ...state,
        cards: newCards
    };
};


const updateStatusCard = (state, payload) => {
    console.log(payload)

    const newCards = state.cards.map((card, index) => {
        if (card.id === payload.id) {
            const payloadCopy = _.cloneDeep(payload);
            console.log(payloadCopy);

            return {
                ...card, // copy the existing card
                status: `${
                    payloadCopy.status
                }`
            };
        }
        return card;
    });
    // Returns new state
    console.log(newCards);
    return {
        ...state,
        cards: newCards
    };
}


const removeCard = (state, payload) => {
    console.log();
    const newCards = state.cards.filter(card => payload.id !== card.id);
    return {
        ...state,
        cards: newCards
    };
};

const setCards = (state, payload) => {
    const stateCopy = _.cloneDeep(state);
    stateCopy.cards = payload.cards;
    return stateCopy;
};

const setCardsFiltered = (state, payload) => {
    const stateCopy = _.cloneDeep(state);
    stateCopy.cards = payload.cards;
    return stateCopy;
};

const reducer = (state = {}, action) => {
    switch (action.type) {
        case "CARDS_FETCH_DATA_SUCCESS":
            return setCards(state, action);
        case "CARDS_FETCH_DATA_FILTERED":
            return setCardsFiltered(state, action);
        case "CARD_DELETING":
            return removeCard(state, action);
            // case "CARDS_EDITING":
            // return editLocation(state, action);
        case "CARD_STATUS_UPDATE":
            return updateStatusCard(state, action)
        case "CARD_CREATE":
            return createCard(state, action);
        default:
            return state;
    }
};

export default reducer;

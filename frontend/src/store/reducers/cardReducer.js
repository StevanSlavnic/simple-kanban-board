import * as _ from "lodash";

// const createLocation = (state, payload) => {
// console.log(state);

// const newLocation = payload.location;

// console.log(newLocation);

// // make a copy
// const newLocations = state.locations.slice();

// newLocations.splice(0, 0, newLocation);

// return { ...state, locations: newLocations };
// };


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
        cardss: newCards
    };
};

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
            // case "CARDS_CREATE":
            // return createLocation(state, action);
        default:
            return state;
    }
};

export default reducer;

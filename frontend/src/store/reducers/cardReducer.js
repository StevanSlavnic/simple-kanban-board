import * as _ from "lodash";

const createCard = (state, payload) => {
  const newCard = payload.card;

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
  const newCards = state.cards.map((card, index) => {
    // Find the card with the matching id
    if (card.id === payload.id) {
      const payloadCopy = _.cloneDeep(payload);

      console.log(payloadCopy);
      // Return a new object
      return {
        ...card, // copy the existing card
        title: payloadCopy.card.title,
        project: payloadCopy.card.project,
        project_name: payloadCopy.card.project_name,
        priority: payloadCopy.card.priority,
        priority_name: payloadCopy.card.priority_name,
        assignee: payloadCopy.card.assignee,
        assignee_name: payloadCopy.card.assignee_name,
        due_date: payloadCopy.card.due_date,
        category: payloadCopy.card.category,
        category_name: payloadCopy.card.category_name,
        description: payloadCopy.card.description,
        updated_at: payloadCopy.card.updated_at
      };
    }
    return card;
  });
  // Returns new state
  console.log("Edit", newCards);
  return {
    ...state,
    cards: newCards
  };
};

const updateStatusCard = (state, payload) => {
  console.log(payload);

  const newCards = state.cards.map((card, index) => {
    if (card.id === payload.id) {
      const payloadCopy = _.cloneDeep(payload);
      console.log(payloadCopy);

      return {
        ...card, // copy the existing card
        status: `${payloadCopy.status}`
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

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "CARDS_FETCH_DATA_SUCCESS":
      return setCards(state, action);
    case "CARD_DELETING":
      return removeCard(state, action);
    case "CARD_EDITING":
      return editCard(state, action);
    case "CARD_STATUS_UPDATE":
      return updateStatusCard(state, action);
    case "CARD_CREATE":
      return createCard(state, action);
    default:
      return state;
  }
};

export default reducer;

// export function locationCreating(location) {
//   console.log(location);
//   return {
//     type: "LOCATIONS_CREATE",
//     location
//   };
// }

export function cardEditing(id, card) {
  console.log(card);
  return {
    type: "CARD_EDITING",
    id,
    card
  };
}

export function cardDeleting(id) {
  return {
    type: "CARD_DELETING",
    id
  };
}

export function cardsAreLoading(bool) {
  return {
    type: "CARDS_ARE_LOADING",
    isLoading: bool
  };
}

export function cardsFetchDataFiltered(cards) {
  return {
    type: "CARDS_FETCH_DATA_FILTERED",
    cards
  };
}

export function cardsFetchDataSuccess(cards) {
  return {
    type: "CARDS_FETCH_DATA_SUCCESS",
    cards
  };
}

export function cardEdit(id, card) {
  return dispatch => {
    dispatch(cardEditing(id, card));
    fetch(id, card);
  };
}

export function cardRemove(id) {
  return dispatch => {
    dispatch(cardDeleting(id));
    fetch(id);
  };
}

export function cardsFetchData(url) {
  return dispatch => {
    dispatch(cardsAreLoading(true));
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(cardsAreLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(cards => dispatch(cardsFetchDataSuccess(cards)));
  };
}

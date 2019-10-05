import axiosInstance from "../axiosDefaultInstance";

export const createCard = cardData => {
    const url = "/cards/create";

    return axiosInstance.post(url, cardData);
};

export const editCard = (cardId, cardData) => {
    const url = `/cards/${cardId}`;

    console.log(url);

    return axiosInstance.put(url, cardData);
};

export const updateStatusCard = (cardId, cardData) => {
    const url = `/cards/${cardId}`;

    console.log(cardData);

    const payload = {
        'status': `${cardData}`
    }

    return axiosInstance.patch(url, payload);
};

export const deleteCard = cardData => {
    const url = `/cards/${cardData}`;

    return axiosInstance.delete(url, cardData);
};

export const getCard = cardData => {
    const url = `/cards/${cardData}`;

    return axiosInstance.get(url, cardData);
};

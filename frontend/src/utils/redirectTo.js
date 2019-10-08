import PropTypes from "prop-types";

export const addToQueryQueue = toUrl => {
  console.log(toUrl);
};

addToQueryQueue.propTypes = {
  toUrl: PropTypes.string
};

export const setReturnToUrlToken = url => {
  if (url && typeof url === "string") {
    localStorage.setItem("returnTo", url);
  } else {
    console.error('"setReturnToUrlToken" requires a "string" path');
  }
};

export const getReturnToUrlToken = () => localStorage.getItem("returnTo");

export const deleteReturnToUrlToken = () => localStorage.removeItem("returnTo");

setReturnToUrlToken.propTypes = {
  url: PropTypes.string
};

import axios from "axios";

// setting default api options
export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_ENDPOINT
});

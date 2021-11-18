import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:1998/api/Categories",
  headers: {
    "Content-type": "application/json"
  }
});
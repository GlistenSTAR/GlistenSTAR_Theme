import axios from "axios";

const API = () => {
    return axios.create({
        baseURL: "https://jsonplaceholder.typicode.com/",
    });
};

export default API

import axios from "axios";

const http = axios.create({
    baseURL: "https://projetofinal-aprofunda.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default http;
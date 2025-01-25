import axios from "axios";

const http = axios.create({
    //baseURL: "https://projetofinal-aprofunda-2.onrender.com",
    baseURL: "http://localhost:3333",
    headers: {
        "Content-Type": "application/json",
    },
    
});

export default http;

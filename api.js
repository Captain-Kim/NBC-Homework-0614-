import axios from "axios";

export const jsonApi = axios.create({
    baseURL: 'http://localhost:5011',
    timeOUT: 5000,
    headers: {'Content-Type': 'application/json'}
})
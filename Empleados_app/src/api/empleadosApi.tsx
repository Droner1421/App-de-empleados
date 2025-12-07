import axios from "axios";

export const empleadosApi = axios.create({
    baseURL: "http://localhost:3000",
});

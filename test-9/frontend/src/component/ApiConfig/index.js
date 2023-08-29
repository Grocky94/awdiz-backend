import axios from "axios"

const token = JSON.parse(localStorage.getItem("token"));

const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: { "Authorization": `bearer ${token}` }
})

export default api;